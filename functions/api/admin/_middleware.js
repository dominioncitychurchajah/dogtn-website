/** Every /api/admin/* request must carry a valid Cloudflare Access login. */
import { verifyAccess } from "../../../server/access.js";
import { json } from "../../../server/forms.js";

export async function onRequest(context) {
  const email = await verifyAccess(context.request, context.env);
  if (!email) {
    const configured = context.env.ACCESS_TEAM_DOMAIN && context.env.ACCESS_AUD;
    return json(
      { error: configured ? "Not signed in" : "Admin login is not set up yet" },
      configured ? 401 : 503,
      { "Cache-Control": "no-store" },
    );
  }
  context.data.adminEmail = email;
  const next = await context.next();
  // Copy: the response from next() can have immutable headers.
  const res = new Response(next.body, next);
  res.headers.set("Cache-Control", "no-store");
  return res;
}
