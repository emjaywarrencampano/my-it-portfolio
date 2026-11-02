# Prompt for another AI / developer

Copy everything inside the block below into a new chat with another AI agent (or send it to a
developer) when you want them to continue this project. Attach `docs/HANDOFF.md` as well if the
tool supports files.

---

You are taking over a finished-but-not-yet-deployed portfolio project. Read this fully before
proposing changes. The authoritative details are in `docs/HANDOFF.md` in the repo; this message
is the summary you need to start.

## Project

Single-page portfolio for **Emjay Warren P. Campano**, IT Specialist, Ilagan, Isabela,
Philippines (BSIT, Isabela State University, Network and Security, class of 2026).

Goal: modern, minimal, Apple-leaning design with an assistant that answers questions about him.
No AI jargon in any copy. No blog, CMS, auth, or analytics.

Stack: Next.js 15.5.4 (App Router) · React 19.1.0 · TypeScript 5.9.3 · Tailwind v4 ·
three 0.180 + @react-three/fiber 9.8 · GSAP + Lenis · @openrouter/sdk 1.5.33 · pnpm · Node 24.

## Current state

- 4 commits, clean working tree, no live URL yet.
- `pnpm typecheck` and `pnpm build` pass. First load of `/` is ~168 kB.
- Desktop 1440×900 and mobile 390×844 verified with no horizontal overflow.
- Certificates lightbox, dark mode persistence, reduced-motion fallback, and assistant limits
  are all manually verified.

## What exists

- `content/site.ts` — all copy, certificates, experience, skills. **Edit content here, never in
  JSX.**
- `app/api/chat/route.ts` — the only server code.
- `components/` — Nav, Hero, HeroVisual, FloatingNodes (3D), Work, Certificates, Experience,
  About, SkillMarks, Contact, Chat, ScrollRig, ThemeToggle, PageClient.
- `lib/knowledge.ts` — system prompt, curated answers, routing helpers.
- `public/certificates/` — 3 WebP certificates; `public/logos/` — 19 Simple Icons SVGs.
- `docs/screens/` — reference screenshots; `docs/HANDOFF.md` — full brief.

## Design rules (do not break)

- Light theme first (`#F7F6F3` / ink `#141414`), dark toggle (`#111110`), one accent
  (`#0F5F6E`, dark-mode `#7FCBD8`).
- Fonts: Instrument Serif (display), Inter (UI), JetBrains Mono (labels). Font variables are
  wired through the Tailwind `@theme inline` block — do not move them to `:root`.
- No gradients everywhere, no glassmorphism beyond the nav, no extra fonts, no icon soup.
- 3D: one abstract network field in the hero, lazy-mounted, never mounted under
  `prefers-reduced-motion`.

## Content decisions already made — do not undo

- The capstone ("Track My Ride", 2025, Isabela State University) is intentionally understated.
  All hardware/ISO/score details were removed at the owner's request. Do not re-add ESP32, GPS,
  RFID, 4G LTE, ISO/IEC 25010, 4.88, 5.00, or the architecture diagram.
- Skills lead the page: Python, C++, JavaScript, TypeScript, HTML, CSS, SQL; React, Next.js,
  Firebase, SQLite; VS Code, Git & GitHub, Arduino IDE, Windows, DeepSeek Harness, Codex,
  Claude Code, Antigravity.
- Rust stays under "Exploring" (learning); it is not a core skill.
- Email only. No phone number on the site.
- No AI vocabulary in user-facing copy ("assistant", never "LLM", "AI-powered", "RAG").

## The assistant (most sensitive part)

Two lanes in `POST /api/chat`:

1. **Curated** — short factual questions (certifications, capstone, availability, skills,
   experience, greeting) are answered from `lib/knowledge.ts` instantly, for free.
   `isDirectQuestion()` rejects anything with reasoning verbs or over 12 words.
2. **Model** — open-ended questions stream from OpenRouter via `@openrouter/sdk`, with a model
   fallback chain, `reasoning: { effort: "minimal" }`, 400 max tokens, 12 s per model.

Every failure path returns a curated answer, so the UI never dead-ends. Limits: 10 written
answers per visitor per day (localStorage), 10 requests/minute/IP on the server, 20 messages and
1,500 chars per request.

The OpenRouter key has **$0 credit** but 1,000 free requests/day; free models take 1–15 s. Do not
try to "fix" latency by removing the curated lane — that lane is what makes the site usable.
The API key lives only in `.env.local` / Vercel env vars and must never reach the client.

## What I want from you

Pick up at deployment and polish, not redesign:

1. Push to GitHub and deploy on Vercel, setting `OPENROUTER_API_KEY` and `OPENROUTER_MODEL` as
   environment variables.
2. Update the placeholder `metadataBase` in `app/layout.tsx` to the real URL.
3. Add project screenshots and a headshot if the owner supplies them (currently missing).
4. Consider a paid model (or small credit balance) to make model answers consistently fast.
5. Keep the build clean: run `pnpm typecheck && pnpm build` before any commit.

If a change conflicts with a decision above, ask first. Do not silently rewrite copy, re-add the
capstone details, or expose the key.
