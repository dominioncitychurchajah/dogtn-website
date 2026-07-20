import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { HomepageClient } from "./HomepageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc].heroCurrent;
  return { title: `Dr. David Ogbueli | ${c.eyebrow}`, description: c.body };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  return <HomepageClient locale={resolvedLocale} />;
}
