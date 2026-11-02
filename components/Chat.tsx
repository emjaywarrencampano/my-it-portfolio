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

export function Chat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([START]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => {
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

      const contentType = response.headers.get("content-type") ?? "";

      // Non-streaming responses (curated facts, no key, rate limit, validation).
      if (!contentType.includes("text/event-stream")) {
        const data = (await response.json()) as Reply & { error?: string };
        patchReply({
          text: data.text ?? data.error ?? "Something went wrong. Try again.",
          action: data.section ? { text: "", section: data.section } : undefined,
        });
        return;
      }

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
    <div
      className={`${styles.panel} ${open ? styles.open : ""}`}
      role="dialog"
      aria-modal="false"
      aria-label="AI assistant"
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
              {message.text}
              {message.action?.section && !busy && (
                <button type="button" className={styles.jump} onClick={() => jumpTo(message.action!.section!)}>
                  → Jump to section
                </button>
              )}
            </div>
          );
        })}
      </div>

      {messages.length < 3 && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((item) => (
            <button key={item.label} type="button" className={styles.suggest} onClick={() => ask(item.question)}>
              {item.label}
            </button>
          ))}
        </div>
      )}

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
    </div>
  );
}
