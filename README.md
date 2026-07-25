# DGTN — Dr. David Ogbueli Website

Ministry website for **Dr. David Ogbueli** and the David Ogbueli Global Transformation
Network. Next.js 16 (App Router, TypeScript, Tailwind), built as a **static export** and
deployed to **Cloudflare Pages**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Verify before committing:

```bash
npx tsc --noEmit   # type-clean
npm run build      # static export to out/  (must be clean)
```

## Deploy

Push to `main` → Cloudflare Pages (project `dr-david-ogbueli`) auto-builds and publishes
to https://dogtn-website.pages.dev. Do **not** deploy via local `wrangler`.
See [`docs/handoff.md`](docs/handoff.md) for the full pipeline and push-access notes.

## Documentation

The project keeps its knowledge in two places:

| Where | What |
|---|---|
| [`.claude/rules/*.mdc`](.claude/rules/) | Always-on rules — how we work (never changes silently) |
| [`docs/summary.md`](docs/summary.md) | High-level overview |
| [`docs/handoff.md`](docs/handoff.md) | **Current status & next tasks** — start here |
| [`docs/decisions.md`](docs/decisions.md) | ADRs — **why** things are built this way |
| [`docs/architecture.md`](docs/architecture.md) | System shape |
| [`docs/design-system.md`](docs/design-system.md) | Colors, type, spacing, components |
| [`docs/api.md`](docs/api.md) | The one server endpoint + integrations |

> **Next.js 16 note:** this version has breaking changes from older Next. Read the
> relevant guide under `node_modules/next/dist/docs/` before editing Next-specific code,
> and remember `params`/`searchParams` are Promises (`await` them).
