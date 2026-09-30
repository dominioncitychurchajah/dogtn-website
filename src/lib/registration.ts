import { events } from "@/data/events";
import type { EventItem } from "@/data/types";

/**
 * Where the registration and waitlist forms post. It is our own Cloudflare Pages
 * Function (functions/api/submit.js): it saves to the D1 database first, then
 * hands the email and the Google Sheet copy to Apps Script (APPS_SCRIPT_URL in
 * wrangler.toml). Same origin, so it only works on the deployed site or under
 * `wrangler pages dev`, not `next dev`.
 */
export const REGISTRATION_ENDPOINT = "/api/submit";

/** The next event that has not finished yet, or null once none remain. */
export function nextUpcomingEvent(now = new Date()): EventItem | null {
  const upcoming = events
    .filter((e) => new Date(e.endDate ?? e.date).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] ?? null;
}

/** The line the site actually answers. Used by tel: links site-wide. */
export const CONTACT_PHONE = "+2348035508230";
export const CONTACT_PHONE_DISPLAY = "+234 803 550 8230";

export interface Registration {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  seats: number;
  volunteer: "yes" | "no" | "maybe";
  volunteerAreas: string;
  eventSlug: string;
  eventTitle: string;
}
