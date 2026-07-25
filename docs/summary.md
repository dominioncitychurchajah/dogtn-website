# Project Summary — DGTN / Dr. David Ogbueli

## What it is

A faith-based ministry website for **Dr. David Ogbueli** and the **David Ogbueli
Global Transformation Network (DGTN)**. It presents his teachings, books, media,
ministries, and partnership/giving, and onboards new visitors through a
conversational-AI guide ("Debbie") on the **Start Here** page.

## Audience

Followers of the ministry, prospective partners/givers, leaders seeking mentorship
and the Leadership Institute, and a global audience across five languages
(English, French, Portuguese, Swahili, Arabic).

## Tech at a glance

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Output | **Static export** (`out/`) — no runtime server |
| Hosting | Cloudflare Pages (project `dr-david-ogbueli`) |
| Server code | One Cloudflare Pages Function (`paystack-verify`) |
| Data | Static TypeScript in `src/data/*` — **no database** |
| Payments | Paystack (client popup + server verify) |
| AI | Groq, called client-side (Debbie) |
| i18n | 5 locales; per-page copy modules in `src/i18n/pages/*` |

## Deploy in one line

Push to GitHub `main` → Cloudflare Pages auto-builds and publishes to
`https://dogtn-website.pages.dev`.

## Map of the knowledge base

- **How we work (always-on rules):** `.claude/rules/*.mdc`
- **Where we are now:** [`handoff.md`](handoff.md)
- **Why it's built this way:** [`decisions.md`](decisions.md)
- **System shape:** [`architecture.md`](architecture.md)
- **Visual system:** [`design-system.md`](design-system.md)
- **Integration contracts:** [`api.md`](api.md)
