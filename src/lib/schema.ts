import type { Book } from "@/data/types";
import { locales, type Locale } from "@/i18n/config";
import { SITE_NAME, PERSON_PROFILES, absoluteUrl } from "./site";
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
  };
}

/**
 * Every claim below is already stated on /his-story — the timeline, the
 * education cards, the philosophy quote. An answer engine cannot lift facts
 * from a timeline component, so they are restated here in a form it can read.
 * Do not add anything the site itself does not say.
 */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Dr. David Ogbueli",
    honorificPrefix: "Dr.",
    jobTitle: "Founder and Senior Pastor",
    description:
      "Nigerian pastor, author and leadership teacher. He founded Dominion City in Enugu in 1991, a movement that has grown to more than 2,000 churches across over 50 nations, and has trained over 30,000 leaders through the Dominion Leadership Institute. He is the author of ten books on leadership, wealth and discipleship.",
    disambiguatingDescription:
      "Founder of Dominion City and the David Ogbueli Global Transformation Network, based in Nigeria.",
    url: absoluteUrl(localePath("en", "his-story")),
    image: absoluteUrl("/images/pastor/hero-stadium-arms-wide.jpg"),
    nationality: { "@type": "Country", name: "Nigeria" },
    worksFor: { "@id": ORG_ID },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Nigeria, Nsukka" },
      { "@type": "CollegeOrUniversity", name: "Harvard Business School" },
      { "@type": "CollegeOrUniversity", name: "Lagos Business School" },
      {
        "@type": "CollegeOrUniversity",
        name: "National Institute for Policy and Strategic Studies",
      },
    ],
    knowsAbout: [
      "Leadership development",
      "Discipleship",
      "Church planting",
      "Marketplace leadership",
      "Nation building",
      "Mentorship",
    ],
    award: "Honoured by the Mayor of Brampton, Canada, for community impact",
    sameAs: PERSON_PROFILES,
  };
}

/**
 * Marks /his-story as the page *about* him, rather than one that merely
 * mentions him. This is the signal that resolves "who is David Ogbueli".
 */
export function profilePageSchema(locale: Locale) {
  const url = absoluteUrl(localePath(locale, "his-story"));
  return {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
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
    // The whole site is about him, not merely by him.
    about: { "@id": PERSON_ID },
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

/**
 * FAQPage over Q&A that is already visible on the page — which is the only
 * form search and answer engines accept. Nothing here is written for the
 * markup; it mirrors copy the page already renders.
 */
export function faqPageSchema(
  items: { question: string; answer: string }[],
  pageUrl: string,
) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

/** Wrap one or more entities in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
