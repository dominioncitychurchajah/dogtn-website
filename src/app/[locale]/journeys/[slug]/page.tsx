import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { journeys, getJourney, journeyPosters, JOURNEY_POSTER_FALLBACK } from "@/data/journeys";
import { Container } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JourneyPlayerClient } from "@/components/teachings/JourneyPlayerClient";
import { buildMetadata } from "@/lib/seo";


export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return { title: "Journey", robots: { index: false } };
  return buildMetadata({
    locale: isLocale(locale) ? locale : defaultLocale,
    path: `journeys/${slug}`,
    title: journey.title,
    description: journey.description,
  });
}

export default async function JourneyPlayerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const journey = getJourney(slug);
  if (!journey) notFound();

  return (
    <Container className="py-10 lg:py-14">
      <Breadcrumb
        items={[
          { label: "Start Here", href: `/${loc}/start-here` },
          { label: journey.title },
        ]}
      />
      <div className="mt-8">
        <JourneyPlayerClient journey={journey} poster={journeyPosters[journey.slug] ?? JOURNEY_POSTER_FALLBACK} />
      </div>
    </Container>
  );
}
