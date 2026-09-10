/**
 * Canonical origin for this site. Everything that needs an absolute URL
 * (canonicals, hreflang, Open Graph, sitemap, JSON-LD) derives from here.
 *
 * Cloudflare Pages serves the production build from `dogtn-website.pages.dev`.
 * When a custom domain lands, set NEXT_PUBLIC_SITE_URL in the Pages build
 * settings — nothing else needs to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dogtn-website.pages.dev"
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
