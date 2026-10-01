# Architecture Decision Records (ADRs)

Short, dated records of choices that future work should not silently reverse. Newest
context at the top of each entry. Add an ADR whenever you make a call with lasting
consequences or reject a plausible approach.

---

## ADR-001 — Static export on Cloudflare Pages (not OpenNext Workers)

**Status:** Accepted · **Date:** 2026 (pre-existing, recorded 2026-07-25)

**Decision:** Ship the site as a Next.js **static export** (`output: "export"`) hosted
on **Cloudflare Pages**, deployed by pushing to GitHub `main`.

**Context / why:** An earlier setup targeted **Cloudflare Workers via the OpenNext
adapter** (`@opennextjs/cloudflare`, `wrangler deploy`, `.open-next/worker.js`) to keep
full Next.js behavior. It was abandoned in favor of a plain static build: simpler,
no Worker CPU limits or `1102` errors, and no server to operate. Local
`wrangler pages deploy` also proved unreliable (asset-upload timeouts from this
network), so Git-connected auto-deploy is the one true path.

**Consequences:** No API routes, middleware, Server Actions, ISR, or image optimizer.
Server behavior must be a **Cloudflare Pages Function**. There is no `wrangler` config
in the repo.

> ⚠️ The root `DEPLOY.md` may still describe the old OpenNext/Workers flow — it is
> **stale**. The authoritative deploy path is [architecture.md](architecture.md) +
> [handoff.md](handoff.md).

---

## ADR-002 — Books carousel: per-card circular-position model (not a tripled array)

**Status:** Accepted · **Date:** 2026-07-25

**Decision:** The homepage Books carousel positions each card by its **circular
distance** from the active index (`circularDelta(active, i, count)` → each card springs
to `x = rel * step`). Visible cards are always `rel ∈ {-1, 0, +1}`.

**Context / why:** The first "infinite loop" attempt tripled the books array
(`[...books, ...books, ...books]`) and silently **recentered** the index on Framer's
animation `onComplete`. It was fragile and **visibly broke** (the loop "didn't work").
The circular model loops seamlessly *by construction* — the visible cards never cross
the wrap seam (only far, opacity-0 cards do), so no recenter bookkeeping is needed.

**Consequences:** Forward/backward looping is jump-free; at every index a center card
plus a left/right neighbor are shown. **Do not** reintroduce the tripled-array/recenter
approach.

**Related:** Mobile swipe uses Framer `onPan` + `touchAction: "pan-y"` (vertical scroll
preserved). A mobile-only "Swipe to explore" hint aids discoverability and fades after
first interaction. Desk renders live in `public/images/books/renders/<slug>-desk.webp`
(all 10 books covered); titles without one fall back to the ambient stage gradient.

---

## ADR-003 — Payments via Paystack popup + server verify (not a custom card form)

**Status:** Accepted · **Date:** 2026 (recorded 2026-07-25)

**Decision:** Use Paystack's **client-side popup** for card entry, then verify the
transaction in a **Cloudflare Pages Function** (`paystack-verify`).

**Context / why:** The prior `PartnershipEngine` was a mock that collected raw card
number/expiry/CVV into React state and faked success. Real card data now only ever
enters **Paystack's own iframe**, keeping the site out of PCI scope, and success is
confirmed server-side so it can't be spoofed from the browser.

**Consequences:** `PAYSTACK_SECRET_KEY` must be set in the Cloudflare dashboard
(Production + Preview). Public key + subaccount code are safe in client code.

---

## ADR-004 — `/admin` ships without authentication (accepted gap)

**Status:** Superseded in part by ADR-007 (live data is behind Cloudflare Access) · **Date:** 2026 (recorded 2026-07-25)

**Decision:** The `/admin/*` dashboard is read-only over static data and has **no auth**.

**Context / why:** It only *displays* hardcoded `src/data/*` content — there is no
database to protect and nothing is mutable. Shipping it unauthenticated is tolerable
short-term, but anyone with the URL can view it.

**Consequences / follow-up:** Add at least a basic password gate before a real
public-domain launch, independent of any future backend. Revisit this ADR if admin ever
gains write access (which would also require a database + real auth).

---

## ADR-005 — No database; content is static TypeScript

**Status:** Accepted for content; superseded for form submissions by ADR-007 · **Date:** 2026 (recorded 2026-07-25)

**Decision:** All content lives in `src/data/*.ts` and is imported directly. No DB, ORM,
or persistence layer.

**Context / why:** The site is presentational; content changes are infrequent and can go
through the normal edit-and-deploy flow. This keeps the static-first model intact and
removes an entire class of operational burden.

**Consequences:** "Editing content" means editing a `.ts` file and redeploying. If
persistence is genuinely needed later, prefer a Cloudflare-native store (D1/KV) behind a
Pages Function and record a new ADR.

---

## ADR-006 — i18n: real per-locale UI copy; long-tail stays English

**Status:** Accepted · **Date:** 2026 (recorded 2026-07-25)

**Decision:** Support five locales (`en, fr, pt, sw, ar`) with **real** per-locale copy
for UI/page chrome (in `src/i18n/pages/*.ts`); leave long-tail content (book
descriptions, individual video titles, AI replies) in English.

**Context / why:** A root bug read `params.locale` synchronously (Next 16 makes it a
Promise), silently forcing English site-wide — fixed by awaiting `params`. Translating
the full book/video catalog is a separate, much larger content project, deferred
deliberately.

**Consequences:** Every new UI string must be added to all five locale objects.
`ar` renders RTL. Don't hardcode user-facing English in a component that has a copy module.

---

## ADR-007 — Form submissions in Cloudflare D1; Apps Script only sends email

**Status:** Accepted · **Date:** 2026-09-30

**Decision:** Event registrations and the mentorship waitlist post to our own Pages
Function `POST /api/submit`, which writes to a D1 database (`dogtn-forms`, binding
`DB`, declared in `wrangler.toml`) *before* anything else. The confirmation email and
the Google Sheet mirror are handed to the existing Apps Script afterwards
(`waitUntil`), and the outcome is recorded per row (`email_status`). The team reads
sign-ups at `/admin/submissions` (JSON + CSV via `/api/admin/*`), which is behind
**Cloudflare Access**; the Functions also verify the Access JWT and fail closed until
`ACCESS_TEAM_DOMAIN` + `ACCESS_AUD` are set.

**Context / why:** The browser used to post straight to Apps Script, which appended to
the Sheet and then sent two Gmail messages (team alert + confirmation). Consumer
Gmail caps MailApp at 100/day, so after ~50 sign-ups the script threw, the student saw
an error although the row was saved, and retries created duplicates. Payload CMS was
considered and rejected: it needs a running Node server, i.e. undoing ADR-001, to
solve what is a storage-and-email problem.

**Amendment (2026-10-01):** a password gate (HTTP Basic, user `admin`, secret
`ADMIN_PASSWORD`) was added alongside Access so the admin works without Zero Trust
setup. It covers `/<locale>/admin*` pages (`functions/[locale]/admin/_middleware.js`)
and `/api/admin/*`; a correct password sets a signed 12-hour `HttpOnly; SameSite=Strict`
cookie. Either Access or the password admits; with neither configured, 503.

**Consequences:** Nothing is lost to the email cap; failed emails are retried from the
admin page (Apps Script gets `resend: true` and skips the Sheet). The per-sign-up team
alert email is gone (it halved capacity). A resubmission by the same email for the
same event/track updates one row (`UNIQUE(type, ref, email)`). Moving email to Brevo /
SES later only touches `sendConfirmation` in `server/forms.js`. Local testing needs
`wrangler pages dev out` (not `next dev`). Tests use Node's built-in runner
(`npm test`, no new dependency) rather than Vitest.

