import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Church, Briefcase, TrendingUp, CalendarDays, FileSearch, Users, Rocket } from "lucide-react";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { formatDate } from "@/lib/utils";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { mentorshipCopy } from "@/i18n/pages/mentorship";
import { tracks, getTrack } from "@/data/mentorship";

export function generateStaticParams() {
  return tracks.map((t) => ({ track: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const data = getTrack(track);
  if (!data) return { title: "Mentorship Track" };
  return { title: `${data.name} Mentorship Track`, description: data.audience };
}

// Icons for the program-level audience profiles (copy comes from i18n).
const PROFILE_ICONS = [Church, Briefcase, TrendingUp];

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: string; track: string }>;
}) {
  const { locale, track } = await params;
  const data = getTrack(track);
  if (!data) notFound();

  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = mentorshipCopy[loc];

  const applyHref = `/${locale}/mentorship/${data.slug}/apply`;

  const timeline = [
    { icon: CalendarDays, label: c.timelineApplicationLabel, value: c.timelineApplicationValue },
    { icon: FileSearch, label: c.timelineReviewLabel, value: c.timelineReviewValue },
    { icon: Users, label: c.timelineInterviewLabel, value: c.timelineInterviewValue },
    { icon: Rocket, label: c.timelineCohortStartLabel, value: formatDate(data.cohortDates[0]), highlight: true },
  ];

  return (
    <>
      {/* Hero — deep navy, centered */}
      <section className="bg-ink-900 px-5 py-28 text-paper-0 lg:px-16 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-600">
            {c.eyebrow}
          </span>
          <h1 className="text-display-l leading-tight text-paper-0">{data.name} Mentorship Track</h1>
          <p className="mx-auto mt-8 max-w-2xl text-body-l text-ink-300">{data.hero}</p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={applyHref} size="l" className="w-full uppercase tracking-wider sm:w-auto">
              {c.applyNow}
            </Button>
            <Button
              href="#expectations"
              size="l"
              variant="secondary"
              className="w-full border-ink-300 bg-transparent uppercase tracking-wider text-paper-0 hover:bg-paper-0/5 sm:w-auto"
            >
              {c.viewExpectations}
            </Button>
          </div>
        </div>
      </section>

      {/* Intentionally curated */}
      <Section surface="alt">
        <Container>
          <div className="mb-14 text-center">
            <h2 className="text-heading-1 text-ink-900">{c.curatedTitle}</h2>
            <p className="mt-4 text-body-m text-ink-500">{c.curatedSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {c.profiles.map(({ title, desc }, i) => {
              const Icon = PROFILE_ICONS[i];
              return (
                <div
                  key={title}
                  className="group border border-ink-100 bg-paper-0 p-10 shadow-elev-1 transition-colors duration-500 hover:border-gold-600"
                >
                  <span className="mb-8 flex h-12 w-12 items-center justify-center bg-ink-900 text-gold-600">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="text-heading-3 text-ink-900">{title}</h3>
                  <p className="mt-4 text-body-m text-ink-500">{desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* The Measured Impact */}
      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative h-[420px] w-full lg:h-[600px]">
              <div className="absolute -inset-x-6 inset-y-6 -z-10 border-[12px] border-gold-600/20" aria-hidden />
              <Image src={data.image} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <h2 className="text-heading-1 text-paper-0">{c.measuredImpactTitle}</h2>
              <ul className="mt-12 space-y-10">
                {data.outcomes.map((outcome, i) => (
                  <li key={outcome} className="flex items-start gap-6">
                    <span className="mt-1 font-display text-heading-3 text-gold-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-heading-3 leading-snug text-paper-0">{outcome}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Commitment + Oversight */}
      <Section surface="paper" id="expectations">
        <Container>
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
            {/* Commitment table */}
            <div className="flex-1">
              <h2 className="mb-8 text-heading-1 text-ink-900">{c.commitmentTitle}</h2>
              <div className="overflow-hidden border border-ink-100">
                <table className="w-full border-collapse text-start">
                  <tbody>
                    {data.expectations.map((row, i) => (
                      <tr key={row.item} className={i < data.expectations.length - 1 ? "border-b border-ink-100" : ""}>
                        <th
                          scope="row"
                          className="w-1/3 bg-paper-50 px-6 py-6 text-start text-caption font-semibold uppercase tracking-wider text-ink-700"
                        >
                          {row.item}
                        </th>
                        <td className="px-6 py-6 text-body-m text-ink-900">{row.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Oversight structure */}
            <div className="flex-1 bg-ink-900 p-12 text-paper-0">
              <h2 className="mb-8 text-heading-1 text-paper-0">{c.oversightTitle}</h2>
              <div className="space-y-8">
                {c.oversightRoles.map((role) => (
                  <div key={role.title} className="border-s-2 border-gold-600 ps-6">
                    <h4 className="mb-2 text-caption font-semibold uppercase tracking-wider text-gold-600">
                      {role.title}
                    </h4>
                    <p className="text-body-m text-ink-300">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Key timeline */}
      <Section surface="alt">
        <Container>
          <h2 className="mb-16 text-center text-heading-1 text-ink-900">{c.timelineTitle}</h2>
          <div className="relative flex flex-col justify-between gap-8 md:flex-row">
            <div className="absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-ink-100 md:block" aria-hidden />
            {timeline.map(({ icon: Icon, label, value, highlight }) => (
              <div
                key={label}
                className={
                  highlight
                    ? "relative z-10 border border-ink-900 bg-ink-900 p-8 text-paper-0 md:w-64"
                    : "relative z-10 border border-ink-100 bg-paper-0 p-8 md:w-64"
                }
              >
                <Icon className="mb-4 h-9 w-9 text-gold-600" aria-hidden />
                <h4
                  className={
                    highlight
                      ? "mb-2 text-caption font-semibold uppercase tracking-wider text-gold-600"
                      : "mb-2 text-caption font-semibold uppercase tracking-wider text-ink-500"
                  }
                >
                  {label}
                </h4>
                <p className={highlight ? "text-heading-3 text-paper-0" : "text-heading-3 text-ink-900"}>{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Eligibility checklist */}
      <Section surface="paper">
        <Container>
          <div className="mx-auto max-w-2xl border border-ink-100 p-10 shadow-elev-3 lg:p-12">
            <h2 className="mb-8 text-center text-heading-1 text-ink-900">{c.eligibilityTitle}</h2>
            <div className="space-y-6">
              {data.eligibility.map((item) => (
                <label key={item} className="flex cursor-pointer items-start gap-4 bg-paper-50 p-6">
                  <input
                    type="checkbox"
                    className="mt-1 h-6 w-6 rounded-[4px] border-ink-300 text-gold-600 focus:ring-gold-600"
                  />
                  <span className="text-body-l text-ink-900">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section surface="alt">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-12 text-center text-heading-1 text-ink-900">{c.faqTitle}</h2>
            <Accordion
              items={data.faqs.map((faq, i) => ({ id: `faq-${i}`, question: faq.q, answer: faq.a }))}
            />
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <section className="bg-ink-900 px-5 py-28 text-center text-paper-0 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-xl">
          <h2 className="text-display-l text-paper-0">{c.readyTitle}</h2>
          <p className="mx-auto mt-8 text-body-l text-ink-300">{c.readyBody}</p>
          <div className="mt-12 flex justify-center">
            <Button href={applyHref} size="l" className="uppercase tracking-widest">
              {c.beginApplicationCta}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
