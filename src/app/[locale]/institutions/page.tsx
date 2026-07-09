import Image from "next/image";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { institutions } from "@/data/institutions";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EcosystemMap } from "@/components/map/EcosystemMap";

export const metadata: Metadata = { title: "Institutions" };

const impactStats = [
  { value: "7", label: "Institutions" },
  { value: "60+", label: "Chapters Worldwide" },
  { value: "45+", label: "Nations Reached" },
  { value: "250k+", label: "Lives Touched" },
];

export default async function InstitutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      {/* Hero */}
      <Section surface="paper" className="overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge tone="gold">The Institution Engine</Badge>
              <h1 className="mt-4 text-display-xl gravity-text text-ink-900">
                One mandate. Seven institutions.
              </h1>
              <p className="measure mt-6 text-body-l text-ink-500">
                A global infrastructure built to raise leaders, form disciples, strengthen
                communities and serve nations — each institution a distinct gateway into the work
                of transformation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`/${loc}/start`} size="l">
                  Find Your Place
                </Button>
                <Button href="#ecosystem" variant="secondary" size="l">
                  Explore the Map
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-elev-3">
              <Image
                src="/images/pastor/ecosystem-side-profile.jpg"
                alt="Pastor David Ogbueli in profile"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Impact counters */}
      <Section surface="alt">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {impactStats.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
          <p className="mt-8 text-center text-caption italic text-ink-500">
            Aggregate figures across the network; to be verified.
          </p>
        </Container>
      </Section>

      {/* Ecosystem map + directory */}
      <Section surface="dark" id="ecosystem">
        <Container>
          <SectionHeading
            eyebrow="The Ecosystem"
            title="How the network fits together"
            intro="One central mandate radiating into seven institutional engines. Switch between the map and the directory to explore every entity."
            dark
          />
          <EcosystemMap institutions={institutions} locale={loc} />
        </Container>
      </Section>

      {/* Closing CTA band */}
      <Section surface="paper">
        <Container>
          <div className="rounded-[var(--radius-xl)] bg-ink-900 px-6 py-14 text-center text-paper-0 sm:px-12">
            <h2 className="text-heading-1 text-paper-0">Find your place in the ecosystem.</h2>
            <p className="measure mx-auto mt-4 text-body-l text-ink-300">
              Every institution is a doorway to your purpose. Begin the journey of transformation
              today.
            </p>
            <div className="mt-8">
              <Button href={`/${loc}/start`} size="l">
                Start Here
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
