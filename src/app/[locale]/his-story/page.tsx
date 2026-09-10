import { Metadata } from "next";
import HisStoryClient from "./HisStoryClient";
import { buildMetadata } from "@/lib/seo";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, profilePageSchema } from "@/lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "his-story",
    title: "His Story | Dr. David Ogbueli",
    description: "Three decades of apostolic ministry that shaped a generation and touched a world.",
  });
}

export default async function HisStoryPage({
  params,
}: {
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const loc: Locale = isLocale(resolvedParams.locale)
    ? resolvedParams.locale
    : defaultLocale;
  return (
    <>
      {/* Declares this page as the one about him; the Person node it points
          at is emitted site-wide from the locale layout. */}
      <JsonLd data={graph(profilePageSchema(loc))} />
      <HisStoryClient locale={resolvedParams.locale} />
    </>
  );
}
