# Deploying DGTN

> **Superseded.** The old OpenNext / Cloudflare **Workers** approach documented here
> previously is obsolete — see [`docs/decisions.md` → ADR-001](docs/decisions.md#adr-001).
> The site is now a **static export** on **Cloudflare Pages**.

## The one true path

1. Edit locally. Verify:
   ```bash
   npx tsc --noEmit
   npm run build        # static export → out/  (must be clean)
   ```
2. Commit only the files you intended to change (the repo root has untracked spec
   files — never `git add .`).
3. Push to `main`:
   ```bash
   git push origin main
   ```
4. **Cloudflare Pages** (project `dr-david-ogbueli`) pulls from GitHub, builds, and
   publishes automatically to https://dogtn-website.pages.dev.

Do **not** use local `wrangler pages deploy out` — sustained uploads to Cloudflare's
asset endpoint time out from this network. Git-connected deploy is the reliable path.

## Push access

Only the **`dominioncitychurchajah`** GitHub account can push. If a push 403s:

```bash
gh auth switch --hostname github.com --user dominioncitychurchajah
```

## Cloudflare build settings (if the project is ever reconnected)

- Framework preset: `Next.js`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Automatic deployments: enabled

Check deploys:

```bash
npx wrangler pages deployment list --project-name dr-david-ogbueli
```

Full context: [`docs/architecture.md`](docs/architecture.md) and
[`docs/handoff.md`](docs/handoff.md).
