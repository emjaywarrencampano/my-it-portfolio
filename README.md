# Emjay Warren P. Campano — Portfolio

Minimal, Apple-leaning portfolio with a floating-node 3D hero and an AI assistant
that answers questions about the resume content.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind v4 · React Three Fiber ·
GSAP + Lenis · OpenRouter via the AI SDK

## Run locally

```bash
pnpm install
cp .env.example .env.local   # optional — leave the key empty for fallback mode
pnpm dev
```

Open http://localhost:3000.

## Edit content

All copy, certificates, experience, and skills live in **`content/site.ts`**.
Components read from that file, so the site updates without touching JSX.

## The assistant

`POST /api/chat` runs server-side. Three behaviors:

1. **No `OPENROUTER_API_KEY`** → deterministic, keyword-based answers from `lib/knowledge.ts`.
   No external calls, no cost.
2. **Key present** → streams from OpenRouter using a system prompt built from `content/site.ts`.
3. **Provider error** → falls back to the deterministic answers.

Protections: message cap (20), per-message character cap (1,500), output token cap (320),
and a simple in-memory rate limit (12 requests/minute/IP). The API key never reaches the browser.

To use a different model, set `OPENROUTER_MODEL` (for example `anthropic/claude-3.5-haiku`).

## Certificates

Images live in `public/certificates/` as WebP. Metadata (name, date, verification ID) is in
`content/site.ts`. Clicking a card opens a lightbox.

## Deploy

```bash
git init
git add .
git commit -m "feat: portfolio"
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

Then import the repo on **Vercel** → add `OPENROUTER_API_KEY` (and optionally
`OPENROUTER_MODEL`) under Project Settings → Environment Variables → Deploy.

GitHub Pages will not work for this project because `/api/chat` needs a server runtime.

## Project layout

```
app/
  layout.tsx          fonts, metadata, theme bootstrap
  page.tsx            single-page composition
  api/chat/route.ts   assistant endpoint
content/site.ts       all editable content
components/           Nav, Hero, FloatingNodes, Work, Certificates, Experience,
                      About, Contact, Chat, ScrollRig, ThemeToggle
lib/knowledge.ts      system prompt + deterministic fallback answers
public/               certificates and static assets
```

## Accessibility & motion

- Light theme by default, dark theme persisted in `localStorage`.
- Scroll reveals are disabled under `prefers-reduced-motion`; the 3D canvas is not mounted.
- Focus states, `aria-label`s, and Escape-to-close on the assistant and lightbox.
