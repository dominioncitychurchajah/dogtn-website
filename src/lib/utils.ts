import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a currency amount for the giving flows. */
export function formatCurrency(amount: number, currency: "NGN" | "USD" = "NGN") {
  const symbol = currency === "NGN" ? "₦" : "$";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Deterministic date parts from an ISO string (no locale/timezone drift). */
export function dateParts(iso: string) {
  const [datePart] = iso.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  return {
    day: String(d).padStart(2, "0"),
    month: MONTHS[(m ?? 1) - 1],
    monthLong: MONTHS_LONG[(m ?? 1) - 1],
    year: String(y),
  };
}

/** Human-readable date, e.g. "15 October 2026". */
export function formatDate(iso: string) {
  const { day, monthLong, year } = dateParts(iso);
  return `${Number(day)} ${monthLong} ${year}`;
}

/** Slugify a title for anchor/route use. */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
