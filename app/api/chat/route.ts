import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { buildSystemPrompt, fallbackAnswer, isDirectQuestion, matchSection } from "@/lib/knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

function getApiKey(): string | undefined {
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
      const match = content.match(/^OPENROUTER_API_KEY\s*=\s*(.+)$/m);
      if (match && match[1]?.trim()) {
        return match[1].trim();
      }
    }
  } catch {
    // Ignore error
  }
  return process.env.OPENROUTER_API_KEY?.trim();
}

function getModelChain(): string[] {
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
      const match = content.match(/^OPENROUTER_MODEL\s*=\s*(.+)$/m);
      if (match && match[1]?.trim()) {
        const list = match[1].split(",").map((m) => m.trim()).filter(Boolean);
        if (list.length > 0) return list;
      }
    }
  } catch {
    // Ignore error
  }
  const fromEnv = (process.env.OPENROUTER_MODEL ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  if (fromEnv.length > 0) return fromEnv;
  return [
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "nvidia/nemotron-3.5-super-vl:free",
    "dots-studio/dots-3-note-preview:free",
    "openrouter/free",
  ];
}

/** Very small in-memory limiter — good enough for a low-traffic portfolio. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 35;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > LIMIT;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const parsed: ChatMessage[] = [];

  for (const message of messages) {
    if (!message || typeof message !== "object") return null;
    const { role, parts } = message as { role?: unknown; parts?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (!Array.isArray(parts)) return null;

    const content = parts
      .map((part) => (part && typeof part === "object" && "text" in part ? String(part.text) : ""))
      .join("")
      .trim();

    if (content.length > MAX_CHARS) return null;
    if (!content) continue;

    parsed.push({ role, content });
  }

  return parsed.length > 0 ? parsed : null;
}

function sse(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const question = [...messages].reverse().find((message) => message.role === "user")?.content ?? "";

  // Curated facts answer common questions instantly and never depend on a
  // provider. The model is reserved for open-ended questions.
  if (isDirectQuestion(question)) {
    return NextResponse.json({ mode: "direct", ...fallbackAnswer(question) });
  }

  const apiKey = getApiKey();
  const modelChain = getModelChain().slice(0, 4);

  if (!apiKey) {
    return NextResponse.json({ mode: "fallback", ...fallbackAnswer(question) });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answered = false;

      for (const model of modelChain) {
        const started = Date.now();
        let yielded = false;

        try {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "Emjay Campano Portfolio",
            },
            body: JSON.stringify({
              model,
              messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
              max_tokens: 800,
              temperature: 0.5,
              stream: true,
            }),
            signal: AbortSignal.timeout(10000),
          });

          if (!res.ok) {
            const errText = await res.text().catch(() => "");
            console.warn(`[chat] model ${model} HTTP ${res.status}: ${errText}`);
            continue;
          }

          if (!res.body) continue;

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const payload = trimmed.slice(5).trim();
              if (payload === "[DONE]") continue;

              try {
                const parsed = JSON.parse(payload);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (!delta) continue;

                if (!yielded) {
                  yielded = true;
                  answered = true;
                  controller.enqueue(encoder.encode(sse({ type: "meta", model })));
                }

                controller.enqueue(encoder.encode(sse({ type: "delta", text: delta })));
              } catch {
                continue;
              }
            }
          }

          if (yielded) {
            console.log(`[chat] ${model} streamed in ${Date.now() - started}ms`);
            const section = matchSection(question);
            controller.enqueue(encoder.encode(sse({ type: "done", ...(section ? { section } : {}) })));
            controller.close();
            return;
          }

          console.warn(`[chat] empty completion ${model} ${Date.now() - started}ms`);
        } catch (error) {
          console.warn(`[chat] model failed ${model} ${Date.now() - started}ms`, error instanceof Error ? error.message : error);
        }
      }

      if (!answered) {
        controller.enqueue(encoder.encode(sse({ type: "fallback", ...fallbackAnswer(question) })));
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
