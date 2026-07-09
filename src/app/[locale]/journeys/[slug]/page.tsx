import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { journeys, getJourney } from "@/data/journeys";
import { Container } from "@/components/layout/Section";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JourneyPlayerClient } from "@/components/teachings/JourneyPlayerClient";

const POSTERS: Record<string, string> = {
  "discover-purpose": "/images/pastor/prayer-hands-raised.jpg",
  "become-a-leader": "/images/pastor/leadership-hand-raised.jpg",
  "grow-spiritually": "/images/pastor/preaching-purple-lit.jpg",
  "build-a-ministry": "/images/pastor/sermon-blue-backdrop.jpg",
  "transform-society": "/images/pastor/hero-stadium-arms-wide.jpg",
};

export function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  return { title: journey?.title ?? "Journey" };
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
        <JourneyPlayerClient journey={journey} poster={POSTERS[journey.slug] ?? "/images/pastor/preaching-purple-lit.jpg"} />
      </div>
    </Container>
  );
}
