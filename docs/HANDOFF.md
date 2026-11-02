# Handoff — Emjay Warren P. Campano Portfolio

Last updated: 2026-11-02
Repository root: `C:\Users\Emjay Warren Campano\Desktop\MyPortfolio`
Current commit: `f3a6696`

This document is written so that another developer (or another AI agent) can pick the
project up without re-litigating decisions that were already made.

---

## 1. What this is

A single-page personal portfolio for **Emjay Warren P. Campano**, an IT Specialist in
Ilagan, Isabela, Philippines (BS Information Technology, Isabela State University,
Network and Security track, class of 2026).

Goals, in priority order:

1. Look **modern, minimal, and intentional** — closer to Apple's marketing pages than to a
   developer template.
2. Present **proof**: three Certiport IT Specialist certifications, a capstone, and real work
   history.
3. Include an **assistant** that answers questions about him, without exposing the API key.
4. Be **fast and accessible** on a mid-range phone.

Non-goals: blog, CMS, authentication, comments, analytics dashboards, a full RAG pipeline.

---

## 2. Stack (pinned versions)

| Layer | Package | Version |
|---|---|---|
| Framework | `next` | 15.5.4 (App Router) |
| UI | `react` / `react-dom` | 19.1.0 |
| Language | `typescript` | 5.9.3 |
| Styling | `tailwindcss` / `@tailwindcss/postcss` | 4.3.3 |
| 3D | `three` / `@react-three/fiber` | 0.180.0 / 9.8.2 |
| Motion | `gsap` / `lenis` | 3.13.0 / 1.3.11 |
| Assistant | `@openrouter/sdk` | 1.5.33 |
| Dev rendering | `puppeteer-core` | 24.x (uses installed Edge) |

Package manager: **pnpm** (`pnpm-lock.yaml` committed). Node 24.

---

## 3. Where things live

```
app/
  layout.tsx            fonts (Instrument Serif, Inter, JetBrains Mono), metadata, theme bootstrap
  page.tsx              renders <PageClient />
  globals.css           design tokens, base styles, .display/.mono helpers, reveal + reduced-motion
  api/chat/route.ts     assistant endpoint (the only server code)
components/
  PageClient.tsx        page composition + chat open/close state + launcher
  Nav.tsx               fixed glass nav, mobile sheet, theme toggle, "Ask AI"
  Hero.tsx              3D hero copy and actions
  HeroVisual.tsx        next/dynamic wrapper so Three.js stays out of the first bundle
  FloatingNodes.tsx     the 3D network (Fibonacci sphere, 78 nodes)
  Work.tsx              simplified capstone card
  Certificates.tsx      3 certificate cards + lightbox
  Experience.tsx        timeline rows
  About.tsx             bio + skills (languages/tools tiles, then capabilities)
  SkillMarks.tsx        logo map -> /public/logos/*.svg, rendered through CSS masks
  Contact.tsx           contact section + footer
  Chat.tsx              assistant panel, streaming reader, 10-a-day limit
  ScrollRig.tsx         Lenis smooth scroll + IntersectionObserver reveals
  ThemeToggle.tsx       light/dark, persisted in localStorage
content/site.ts         ALL editable copy, certificates, experience, skills
lib/knowledge.ts        system prompt, curated answers, routing helpers
public/certificates/    3 WebP certificate images
public/logos/          19 Simple Icons SVGs (CC0), recoloured via CSS mask
docs/screens/          reference screenshots (desktop, mobile, dark, certs, chat)
```

---

## 4. Design system

Tokens live in `app/globals.css` under `:root` and `[data-theme="dark"]`.

- Light: background `#F7F6F3`, soft `#EFEDE8`, ink `#141414`, accent `#0F5F6E`
- Dark: background `#111110`, soft `#181817`, ink `#F2F0EB`, accent `#7FCBD8`
- Accent soft `#4FB3C4` is used for the 3D nodes and glows
- Type: **Instrument Serif** (display), **Inter** (UI), **JetBrains Mono** (labels)
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease`)
- Radii: 22px cards, 16px certificates, 100px pills
- Light theme is the default; dark follows the toggle only (not the OS preference)

Font wiring: `next/font` exposes `--font-instrument`, `--font-inter`, `--font-jetbrains` on
`<body>`. The usable stacks live in the Tailwind `@theme inline` block as `--font-serif`,
`--font-sans`, `--font-mono`. **Do not move those into `:root`** — custom properties resolve
where they are declared, so `var(--font-serif)` there resolves to empty. `.display` and `.mono`
reference the raw `var(--font-*)` variables directly for that reason.

3D rules: the canvas is `aria-hidden`, pointer-events none, lazy-mounted, and never mounts when
`prefers-reduced-motion: reduce`. 78 nodes, edges only under 0.82 units, no post-processing.

---

## 5. Content model

`content/site.ts` is the single source of truth. Editing it updates the page **and** the
assistant's knowledge, because `lib/knowledge.ts` builds the system prompt from it.

Exports: `profile`, `work`, `certificates`, `experience`, `about`, `contact`.

Hard-won content decisions (do not undo without asking Emjay):

- **The capstone is intentionally understated.** It is an academic project for Isabela State
  University (2025); the system is not publicly shown. Earlier drafts listed ESP32, GPS, RFID,
  4G LTE, ISO/IEC 25010 scores (4.88 and 5.00), and an architecture diagram. Emjay asked for
  all of that to be removed. The card now says: web app for monitoring vehicles, small hardware
  layer, stack `Web App / Database`, plus "the system itself is not publicly shown."
- **Skills are the headline**, not the capstone: Python, C++, JavaScript, TypeScript;
  HTML, CSS, React, Next.js; SQL, SQLite, Firebase; VS Code, Git & GitHub, Arduino IDE,
  Windows, DeepSeek, Codex, Claude Code, Antigravity.
- **Rust is listed as "Exploring — Rust (learning)".** Emjay has only built with it via
  AI-assisted ("vibe") coding. Do not promote it to a core skill; he could not defend it in an
  interview.
- **No phone number on the site.** Email only: `emjaywarrencampano@gmail.com`.
- **No AI jargon in copy.** Say "assistant"; never "LLM", "AI-powered", "prompt", "RAG".
- Copy is plain English, short sentences, no adjectives that are not backed by a fact.

---

## 6. The assistant (read this before touching it)

`POST /api/chat` has two lanes:

**Lane A — curated answers (default for common questions).**
`isDirectQuestion()` in `lib/knowledge.ts` matches short, factual questions (certifications,
capstone, availability, skills, experience, greeting) and returns
`NextResponse.json({ mode: "direct", text, section })`. No provider call, no cost, ~10–60 ms.
It deliberately rejects anything with reasoning verbs (`why`, `how`, `explain`, `compare`,
`good fit`, `should`, `would`, ...) or longer than 12 words / 140 chars.

**Lane B — model answers (open-ended questions).**
Uses `@openrouter/sdk` `chat.send({ stream: true })`, relays tokens as SSE events
(`meta` → `delta`* → `done`), with `reasoning: { effort: "minimal" }` and `maxTokens: 400`.
Walks a model chain, 12 s timeout per model, and falls back to a curated answer if every
provider fails.

Model chain is `OPENROUTER_MODEL` (comma-separated). Default:

```
nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free,
google/gemma-4-26b-a4b-it:free,
openrouter/free
```

**Limits**

- 10 written answers per visitor per day, tracked in `localStorage` (`ewc-ai-usage`), counted
  only when a stream starts or the server returns `mode: "ai"`. Quick facts are unlimited.
  When exhausted, the input is replaced by a message pointing at the email address.
- 10 requests per minute per IP on the server (in-memory `Map`; resets on cold start).
- 20 messages per request, 1,500 characters per message, 400 output tokens.

**Client parsing** (`components/Chat.tsx`): reads SSE lines, accumulates `delta.text`, and on
`done` attaches `action.section` so a "Jump to section" button appears. JSON responses are
handled separately and also attach `section`.

**Provider reality:** Emjay's key has **$0 credit** but 1,000 free requests/day. Free models
share an upstream pool, so written answers take **1–15 s** and occasionally fail. That is why
Lane A exists and why every failure path returns a useful curated answer. To make Lane B
consistently fast, add credit or point `OPENROUTER_MODEL` at a paid model.

---

## 7. Environment & secrets

`.env.local` (gitignored, never committed):

```
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free,...
```

`.env.example` is committed with empty values. The key is read **only** in
`app/api/chat/route.ts` and never reaches the client. On Vercel, set both variables under
Project Settings → Environment Variables.

If the key was ever pasted into a chat, a ticket, or a screenshot, rotate it in the OpenRouter
dashboard before going live.

---

## 8. Run, verify, deploy

```bash
pnpm install
pnpm dev            # http://localhost:3000

pnpm typecheck      # tsc --noEmit, must exit 0
pnpm build          # must exit 0; ~168 kB first load for "/"
pnpm start          # production server
```

Manual checks that were used during development (all currently passing):

- Desktop 1440×900 and mobile 390×844 with no horizontal overflow
  (`document.documentElement.scrollWidth === window.innerWidth`).
- Certificate lightbox opens/closes on click and Escape.
- Assistant: a curated question returns in under 100 ms; a reasoning question streams; at 10
  used, the input disappears and the daily-limit message shows.
- "Jump to section" scrolls to `#certifications` (`scrollTop` lands with section top ≈ 0).
- Reduced motion: no canvas, reveals already visible.
- Dark mode persists across reloads.

Deployment target: **Vercel**, connected to the GitHub repo. GitHub Pages is not viable because
`/api/chat` needs a server runtime.

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

---

## 9. Known limitations / next steps

1. **No live URL yet.** Repo is local (`git init` done, 4 commits, clean tree).
2. **No project screenshots or headshot.** `assets/` holds raw sources; `public/` holds only the
   three certificates. Emjay has not supplied photos.
3. **Free-model latency** (see §6). Consider a paid model or a small credit balance.
4. **The daily limit is client-side.** A determined visitor can clear `localStorage`; the server
   minute-limit still applies. Server-side daily quotas would need storage (Upstash/Redis).
5. **Metadata base URL** in `app/layout.tsx` is a placeholder
   (`https://emjaycampano.vercel.app`). Update it after the first deploy for correct OG tags.
6. Social links in `content/site.ts` (`linkedin`, `github`) are empty; the Contact section links
   only email and Certiport verification.

---

## 10. Conventions

- Server work only in `app/api/**`; everything else is a client or server component without
  data fetching.
- Content changes go in `content/site.ts`, not in JSX.
- New logos: drop an SVG into `public/logos/`, add it to `LOGOS` in `components/SkillMarks.tsx`
  with a brand colour. Logos are rendered as CSS masks, so they inherit the palette.
- Keep the palette to one accent. Do not add gradients, glass everywhere, or extra fonts.
- Run `pnpm typecheck && pnpm build` before every commit.
