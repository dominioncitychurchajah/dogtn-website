import { Metadata } from 'next';
import MinistryClient from './MinistryClient';

export const metadata: Metadata = {
  title: 'Ministries | Dr. David Ogbueli',
  description: 'Eight interconnected ministries, one mandate — to raise leaders that transform nations.',
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MinistryPage({ params }: PageProps) {
  const { locale } = await params;
  return <MinistryClient locale={locale} />;
}
