/**
 * Canonical origin for this site. Everything that needs an absolute URL
 * (canonicals, hreflang, Open Graph, sitemap, JSON-LD) derives from here.
 *
 * The live domain is davidogbueli.org (Cloudflare Pages project
 * `dr-david-ogbueli`; dogtn-website.pages.dev is only its internal address).
 * NEXT_PUBLIC_SITE_URL overrides it if the domain ever changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://davidogbueli.org"
).replace(/\/$/, "");

export const SITE_NAME = "David Ogbueli · Global Transformation Network";

/**
 * schema.org `sameAs` for Dr. David. The Organization deliberately declares
 * none: Dominion City is a separate entity with its own site, so listing its
 * accounts here would conflate the two.
 */
export const PERSON_PROFILES = [
  "https://www.facebook.com/pastordavidogbueli/",
  "https://www.instagram.com/pastordavidogbueli/",
  "https://www.youtube.com/channel/UCEwpTUF-FDHQwzcDx3eZ3hQ",
  // Canonical form; ng.linkedin.com is a country redirect to the same profile.
  "https://www.linkedin.com/in/drdavidogbueli",
];

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
