# Deploying DOGTN to GitHub + Cloudflare

The app is production-ready and configured for **Cloudflare Workers** via the
official **OpenNext** adapter (`@opennextjs/cloudflare`). This preserves full
Next.js behavior — the locale-redirect middleware, `next/image` optimization,
and the dynamic `/verify/[id]` route all work.

Verified locally: `npm run build` ✅ and `npm run cf:build` ✅ (produces
`.open-next/worker.js`).

---

## 1. Push to GitHub

From `~/dogtn-website` (a git repo has already been initialized and committed):

```bash
# Create an EMPTY repo on github.com first (no README/license), then:
git remote add origin https://github.com/<your-username>/dogtn-website.git
git branch -M main
git push -u origin main
```

(If you use the GitHub CLI: `gh repo create dogtn-website --private --source=. --push`.)

---

## 2. Deploy to Cloudflare — pick ONE path

### Path A — Connect the repo in the Cloudflare dashboard (auto-deploy on push) ✅ recommended
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Workers** → **Import a repository**.
2. Select your `dogtn-website` GitHub repo.
3. Set build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx wrangler deploy`
   - (Framework preset: none / Next.js. Leave output dir default — `wrangler.jsonc` handles it.)
4. Save & Deploy. Every `git push` to `main` now redeploys automatically.

### Path B — Deploy from your machine (one-off / manual)
```bash
npx wrangler login      # opens a browser to authorize (do this locally)
npm run cf:deploy       # builds with OpenNext + deploys the Worker
```

To preview the production build locally before deploying:
```bash
npm run cf:preview      # builds + serves the Worker at http://localhost:8787
```

---

## Config files (already in the repo)
- `wrangler.jsonc` — Worker name `dogtn-website`, `nodejs_compat`, assets binding.
- `open-next.config.ts` — default Cloudflare OpenNext config.
- `next.config.ts` — includes `initOpenNextCloudflareForDev()` (dev only).
- npm scripts: `cf:build`, `cf:preview`, `cf:deploy`.

## Notes
- Rename the Worker by editing `name` in `wrangler.jsonc`.
- A custom domain is added under the Worker's **Settings → Domains & Routes** in the Cloudflare dashboard.
- Fonts are self-hosted (`@fontsource`), so builds need no network font fetch.
