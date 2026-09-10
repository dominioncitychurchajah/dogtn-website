import { Metadata } from "next";
import BooksClient from "./BooksClient";
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
    path: "books",
    title: "Books | Dr. David Ogbueli",
    description: "The Library of a Reformer - Books by Dr. David Ogbueli",
  });
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BooksPage({ params }: PageProps) {
  const { locale } = await params;
  return <BooksClient locale={locale} />;
}
