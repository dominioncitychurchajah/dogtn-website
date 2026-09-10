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

/** Social profiles we actually control, for schema.org `sameAs`. */
export const SOCIAL_PROFILES = [
  "https://www.facebook.com/DominionCity",
  "https://www.instagram.com/dominioncitylagos/",
];

/** Build an absolute URL from a root-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
