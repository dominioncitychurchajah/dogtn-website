import { Metadata } from "next";
import MediaClient from "./MediaClient";
import { buildMetadata } from "@/lib/seo";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: "media",
    title: "Media Center | Dr. David Ogbueli",
    description: "Decades of transformative teaching, now available wherever you are.",
  });
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  
  return <MediaClient locale={locale} />;
}
