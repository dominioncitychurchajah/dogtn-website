# API & Integrations

The site is static; server-side code is Cloudflare Pages Functions under
`functions/api/*` (shared helpers in `server/`). Everything else is a client-side call
to a third party.

## `POST /api/submit`

**File:** `functions/api/submit.js`. Used by `EventRegistrationForm` and `WaitlistForm`.

**Request:** JSON (sent as `text/plain`). `type: "registration"` (default) needs
`fullName, email, phone, country, eventSlug` (+ `eventTitle, seats 1-20, volunteer,
volunteerAreas`); `type: "waitlist"` needs `fullName, email, phone, country` (+ `track,
trackName, currentRole`). A non-empty `website` (honeypot) returns ok and stores nothing.

**Response:** `{ ok: true }` once the row is in D1; `{ ok: false, error }` with 400 for
invalid input, 500 if D1 fails. Email/Sheet happen after the response and never
affect it.

## `GET /api/admin/submissions?type=registration|waitlist[&format=csv]`
## `POST /api/admin/retry-emails`

Behind Cloudflare Access; `functions/api/admin/_middleware.js` verifies the
`Cf-Access-Jwt-Assertion` JWT (`server/access.js`) and returns 503 until
`ACCESS_TEAM_DOMAIN`/`ACCESS_AUD` are set, 401 without a valid token. Submissions
returns `{ type, rows }` or a CSV download (formula cells neutralised). Retry resends
up to 25 failed/stuck confirmation emails via Apps Script with `resend: true` and
returns `{ tried, sent, failed, remaining }`.

## `POST /api/paystack-verify`

**File:** `functions/api/paystack-verify.js` (Cloudflare Pages Function)

**Purpose:** After the client-side Paystack popup reports success, the browser cannot
be trusted to confirm payment. This endpoint re-verifies the transaction against
Paystack's API server-side.

**Secrets:** reads `PAYSTACK_SECRET_KEY` from the Function `env`.
> ⚠️ This must be set in the Cloudflare Pages dashboard (Settings → Environment
> Variables, for **both** Production and Preview). Until it is, live verification
> fails. It cannot be set from the local dev environment.

**Request:** JSON with the Paystack transaction `reference` returned by the popup.

**Behavior:** calls Paystack's verify API with the secret key; returns success only if
Paystack confirms the transaction (correct status/amount). Never expose the secret key
or Paystack's raw response to the client beyond what's needed.

**Contract note:** keep the request/response shape in sync with the caller in
`src/components/forms/PartnershipEngine.tsx`. If either changes, update the other and
this doc.

## Client-side third-party integrations (no server)

| Integration | Where | Notes |
|---|---|---|
| **Paystack popup** | `src/components/forms/PartnershipEngine.tsx` | Card entry inside Paystack's iframe (PCI-scope-clean). Public key + subaccount code are in client code (safe to expose). USD/NGN toggle. |
| **Groq (Debbie AI)** | Start Here chat (`src/components/start-here/*`, `useAIChat.ts`) | Called directly from the browser with a public key. No server proxy. |
| **Contact** | Contact page | `mailto:` — no submission backend. |
| **Apps Script** | Called server-side by `/api/submit` | Sends confirmation emails (Gmail, 100/day) and mirrors rows into the Google Sheet. Source: `docs/apps-script/registration.gs`. |
| **Events** | Media / Ministries CTAs | Link out to an external events site. |

## Hard rule

Do **not** add a Next.js API route or middleware — the static export can't execute
them. Any new server behavior must be a Cloudflare Pages Function under `functions/api/*`.
