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
14d6b35 Add optimized desktop hero video fallback
```

Cloudflare Pages should automatically build this commit from the connected `main` branch. The latest confirmed Cloudflare deployment before the hero-video push was the logo deployment; verify the new commit in the Cloudflare dashboard or with Wrangler after authenticating to the correct Cloudflare account.

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
