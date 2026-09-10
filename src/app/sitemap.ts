import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { BOOKS } from "@/data/books";
import { tracks } from "@/data/mentorship";
import { absoluteUrl } from "@/lib/site";
import { localePath } from "@/lib/seo";

/**
 * Public routes only. Admin, the assessment funnel steps, the mentorship
 * application forms and /verify are deliberately absent — they are either
 * gated, mid-flow, or have nothing to rank for. robots.ts disallows them.
 */
const STATIC_PATHS = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "start-here", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "his-story", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "books", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "media", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "leadership", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "leadership/assessment", priority: 0.7, changeFrequency: "yearly" as const },
  { path: "mentorship", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "ministry", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "institutions/dli", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "institutions/global-missions-network", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "partnership", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "register", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "contact", priority: 0.6, changeFrequency: "yearly" as const },
];

// Required by `output: "export"` — this route is emitted as a static file.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = [
    ...BOOKS.map((b) => ({ path: `books/${b.slug}`, priority: 0.8, changeFrequency: "yearly" as const })),
    ...tracks.map((t) => ({ path: `mentorship/${t.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  const lastModified = new Date();

  return [...STATIC_PATHS, ...dynamicPaths].flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, absoluteUrl(localePath(l, path))]),
        ),
      },
    })),
  );
}
