/** The /<locale>/admin pages themselves: same gate as the admin API. */
import { adminGate, nextWithSession } from "../../../server/access.js";

export async function onRequest(context) {
  return (await adminGate(context.request, context.env)) ?? nextWithSession(context);
}
