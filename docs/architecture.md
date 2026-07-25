# Architecture

## 1. Runtime model — static-first

The site is a **Next.js 16 App Router application exported as fully static assets**.

`next.config.ts`:
```ts
output: "export",        // emit plain HTML/CSS/JS to out/
trailingSlash: true,
images: { unoptimized: true },  // no image-optimization server
```

Consequences that shape everything else:

- **No runtime Node server.** No Next.js API routes, no middleware, no Server Actions,
  no ISR/on-demand revalidation. Every page is rendered at build time.
- **No image optimizer.** `next/image` serves files as-is; assets must be pre-sized.
- Dynamic-feeling behavior is either client-side React or a build-time computation.

Hosting is **Cloudflare Pages** serving the `out/` directory. (This replaced an
earlier OpenNext → Cloudflare Workers approach — see [decisions](decisions.md#adr-001).)

## 2. Server surface — one function

```
functions/api/paystack-verify.js
```

A **Cloudflare Pages Function** (deployed automatically alongside the static assets)
that verifies a Paystack transaction server-side using `PAYSTACK_SECRET_KEY` from the
environment. This is the *entire* backend. Contract: [api.md](api.md).

## 3. Routing & internationalization

- Routes live under `src/app/[locale]/…`. Every page is locale-prefixed.
- Locales (`src/i18n/config.ts`): `en, fr, pt, sw, ar`. `ar` renders RTL
  (`dirFor(locale)`).
- **Next 16:** `params`/`searchParams` are Promises — always `await`. A past bug
  forced English site-wide because the homepage read `params.locale` synchronously.
- UI copy is centralized in `src/i18n/pages/*.ts` (`booksCopy`, `mediaCopy`,
  `ministryCopy`, …), keyed by locale. Long-tail content (book descriptions, video
  titles, AI replies) stays English by design.

## 4. Data layer — static, no database

All content is hand-authored TypeScript in `src/data/*.ts` (`books.ts`, `events.ts`, …),
imported directly by components. `/admin/*` renders this data **read-only** and has
**no authentication** (known gap — see [decisions](decisions.md#adr-004)). "Editing
content" = editing the `.ts` file and redeploying. See the [database rule](../.claude/rules/database.mdc).

## 5. Client-side integrations (no server involved)

- **Paystack popup** (`src/components/forms/PartnershipEngine.tsx`) — card entry inside
  Paystack's iframe; server function verifies the result.
- **Debbie AI** (Start Here) — calls **Groq** directly from the client (public key).
- **Contact** — `mailto:` only.
- **Events** — CTA links out to an external events site.

## 6. Directory map

```
src/app/[locale]/   pages (routes)
src/components/
  sections/         homepage & page sections (Hero, BooksCarousel, …)
  layout/           Header, Footer, Section/Container
  forms/            PartnershipEngine (Paystack), etc.
  ui/               primitives (Badge, …)
  admin/            read-only admin shell (DataTable, …)
  start-here/       Debbie chat experience
src/data/           static content — the "database"
src/i18n/           locale config + per-page copy
src/lib/            helpers (cn, formatDate, …)
functions/api/      Cloudflare Pages Functions (server code)
public/             images, video, fonts
out/                build output (generated; not edited by hand)
```

## 7. Build & deploy pipeline

1. Edit locally → `npx tsc --noEmit` + `npm run build` (must be clean).
2. Commit only intended files; push to `main`.
3. Cloudflare Pages (`dr-david-ogbueli`) auto-builds and publishes.

Cloudflare build settings (if the project is ever reconnected): build command
`npm run build`, output directory `out`, production branch `main`. Details and the
account/push specifics are in [handoff.md](handoff.md) and the
[git-workflow rule](../.claude/rules/git-workflow.mdc).
