# DGTN Website Handoff

## Project

- Local project path: `/Users/thecreativebeacon/dogtn-website`
- GitHub repo: `https://github.com/dominioncitychurchajah/dogtn-website`
- Production site: `https://dogtn-website.pages.dev`
- Cloudflare Pages project name: `dr-david-ogbueli`
- Cloudflare Pages domain: `dogtn-website.pages.dev`
- Production branch: `main`

## Current Deployment Pathway

The project is now connected to GitHub through Cloudflare Pages. The correct deployment pathway is:

1. Make code or asset changes locally in `/Users/thecreativebeacon/dogtn-website`.
2. Run a local production build:

   ```bash
   npm run build
   ```

3. Commit the changes to Git.
4. Push to GitHub `main`:

   ```bash
   git push origin main
   ```

5. Cloudflare Pages automatically pulls from GitHub, builds the site, and deploys production.

Do not use local `wrangler pages deploy out` as the normal path. It previously failed repeatedly because sustained local uploads to the Cloudflare Pages asset upload endpoint were timing out from this network. Git-connected Cloudflare Pages deployment is now the reliable path.

## Cloudflare Build Settings

Use these settings if the Cloudflare Pages project ever needs to be reconnected or recreated:

- Framework preset: `Next.js`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Root directory: blank or `/`
- Automatic deployments: enabled

To check deployments from the terminal:

```bash
npx wrangler pages deployment list --project-name dr-david-ogbueli
```

The old project reference/name `dogtn-website` may not work in Wrangler anymore. The active Cloudflare Pages project name is `dr-david-ogbueli`, even though the public domain remains `dogtn-website.pages.dev`.

## Current Known Good State

Latest commit pushed to GitHub:

```text
d1497e9 Nav restructure (Media/Mentorship replace Teachings/Events), on-site video lightbox, GMTV Studio filter, Ministries rebuild, homepage responsive fix
```

Cloudflare Pages should automatically build this commit from the connected `main` branch. Verify the new commit in the Cloudflare dashboard or with Wrangler after authenticating to the correct Cloudflare account.

Useful verification commands:

```bash
git status --short
git rev-parse --short HEAD
npm run build
npx wrangler pages deployment list --project-name dr-david-ogbueli
curl -Ls https://dogtn-website.pages.dev/en/ | rg -o 'dr-david-ogbueli-brand|width="341"|height="122"'
```

## Major Work Completed

### Deployment

- Connected Cloudflare Pages to the GitHub repo.
- Confirmed Cloudflare now auto-deploys from pushes to `main`.
- Confirmed the production site is served at `https://dogtn-website.pages.dev`.
- Confirmed the active Cloudflare Pages project name is `dr-david-ogbueli`.

### Copy and Audit Updates

Several audit-driven copy and UX updates were applied across the Next app, including:

- Homepage hero copy cleanup.
- Removal of the noisy homepage hero pill: `Watch live Sundays, 8 AM GMT+1`.
- Updated organization naming and positioning copy.
- Start Here page refinements.
- Community page CTA update.
- Program/event/training language adjusted so programs are free where appropriate.
- Give page amount fields preserved because giving still needs amount entry.

### Logo Update

New Dr. David Ogbueli Ministries logo artwork was added and deployed.

Current logo files used by the app:

- `/public/images/logo/dr-david-ogbueli-brand-dark.png`
- `/public/images/logo/dr-david-ogbueli-brand-white.png`

These are referenced in:

- `/src/components/layout/Header.tsx`
- `/src/components/layout/Footer.tsx`

The logo dimensions were updated to:

```text
341 x 122
```

The older same-name logo paths were being cached by the public Pages domain, so versioned filenames were added to force Cloudflare to request the fresh artwork immediately.

### Homepage Hero Video

The homepage hero now uses:

- Desktop-capable connections: `/public/video/home-hero.mp4`, muted, inline, and looped.
- Mobile visitors: the existing `/public/images/pastor/hero-preaching-stage.png` poster image only.
- Slow or `Save-Data` connections: poster image only.
- Unsupported browsers: poster image fallback.

The source MP4 is approximately 7.5 MB. It is intentionally not loaded on mobile, but a future optimization pass should create a smaller desktop web encode or move the asset to Cloudflare Stream if traffic grows.

The loading policy is implemented in:

- `/src/components/sections/HeroMedia.tsx`
- `/src/components/sections/Hero.tsx`

### Site-Wide Redesign (Personal-Legacy Brand: Navy/Gold/Cream)

Homepage, Ministries, Books, Media, His Story, Contact, and Partnership were rebuilt against the "Institutional Gravity" personal-legacy brief (`#0A192F` navy / `#C9A227` gold / `#F5F1E8` cream, Playfair Display + Inter, Framer Motion). Dead legacy routes were removed: `/about`, `/community`, `/institutions`, `/library`, `/live`, `/teachings` (old), `/ministries` (plural dupe), `/give` (folded into Partnership), the internal `/events` browsing system (kept `/admin/events` and `src/data/events.ts` — those still work, just no public browsing UI). All internal `/community` and `/institutions` links were repointed.

### Start Here Page Redesign (Debbie AI Chat)

Full layout/interaction rebuild of `src/app/[locale]/start-here/`, replacing the old two-column (chat + right sidebar) layout with a single centered ~900px column, matching a Hostinger/Notion-style conversational-AI reference brief:

- **Layout**: `HeroChat.tsx` — removed the right-hand "Your Next Steps" sidebar entirely. The two next-step cards now live in `QuickJumpCards.tsx`, rendered as two horizontal 50/50 cards below the pill buttons, under an "Or jump straight in" divider. They fade out once the chat starts.
- **Input**: `ChatInput.tsx` already had the amber glow-on-focus and typewriter-fill behavior; kept as-is.
- **Pills**: `QuickPills.tsx` — hover state changed to `scale(1.02)` + background lighten (was translate-based), click still shows the brief "pressed" `scale(0.95)` animation.
- **Thinking state**: `ThinkingIndicator.tsx` — rewritten to derive its 3-step text from the same `steps` array `useAIChat.ts` actually pushes (previously a hardcoded, drifted-out-of-sync duplicate list), added an animated 3-dot bounce next to "Debbie is thinking" (replacing a spinner), kept the ~2.6s amber progress bar fill.
- **Response card**: `RoutingCard.tsx` — left border widened to 4px amber; the countdown was upgraded from text-only to a real depleting progress bar (`animation-play-state` driven, so pause/resume needs no JS timing math), and hovering the card now genuinely pauses both the number and the bar, resuming on mouse-leave.
- **Ambient background**: added a slow 20s ambient gradient drift (`.ambient-gradient` in `globals.css`) to the dark hero section.
- **Accessibility**: reduced-motion was already handled globally in `globals.css` (blanket `prefers-reduced-motion` rule), so no extra work was needed there.
- **Cleanup**: `TodosSection.tsx` (the old sidebar component) and `src/components/start-here/StartHereExperience.tsx` (an orphaned earlier prototype, zero consumers) have both been deleted — this was flagged mid-session but blocked by a sandbox permission gate at the time; removed in this pass.

### Leadership Assessment Results Bug Fix

`src/app/[locale]/leadership/assessment/results/page.tsx` had a contradiction bug: the big headline was keyed only on score band, while the "Recommended Next Step" card was keyed on band **and** self-reported placement (whether the user already completed DLI Basic). A "Developing" band user who'd already done DLI Basic got a headline saying "...DLI Basic begins" next to a card saying "Step up to DLI Advanced." Fixed by restructuring `bandNarrative` to the same `Band × Placement` shape as `recommendationMatrix`, so both pieces of copy are always derived from the same placement value.

### Site-Wide i18n (French, Portuguese, Swahili, Arabic)

Root cause found and fixed: `src/app/[locale]/page.tsx` read `params.locale` synchronously instead of awaiting it as a Promise (Next.js 16 requirement), so locale always silently resolved to English regardless of the URL — isolated to just the homepage; all other pages were already correct. Beyond that fix, wired real per-locale copy (not machine-translated placeholders) into Homepage, Ministries, Books, Media, His Story, Contact, and Partnership, plus the homepage's `NextGathering` and `JourneyStrip` subcomponents which had a few stray hardcoded English strings. Long-tail data (book catalog descriptions, individual video titles, AI chat responses) intentionally stays English — a separate, much larger content project.

### Footer Redesign

Rebuilt against a UX/accessibility audit: renamed "His Story" → "About" and "Connect" → "Contact" columns, added "Start Here" to Resources, rewrote the newsletter section with a benefit-driven headline/CTA, added `focus-visible` rings across every interactive element (none existed before), bumped social icons from 36px to the WCAG-minimum 44px touch target, and tightened link/heading contrast and letter-spacing.

### Navigation Restructure

Multiple passes, latest state: **Start Here · About ▾ · Mentorship · Books ▾ · Media · Partnership · Contact**, plus a "Take Free Assessment" gold CTA button (replacing the old "Give" button). "Give" was fully removed as a nav destination (folded into Partnership); "Events" was removed from the nav entirely in favor of "See Upcoming Events" CTAs placed on the Media and Ministries pages, linking out to `https://dcglobal-gules.vercel.app/en/events`. The About dropdown holds His Story, The Ministries, and Take the Leadership Assessment.

### Media Page Rebuild

Renamed "Teachings" to "Media" everywhere (nav, headings, metadata). Replaced 6 fabricated placeholder videos with 42 real, individually oEmbed-verified videos from the official Pastor David Ogbueli YouTube channel, organized into Teachings / GMTV Studio (renamed from "TV Broadcast," all 12 real GMTV sessions found on the VOD library included) / Conference Archives. Clicking a video now opens an on-site lightbox (`AnimatePresence` modal, ESC/backdrop/close-button all close it, autoplay on open, playback forced to `about:blank` immediately on close so it can't keep playing during the exit animation) instead of redirecting to YouTube. Podcast section deliberately left as a structured placeholder, not built out.

### Ministries Page Rebuild

Renamed "Ministry" to "Ministries" everywhere (nav, footer, headings, metadata). Expanded from 6 institutions to the 8 real ministries, in this exact required order: Dominion City Global, Golden Heart Foundation, Global Missions Network, Global Leadership Forum, Dominion Leadership Institute, Priesthood Institute, Huram Development, Shalom World — each with its real logo (copied in from a supplied assets folder into `/public/images/ministries/`) and the supplied description text.

### Paystack Payment Integration

`src/components/forms/PartnershipEngine.tsx` was previously a complete mock: it collected raw card number/expiry/CVV directly into React state and faked success after a `setTimeout`. Replaced with Paystack's real client-side popup checkout (card entry happens inside Paystack's own secured iframe, never in this site's code — this is also what keeps it PCI-scope-clean), with a USD/NGN currency toggle. Added a **Cloudflare Pages Function** at `functions/api/paystack-verify.js` — the only server-side code in the project — which verifies the transaction server-side against Paystack's API using a secret key held in an environment variable, never committed to the repo. The public key and subaccount code (both safe to expose client-side) are hardcoded in `PartnershipEngine.tsx`.

**Outstanding**: `PAYSTACK_SECRET_KEY` must be set in the Cloudflare Pages dashboard (Settings → Environment Variables, Production and Preview) before the verify function will work live — cannot be done from this environment, no Cloudflare dashboard/API access here.

### Known Gap: `/admin` Has No Authentication

The `/admin` section (`src/app/[locale]/admin/*`) is a full dashboard shell — Dashboard, Content Studio, Journeys, Assessment Manager, Applications, Events Manager, Giving, Chapters, Users & Roles — but every page is read-only against hardcoded static data files (there is no database anywhere in the project), and there is **no authentication of any kind** gating it. Anyone who knows the URL can view it. Worth a basic password gate before this ships to a real domain, independent of whether a full backend (database + auth + CRUD API) is built later.

## Important Development Notes

This app uses Next.js 16. The repo has an instruction in `AGENTS.md`:

```text
This is NOT the Next.js you know.
Read relevant guide in node_modules/next/dist/docs/ before writing code.
```

Before editing Next-specific behavior, read the relevant local docs under:

```text
node_modules/next/dist/docs/
```

For public images and `next/image`, the relevant docs are:

```text
node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/public-folder.md
node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md
```

## Recommended Change Workflow for Future AI Tools

1. Start by checking the repo state:

   ```bash
   cd /Users/thecreativebeacon/dogtn-website
   git status --short
   git rev-parse --short HEAD
   ```

2. Read `AGENTS.md`.
3. Read the relevant Next.js 16 docs in `node_modules/next/dist/docs/` before changing app behavior.
4. Locate existing patterns with `rg`; do not redesign broadly unless requested.
5. Make surgical edits.
6. Run:

   ```bash
   npm run build
   ```

7. Commit only the intended files.
8. Push to `main`.
9. Confirm Cloudflare deployment:

   ```bash
   npx wrangler pages deployment list --project-name dr-david-ogbueli
   ```

10. Verify the public site directly with `curl` or browser checks.

## Things Not to Do

- Do not expose or reuse any pasted personal access tokens in notes, commits, or logs.
- Do not use destructive Git commands like `git reset --hard` unless the user explicitly requests it.
- Do not revert unrelated work in the repo.
- Do not rely on local Wrangler upload as the main deployment pathway.
- Do not assume the Cloudflare project name is `dogtn-website`; use `dr-david-ogbueli` for Wrangler project commands.

## Quick Handoff Prompt

Use this prompt for another AI tool:

```text
You are working on the DGTN website in /Users/thecreativebeacon/dogtn-website.

Read AGENTS.md first. This is a Next.js 16 app, and the repo requires reading relevant docs in node_modules/next/dist/docs/ before editing Next-specific code.

Deployment is now through Cloudflare Pages connected to GitHub, not local Wrangler upload. Make changes locally, run npm run build, commit, push to origin main, then Cloudflare auto-deploys. The active Cloudflare Pages project name is dr-david-ogbueli, while the public domain is https://dogtn-website.pages.dev.

Use:
npx wrangler pages deployment list --project-name dr-david-ogbueli

Current logo assets are /public/images/logo/dr-david-ogbueli-brand-dark.png and /public/images/logo/dr-david-ogbueli-brand-white.png, referenced in Header.tsx and Footer.tsx.

The homepage hero video is /public/video/home-hero.mp4. It is desktop-only by policy, with /public/images/pastor/hero-preaching-stage.png as the mobile and network fallback.

Keep edits surgical, preserve existing design patterns, and verify with npm run build before pushing.
```
