import { Metadata } from 'next';
import MinistryClient from './MinistryClient';
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
    path: "ministry",
    title: 'Ministries | Dr. David Ogbueli',
    description: 'Eight interconnected ministries, one mandate — to raise leaders that transform nations.',
  });
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MinistryPage({ params }: PageProps) {
  const { locale } = await params;
  return <MinistryClient locale={locale} />;
}
