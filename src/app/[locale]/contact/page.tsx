import type { Metadata } from "next";
import { isLocale, defaultLocale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
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
      "Reach the office of Dr. David Ogbueli — for speaking invitations, partnership, mentorship enquiries, and media requests.",
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
