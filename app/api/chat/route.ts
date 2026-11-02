import { NextResponse } from "next/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { buildSystemPrompt, fallbackAnswer } from "@/lib/knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 20;
const MAX_CHARS = 1500;

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

function parseMessages(body: unknown): UIMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const messages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  for (const message of messages) {
    if (!message || typeof message !== "object") return null;
    const { role, parts } = message as { role?: unknown; parts?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (!Array.isArray(parts)) return null;

    const text = parts
      .map((part) => (part && typeof part === "object" && "text" in part ? String(part.text) : ""))
      .join("");

    if (text.length > MAX_CHARS) return null;
  }

  return messages as UIMessage[];
}

function lastUserText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message.role !== "user") continue;
    return message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("")
      .trim();
  }
  return "";
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

  const apiKey = process.env.OPENROUTER_API_KEY;
  const question = lastUserText(messages);

  if (!apiKey) {
    const reply = fallbackAnswer(question);
    return NextResponse.json({ mode: "fallback", ...reply });
  }

  try {
    const openrouter = createOpenRouter({ apiKey });
    const result = streamText({
      model: openrouter(process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001"),
      system: buildSystemPrompt(),
      messages: convertToModelMessages(messages),
      maxOutputTokens: 320,
      temperature: 0.3,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("[chat] provider error", error);
    const reply = fallbackAnswer(question);
    return NextResponse.json({ mode: "fallback", ...reply });
  }
}
