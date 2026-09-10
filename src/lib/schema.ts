import type { Book } from "@/data/types";
import { locales, type Locale } from "@/i18n/config";
import { SITE_NAME, SOCIAL_PROFILES, absoluteUrl } from "./site";
import { localePath } from "./seo";

/**
 * Stable @ids so the organisation, the person, and every book resolve to the
 * same entities across pages instead of being re-declared as new ones.
 */
export const ORG_ID = absoluteUrl("/#organization");
export const PERSON_ID = absoluteUrl("/#david-ogbueli");
const WEBSITE_ID = absoluteUrl("/#website");

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: "DOGTN",
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/logo/dr-david-ogbueli-brand-white.webp"),
    },
    founder: { "@id": PERSON_ID },
    sameAs: SOCIAL_PROFILES,
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Dr. David Ogbueli",
    honorificPrefix: "Dr.",
    jobTitle: "Founder and Senior Pastor",
    description:
      "Founder of Dominion City and the Global Transformation Network; author, leadership teacher, and mentor to leaders across nations.",
    url: absoluteUrl(localePath("en", "his-story")),
    image: absoluteUrl("/images/pastor/hero-stadium-arms-wide.jpg"),
    worksFor: { "@id": ORG_ID },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl(localePath(locale)),
    inLanguage: locales,
    publisher: { "@id": ORG_ID },
  };
}

export function bookSchema(book: Book, locale: Locale) {
  const url = absoluteUrl(localePath(locale, `books/${book.slug}`));
  return {
    "@type": "Book",
    "@id": `${url}#book`,
    name: book.title,
    alternativeHeadline: book.subtitle,
    description: book.fullDesc ?? book.synopsis ?? book.desc,
    url,
    image: absoluteUrl(book.cover),
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    // `formats` are our own labels; map only the ones schema.org recognises.
    // A Book node carries one format; name the primary edition, not the extras.
    bookFormat: book.formats?.includes("paperback")
      ? "https://schema.org/Paperback"
      : book.formats?.includes("audiobook")
        ? "https://schema.org/AudiobookFormat"
        : "https://schema.org/EBook",
    ...(book.price && {
      offers: {
        "@type": "Offer",
        price: book.price.amount,
        priceCurrency: book.price.currency,
        url: book.amazonUrl ?? url,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

/** Wrap one or more entities in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
