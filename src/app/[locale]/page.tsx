import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Container } from "@/components/layout/Section";
import { HomepageClient } from "./HomepageClient";

export const metadata: Metadata = {
  title: "Dr. David Ogbueli | Apostolic Leader & Social Reformer",
  description: "For over three decades, one man's voice has called a generation to transform society through the power of kingdom principles.",
};

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const resolvedLocale = isLocale(params.locale) ? (params.locale as Locale) : defaultLocale;

  return <HomepageClient locale={resolvedLocale} />;
}
