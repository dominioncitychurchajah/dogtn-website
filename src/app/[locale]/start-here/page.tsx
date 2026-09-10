import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, MessagesSquare } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { Section, Container } from "@/components/layout/Section";
import { journeys, journeyPosters, JOURNEY_POSTER_FALLBACK } from "@/data/journeys";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : defaultLocale;
  const c = startHereCopy[loc];
  return buildMetadata({ locale: loc, path: "start-here", title: c.metaTitle });
}

/** Total watch/read time, so each card promises something concrete. */
function journeyMinutes(modules: { durationMin: number }[]) {
  return modules.reduce((sum, m) => sum + m.durationMin, 0);
}

export default async function StartHerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = startHereCopy[loc];

  return (
    <>
      {/* Hero: solid ground, no ghost photo behind the type. */}
      <section className="bg-[#0A192F] pt-32 pb-20 text-center">
        <Container>
          <span className="mb-6 inline-flex items-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-5 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
            {c.heroEyebrow}
          </span>
          <h1 className="mx-auto max-w-3xl font-serif text-[32px] leading-tight text-white sm:text-[44px] md:text-[56px]">
            {c.heroTitle}
          </h1>
        </Container>
      </section>

      {/* The five journeys, each with its own artwork. */}
      <Section className="bg-[#F5F1E8]">
        <Container>
          <div className="mb-12 text-center">
            <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
              {c.journeysEyebrow}
            </span>
            <h2 className="font-serif text-[28px] leading-tight text-[#0A192F] sm:text-[36px]">
              {c.journeysTitle}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {journeys.map((j, i) => {
              const minutes = journeyMinutes(j.modules);
              // First card leads: it is the entry point most visitors want.
              const featured = i === 0;
              return (
                <Link
                  key={j.slug}
                  href={`/${loc}/journeys/${j.slug}`}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227] ${
                    featured ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className={`relative overflow-hidden ${featured ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
                    <Image
                      src={journeyPosters[j.slug] ?? JOURNEY_POSTER_FALLBACK}
                      alt=""
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/85 via-[#0A192F]/25 to-transparent" />
                    <h3 className="absolute inset-x-6 bottom-5 font-serif text-[22px] leading-tight text-white sm:text-[26px]">
                      {j.title}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="font-serif text-[17px] leading-snug text-[#0A192F]">
                      {j.promise}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#6B7280]">
                      {j.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#F1F1F1] pt-4 text-[13px] font-semibold text-[#6B7280]">
                      <span>
                        {j.modules.length} modules · {minutes} min
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[#C9A227]">
                        Begin
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* For anyone who cannot pick. */}
      <Section className="bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 block text-[13px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
              {c.orientationEyebrow}
            </span>
            <h2 className="font-serif text-[28px] leading-tight text-[#0A192F] sm:text-[36px]">
              {c.orientationTitle}
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Link
              href={`/${loc}/leadership/assessment`}
              className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/15 text-[#C9A227]">
                <ClipboardCheck className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-serif text-[18px] leading-tight text-[#0A192F]">
                  {c.ctaTakeOrientation}
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9A227]">
                  10 questions
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>

            <Link
              href={`/${loc}/mentorship`}
              className="group flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C9A227]/15 text-[#C9A227]">
                <MessagesSquare className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block font-serif text-[18px] leading-tight text-[#0A192F]">
                  {c.ctaTalkMentor}
                </span>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#C9A227]">
                  Three tracks
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
