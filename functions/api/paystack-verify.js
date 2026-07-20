/**
 * Cloudflare Pages Function — verifies a Paystack transaction server-side so the
 * secret key never has to live in the static-exported frontend bundle.
 *
 * Set PAYSTACK_SECRET_KEY as an encrypted environment variable in the Cloudflare
 * Pages dashboard (Settings -> Environment variables) for both Production and
 * Preview. For local `wrangler pages dev` testing, put it in a gitignored
 * `.dev.vars` file at the project root instead.
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  let reference;
  try {
    const body = await request.json();
    reference = body && body.reference;
  } catch {
    return jsonResponse({ verified: false, error: "Invalid request body" }, 400);
  }

  if (!reference || typeof reference !== "string") {
    return jsonResponse({ verified: false, error: "Missing transaction reference" }, 400);
  }

  if (!env.PAYSTACK_SECRET_KEY) {
    return jsonResponse({ verified: false, error: "Payment verification is not configured on the server" }, 500);
  }

  let paystackRes;
  try {
    paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
    });
  } catch {
    return jsonResponse({ verified: false, error: "Could not reach Paystack" }, 502);
  }

  const paystackData = await paystackRes.json().catch(() => null);

  if (!paystackRes.ok || !paystackData || !paystackData.status || paystackData.data?.status !== "success") {
    return jsonResponse({ verified: false, error: "Transaction could not be verified" }, 402);
  }

  return jsonResponse({
    verified: true,
    amount: paystackData.data.amount,
    currency: paystackData.data.currency,
    email: paystackData.data.customer?.email ?? null,
  });
}

export async function onRequestGet() {
  return jsonResponse({ error: "Method not allowed" }, 405);
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
