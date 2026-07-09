import type { Metadata } from "next";
import Link from "next/link";
import { Lock, BadgeCheck, Globe, GraduationCap, Users, Star, ChevronRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { GivingCard } from "@/components/forms/GivingCard";
import { giveCopy } from "@/i18n/pages/give";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = giveCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle, description: c.metaDescription };
}

const TRUST_ICONS = [Lock, BadgeCheck, Globe];
const IMPACT_ICONS = [GraduationCap, Globe, Users];

export default async function GivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = giveCopy[loc];

  return (
    <>
      {/* Hero — light, centered */}
      <Section surface="paper" className="pb-0 text-center">
        <Container>
          <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            {c.eyebrow}
          </span>
          <h1 className="mx-auto max-w-3xl text-display-l text-ink-900">{c.title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l text-ink-500">{c.subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-ink-500 opacity-70">
            {c.trust.map((label, i) => {
              const Icon = TRUST_ICONS[i];
              return (
                <span key={label} className="inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-wider">
                  <Icon className="h-4 w-4" aria-hidden /> {label}
                </span>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Giving card */}
      <Section surface="paper">
        <Container>
          <GivingCard locale={loc} />
        </Container>
      </Section>

      {/* Impact strip */}
      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
            {c.impact.map(({ title, body }, i) => {
              const Icon = IMPACT_ICONS[i];
              return (
                <div key={title} className="flex flex-col items-center">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-full border border-gold-400/30 text-gold-400">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-heading-3 text-paper-0">{title}</h3>
                  <p className="mt-2 text-body-s text-ink-300">{body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Partnership programs */}
      <Section surface="paper">
        <Container>
          <div className="mb-14 text-center">
            <h2 className="text-heading-1 text-ink-900">{c.partnershipTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-m text-ink-500">{c.partnershipSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {c.cards.map((card, i) => {
              const featured = i === 1;
              return (
                <div
                  key={card.title}
                  className={
                    featured
                      ? "card-lift relative flex flex-col items-start overflow-hidden bg-ink-900 p-8 text-paper-0"
                      : "card-lift flex flex-col items-start border border-ink-100 bg-paper-0 p-8"
                  }
                >
                  {featured && <Star className="absolute right-4 top-4 h-16 w-16 rotate-12 text-gold-400/15" aria-hidden />}
                  <h3 className={featured ? "relative text-heading-3 text-paper-0" : "text-heading-3 text-ink-900"}>
                    {card.title}
                  </h3>
                  <p className={featured ? "relative mb-8 mt-4 flex-1 text-body-s text-ink-300" : "mb-8 mt-4 flex-1 text-body-s text-ink-500"}>
                    {card.body}
                  </p>
                  <Link
                    href={`/${loc}/give`}
                    className={
                      featured
                        ? "group relative inline-flex items-center gap-1 border-b border-gold-400 pb-1 text-body-s font-semibold text-gold-400"
                        : "group inline-flex items-center gap-1 border-b border-gold-600 pb-1 text-body-s font-semibold text-gold-hover"
                    }
                  >
                    {card.link}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Giving FAQs */}
      <Section surface="alt">
        <Container>
          <h2 className="mb-12 text-center text-heading-1 text-ink-900">{c.faqsTitle}</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion
              items={c.faqs.map((f, i) => ({ id: `give-faq-${i}`, question: f.question, answer: f.answer }))}
              type="single"
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
