"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Chat.module.css";

type Reply = { text: string; section?: string };
type Message = { id: number; role: "user" | "assistant"; text: string; action?: Reply };

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
  const closeRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;

    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ id: userMessage.id, role: "user", parts: [{ type: "text", text: trimmed }] }],
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = (await response.json()) as Reply & { error?: string };
        setMessages((prev) => [
          ...prev,
          {
            id: nextId.current++,
            role: "assistant",
            text: data.text ?? data.error ?? "Something went wrong. Try again.",
            action: data.section ? { text: "", section: data.section } : undefined,
          },
        ]);
        return;
      }

      // Streaming (UI message stream) response from OpenRouter.
      const text = await response.text();
      const reply = extractStreamText(text);

      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          text: reply || "I’m having trouble answering right now. Try again in a moment.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "assistant", text: "Connection failed. Please try again." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  function jumpTo(section: string) {
    onClose();
    const target = document.querySelector(section);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="Close assistant">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className={styles.body} ref={bodyRef} aria-live="polite">
        {messages.map((message) => (
          <div key={message.id} className={`${styles.msg} ${message.role === "user" ? styles.me : styles.bot}`}>
            {message.text}
            {message.action?.section && (
              <button
                type="button"
                className={styles.jump}
                onClick={() => jumpTo(message.action!.section!)}
              >
                → Jump to section
              </button>
            )}
          </div>
        ))}
        {busy && (
          <div className={`${styles.msg} ${styles.bot} ${styles.typing}`} aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </div>
        )}
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

/** Pull plain text out of an AI SDK UI message stream. */
function extractStreamText(stream: string) {
  const chunks: string[] = [];

  for (const line of stream.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    try {
      const event = JSON.parse(payload) as { type?: string; delta?: string };
      if (event.type === "text-delta" && typeof event.delta === "string") {
        chunks.push(event.delta);
      }
    } catch {
      /* ignore malformed chunks */
    }
  }

  return chunks.join("").trim();
}
