import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import { buildSystemPrompt, fallbackAnswer, isDirectQuestion, matchSection } from "@/lib/knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

/**
 * Ordered model candidates. Free models share an upstream pool that is often
 * rate-limited, so we try several before giving up. `OPENROUTER_MODEL` accepts a
 * comma-separated list to override the chain.
 */
const ENV_CHAIN = (process.env.OPENROUTER_MODEL ?? "")
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);

const MODEL_CHAIN = (
  ENV_CHAIN.length > 0
    ? ENV_CHAIN
    : [
        "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        "google/gemma-4-26b-a4b-it:free",
        "openrouter/free",
      ]
).slice(0, 4);

/** Very small in-memory limiter — good enough for a low-traffic portfolio. */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const LIMIT = 12;

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

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ mode: "fallback", ...fallbackAnswer(question) });
  }

  const client = new OpenRouter({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answered = false;

      for (const model of MODEL_CHAIN) {
        const started = Date.now();
        let yielded = false;

        try {
          const completion = await client.chat.send({
            chatRequest: {
              model,
              messages: [{ role: "system", content: buildSystemPrompt() }, ...messages],
              maxTokens: 400,
              temperature: 0.3,
              reasoning: { effort: "minimal" },
              stream: true,
            },
          });

          for await (const chunk of completion) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (!delta) continue;

            if (!yielded) {
              yielded = true;
              answered = true;
              controller.enqueue(encoder.encode(sse({ type: "meta", model })));
            }

            controller.enqueue(encoder.encode(sse({ type: "delta", text: delta })));
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
          console.warn(
            `[chat] model failed ${model} ${Date.now() - started}ms`,
            error instanceof Error ? error.message : error,
          );
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
