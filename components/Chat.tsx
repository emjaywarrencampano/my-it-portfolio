"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

type Reply = { text: string; section?: string };
type Message = { id: number; role: "user" | "assistant"; text: string; action?: Reply };

type StreamEvent =
  | { type: "meta"; model: string }
  | { type: "delta"; text: string }
  | { type: "done"; section?: string }
  | { type: "fallback"; text: string; section?: string };

const SUGGESTIONS = [
  { label: "Certifications", question: "What certifications does he have?" },
  { label: "Track My Ride", question: "Tell me about his capstone." },
  { label: "Open to work?", question: "Is he open to work?" },
];

const START: Message = {
  id: 0,
  role: "assistant",
  text: "Hi — I’m Emjay’s assistant. Ask me about his capstone, certifications, or experience. I can also take you to a section.",
};

/** Each visitor gets 10 written answers per day; quick facts are unlimited. */
const DAILY_LIMIT = 10;
const USAGE_KEY = "ewc-ai-usage-v3";

type Usage = { date: string; count: number };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function readUsage(): Usage {
  try {
    const raw = window.localStorage.getItem(USAGE_KEY);
    if (!raw) return { date: today(), count: 0 };
    const parsed = JSON.parse(raw) as Usage;
    if (parsed.date !== today()) return { date: today(), count: 0 };
    return { date: parsed.date, count: Number(parsed.count) || 0 };
  } catch {
    return { date: today(), count: 0 };
  }
}

function writeUsage(usage: Usage) {
  try {
    window.localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  } catch {
    /* storage may be unavailable */
  }
}

function renderMessageText(text: string) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {match[3]}
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function Chat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([START]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [used, setUsed] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const abortRef = useRef<AbortController | null>(null);

  const remaining = Math.max(0, DAILY_LIMIT - used);

  useEffect(() => {
    setUsed(readUsage().count);
  }, []);

  const bumpUsage = useCallback(() => {
    setUsed((current) => {
      const next = current + 1;
      writeUsage({ date: today(), count: next });
      return next;
    });
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    // Lock main page scrolling while chat is open on both desktop & mobile
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    if (remaining === 0) {
      setInput("");
      return;
    }

    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed };
    const replyId = nextId.current++;
    setMessages((prev) => [...prev, userMessage, { id: replyId, role: "assistant", text: "" }]);
    setInput("");
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const patchReply = (patch: Partial<Message>) =>
      setMessages((prev) => prev.map((message) => (message.id === replyId ? { ...message, ...patch } : message)));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [{ id: userMessage.id, role: "user", parts: [{ type: "text", text: trimmed }] }],
        }),
      });

      if (response.status === 429) {
        patchReply({
          text: "That is the limit for now. The quick answers below still work, and you can reach Emjay directly at emjaywarrencampano@gmail.com.",
        });
        return;
      }

      const contentType = response.headers.get("content-type") ?? "";

      // Non-streaming responses: curated facts are free and unlimited.
      if (!contentType.includes("text/event-stream")) {
        const data = (await response.json()) as Reply & { error?: string; mode?: string };
        if (data.mode === "ai") bumpUsage();
        patchReply({
          text: data.text ?? data.error ?? "Something went wrong. Try again.",
          action: data.section ? { text: "", section: data.section } : undefined,
        });
        return;
      }

      // A stream means the question went to a model — count it.
      bumpUsage();

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload) continue;

          let event: StreamEvent;
          try {
            event = JSON.parse(payload) as StreamEvent;
          } catch {
            continue;
          }

          if (event.type === "delta") {
            acc += event.text;
            patchReply({ text: acc });
            scrollToBottom();
          } else if (event.type === "fallback") {
            acc = event.text;
            patchReply({ text: event.text, action: event.section ? { text: "", section: event.section } : undefined });
          } else if (event.type === "done") {
            patchReply({
              text: acc,
              action: event.section ? { text: "", section: event.section } : undefined,
            });
          }
        }
      }

      if (!acc) {
        patchReply({ text: "I could not answer that just now. Try again in a moment." });
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      patchReply({ text: "Connection failed. Please try again." });
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function jumpTo(section: string) {
    onClose();
    document.querySelector(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`${styles.panel} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio assistant"
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <span className={styles.avatar} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M12 3.2 13.9 9l5.8 1.9-5.8 1.9L12 18.6l-1.9-5.8L4.3 10.9 10.1 9Z" strokeLinejoin="round" />
            </svg>
          </span>
          <span className={styles.identity}>
            <b>Emjay’s Assistant</b>
            <span>
              <i className={styles.live} aria-hidden="true" />
              Online
            </span>
          </span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close assistant">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.body} ref={bodyRef} aria-live="polite">
          {messages.map((message) => {
            const isEmpty = message.role === "assistant" && message.text.length === 0;
            if (isEmpty && busy) {
              return (
                <div key={message.id} className={`${styles.msg} ${styles.bot} ${styles.typing}`} aria-label="Assistant is typing">
                  <span />
                  <span />
                  <span />
                </div>
              );
            }
            if (isEmpty) return null;

            return (
              <div key={message.id} className={`${styles.msg} ${message.role === "user" ? styles.me : styles.bot}`}>
                {renderMessageText(message.text)}
                {message.action?.section && !busy && (
                  <button type="button" className={styles.jump} onClick={() => jumpTo(message.action!.section!)}>
                    → Jump to section
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {messages.length < 3 && remaining > 0 && (
          <div className={styles.suggestions}>
            {SUGGESTIONS.map((item) => (
              <button key={item.label} type="button" className={styles.suggest} onClick={() => ask(item.question)}>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {remaining === 0 ? (
          <p className={styles.limit}>
            You have used today’s {DAILY_LIMIT} answers. Email{" "}
            <a href="mailto:emjaywarrencampano@gmail.com">emjaywarrencampano@gmail.com</a> anytime.
          </p>
        ) : (
          <form
            className={styles.form}
            onSubmit={(event) => {
              event.preventDefault();
              void ask(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask something…"
              autoComplete="off"
              aria-label="Your message"
              maxLength={500}
            />
            <button type="submit" className={styles.send} aria-label="Send" disabled={busy || !input.trim()}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
        )}

        <p className={styles.usage}>
          {remaining > 0 ? `${remaining} of ${DAILY_LIMIT} answers left today` : "Daily limit reached"}
        </p>
      </div>
    </>
  );
}
