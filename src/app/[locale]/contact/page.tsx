import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { buildMetadata, localePath } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, graph } from "@/lib/schema";
import { absoluteUrl } from "@/lib/site";
import { contactCopy } from "@/i18n/pages/contact";
import { ContactClient } from "./ContactClient";

// The contact UI is a client component and so cannot export metadata itself.
// This server wrapper exists to give the route a title, description and
// canonical — without it the page inherited the site-wide description.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "contact",
    title: "Contact | Dr. David Ogbueli",
    description:
      "Reach the office of Dr. David Ogbueli, for speaking invitations, partnership, mentorship enquiries, and media requests.",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const f = contactCopy[loc].faqs;
  // Mirrors the five questions ContactClient renders; localised with the page.
  const faqs = [
    { question: f.q1, answer: f.a1 },
    { question: f.q2, answer: f.a2 },
    { question: f.q3, answer: f.a3 },
    { question: f.q4, answer: f.a4 },
    { question: f.q5, answer: f.a5 },
  ];

  return (
    <>
      <JsonLd
        data={graph(faqPageSchema(faqs, absoluteUrl(localePath(loc, "contact"))))}
      />
      <ContactClient />
    </>
  );
}
