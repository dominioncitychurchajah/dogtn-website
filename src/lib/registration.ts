import { events } from "@/data/events";
import type { EventItem } from "@/data/types";

/**
 * Google Apps Script Web App URL that receives registrations.
 *
 * NEXT_PUBLIC_ is correct here and is NOT the mistake the Groq key makes:
 * an Apps Script Web App URL is a public endpoint by design, like a form
 * action. The notification address and the Sheet id live inside the script,
 * server-side, so changing who gets notified needs no site rebuild.
 */
const DEFAULT_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzxCM75M2n5raIzNRolj5SdaX_-ht37GCEnAQSTZDVyjTeXlaQgIqWeYXiSOEa0fWM/exec";

export const REGISTRATION_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT ?? DEFAULT_ENDPOINT;

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
