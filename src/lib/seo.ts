import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { SITE_NAME, absoluteUrl } from "./site";

/**
 * Route path for a locale, with the trailing slash `next.config.ts` enforces.
 * Canonicals must match the URL actually served or they defeat the point.
 */
export function localePath(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/|\/$/g, "");
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/** hreflang map for one page across every locale, plus x-default → English. */
function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = absoluteUrl(localePath(l, path));
  map["x-default"] = absoluteUrl(localePath("en", path));
  return map;
}

export interface PageSeo {
  locale: Locale;
  /** Route path below the locale segment, e.g. "books" or "institutions/dli". */
  path?: string;
  title: string;
  /**
   * Omit where no translated description exists — the page then inherits the
   * layout's, which is at least in the right language.
   */
  description?: string;
  /** Root-relative image path; falls back to the site-wide OG image. */
  image?: string;
  type?: "website" | "article" | "book" | "profile";
}

const DEFAULT_OG_IMAGE = "/images/pastor/hero-stadium-arms-wide.jpg";

/**
 * Canonical + hreflang + Open Graph + Twitter for one page.
 *
 * Open Graph is set per page rather than inherited from the layout: Next
 * replaces the whole `openGraph` object when a child defines one, so a shared
 * layout value would give every page the same og:title.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageSeo): Metadata {
  const url = absoluteUrl(localePath(locale, path));
  const ogImage = absoluteUrl(image);

  return {
    title,
    ...(description && { description }),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: type === "book" || type === "profile" ? "website" : type,
      siteName: SITE_NAME,
      locale,
      url,
      title,
      ...(description && { description }),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description && { description }),
      images: [ogImage],
    },
  };
}
