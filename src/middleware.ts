import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/** Paths that live OUTSIDE the [locale] prefix (publicly shareable). */
const LOCALE_EXEMPT = ["/verify"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Leave locale-exempt public routes untouched (e.g. /verify/[id]).
  if (LOCALE_EXEMPT.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Already locale-prefixed → continue.
  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  // "/" or any un-prefixed / invalid-locale path → redirect under default locale.
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes, and any file with an extension (assets).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
