import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Replaces Cloudflare's default robots.txt, which had no Sitemap directive.
 * The disallowed paths are all statically exported and therefore publicly
 * reachable — keeping them out of the index is the point.
 */
// Required by `output: "export"` — this route is emitted as a static file.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/admin/", "/verify/", "/*/leadership/assessment/question/", "/*/leadership/assessment/results/", "/*/leadership/assessment/email-gate/", "/*/mentorship/*/apply/", "/*/mentorship/*/status/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
