# Handoff — Current Status & Next Tasks

_Last updated: 2026-07-25._

## Coordinates

- Local path: `/Users/thecreativebeacon/dogtn-website`
- Repo: `github.com/dominioncitychurchajah/dogtn-website` · branch `main`
- Production: `https://dogtn-website.pages.dev`
- Cloudflare Pages project: `dr-david-ogbueli` (note: differs from the domain)
- Push access: **only** the `dominioncitychurchajah` GitHub account.

## Current known-good state

Latest commit on `main`:

```
739f085  Books carousel: 3-card showcase with reliable loop, all 10 desk renders, mobile swipe
```

Type-clean (`tsc`) and build-clean (`npm run build`, 339/339 static pages). Cloudflare
Pages auto-builds this commit from `main`.

## Latest work (this session, 2026-07-25)

- **Books carousel rebuilt** as a premium 3-card showcase (center active + prev/next
  neighbors; 1 full-width card on mobile). Replaced the fragile tripled-array infinite
  loop with a per-card **circular-position** model that loops seamlessly. See
  [decisions ADR-002](decisions.md#adr-002).
- **All 10 book desk renders wired up** — `public/images/books/renders/<slug>-desk.webp`
  for every book with a cover (7 new + 3 existing). Titles without a render fall back to
  the ambient stage gradient.
- **Mobile swipe** — Framer `onPan` + `touchAction: pan-y` (touch-friendlier thresholds),
  plus a mobile-only "Swipe to explore" hint that fades after first interaction. New i18n
  key `swipeHint` added for all five locales.
- **Docs/rules scaffold added** — `.claude/rules/*.mdc` + this `docs/` folder.

## Deployment pathway (the one true path)

1. Edit locally → `npx tsc --noEmit` + `npm run build` (both must be clean).
2. Commit only intended files (the repo root has untracked spec files — never
   `git add .`). Push to `main`.
3. Cloudflare Pages pulls from GitHub, builds, and publishes automatically.

Do **not** use local `wrangler pages deploy out` (asset-upload timeouts from this
network). Check deploys:

```bash
npx wrangler pages deployment list --project-name dr-david-ogbueli
```

Cloudflare build settings (if the project is ever reconnected): framework `Next.js`,
build command `npm run build`, output directory `out`, production branch `main`.

## Outstanding / open items

- [ ] **Set `PAYSTACK_SECRET_KEY`** in the Cloudflare Pages dashboard (Settings →
  Environment Variables, Production **and** Preview). Until then, live payment
  verification fails. Cannot be done from this environment. See [api.md](api.md).
- [ ] **Gate `/admin` with auth** before a real public launch — it's currently
  unauthenticated (read-only over static data). See [decisions ADR-004](decisions.md#adr-004).
- [ ] **Homepage hero video** (`/public/video/home-hero.mp4`, ~7.5 MB) is desktop-only by
  policy; consider a smaller web encode or Cloudflare Stream if traffic grows.
- [ ] Confirm the new carousel swipe on a **real phone** (headless pane can't simulate a
  trusted finger gesture).

## Development notes

- **Next.js 16 is not the Next.js you know.** Read `node_modules/next/dist/docs/` before
  editing Next-specific behavior. `params`/`searchParams` are Promises — `await` them.
- Keep edits surgical; preserve existing design patterns; verify with `npm run build`
  before pushing.
- Logo assets: `/public/images/logo/dr-david-ogbueli-brand-{dark,white}.png`
  (referenced in `Header.tsx` / `Footer.tsx`), rendered at 341×122.

## Earlier work (condensed)

Prior sessions delivered the site-wide navy/gold/cream redesign ("Institutional
Gravity"), the Start Here / Debbie AI chat rebuild, the Media page (42 verified videos +
on-site lightbox), the Ministries rebuild (8 ministries), the Footer/Nav restructures,
the Leadership Assessment results-bug fix, site-wide i18n, and the Paystack integration.
Full detail is in git history and the [decisions](decisions.md) records; the deeper
narrative changelog is preserved in the repo's git log.
