import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { institutions, getInstitution } from "@/data/institutions";
import { Container, Section, SectionHeading } from "@/components/layout/Section";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DynIcon } from "@/components/ui/DynIcon";
import { GlobalLeadershipForum } from "@/components/institutions/GlobalLeadershipForum";

export function generateStaticParams() {
  return institutions.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const institution = getInstitution(slug);
  return { title: institution ? institution.name : "Institution" };
}

export default async function InstitutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = locale as Locale;
  const institution = getInstitution(slug);
  if (!institution) notFound();

  // Institutions that live on an external site (e.g. Dominion City) redirect out.
  if (institution.externalUrl) redirect(institution.externalUrl);

  // Global Leadership Forum has a bespoke summit/event landing.
  if (slug === "global-leadership-forum") {
    return <GlobalLeadershipForum locale={loc} />;
  }

  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[68vh] items-center overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src={institution.heroImage}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-ink-900/40" />
        <Container className="relative z-10 py-20">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Institutions", href: `/${loc}/institutions` },
                { label: institution.name },
              ]}
            />
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-600 bg-ink-900/60">
            <DynIcon name={institution.icon} className="h-8 w-8 text-gold-400" aria-hidden />
          </div>
          <span className="mt-6 block text-caption font-semibold uppercase tracking-[0.3em] text-gold-400">
            Institution
          </span>
          <h1 className="mt-3 max-w-4xl text-display-xl gravity-text text-paper-0">
            {institution.name}
          </h1>
          <p className="measure mt-5 text-body-l text-ink-300">{institution.tagline}</p>
          <div className="mt-8">
            <Button href={`/${loc}${institution.ctaHref}`} size="l">
              {institution.ctaLabel}
            </Button>
          </div>
        </Container>
      </header>

      {/* Stats row */}
      <Section surface="alt">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {institution.stats.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Mandate block */}
      <Section surface="paper">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                Our Mandate
              </span>
              <h2 className="mt-2 text-heading-1 text-ink-900">A charge to transform society.</h2>
              <div className="mt-4 h-1 w-16 bg-gold-600" />
            </div>
            <div className="lg:col-span-7">
              <p className="measure text-body-l leading-relaxed text-ink-700">
                {institution.mandate}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Programs grid */}
      <Section surface="dark">
        <Container>
          <SectionHeading
            eyebrow="Programs & Pathways"
            title="Where the work takes shape"
            intro="Structured pathways designed to meet people at every stage of their growth."
            dark
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {institution.programs.map((p, i) => (
              <div
                key={p.title}
                className="card-lift flex h-full flex-col rounded-[var(--radius-l)] border border-paper-0/10 bg-paper-0/5 p-8"
              >
                <span className="text-caption font-semibold uppercase tracking-widest text-gold-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-heading-3 text-paper-0">{p.title}</h3>
                <p className="mt-3 flex-1 text-body-m text-ink-300">{p.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing routed CTA band */}
      <Section surface="paper">
        <Container>
          <div className="flex flex-col items-center justify-between gap-8 rounded-[var(--radius-xl)] bg-ink-900 px-6 py-12 text-paper-0 sm:px-12 md:flex-row md:text-start">
            <div className="text-center md:text-start">
              <h2 className="text-heading-1 text-paper-0">Ready to take the next step?</h2>
              <p className="mt-3 text-body-l text-ink-300">
                {institution.tagline} Begin with {institution.shortName}.
              </p>
            </div>
            <Button href={`/${loc}${institution.ctaHref}`} size="l" className="shrink-0">
              {institution.ctaLabel}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
