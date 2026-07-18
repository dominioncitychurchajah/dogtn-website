import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { Container } from "@/components/layout/Section";
import { StartHereAI } from "./components/StartHereAI";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = startHereCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle };
}

const methodology = [
  {
    number: "01",
    title: "Choose Your Path",
    body: "Select the journey that matches your current season and your vision for the future. This is where we align your goals with the right resources.",
  },
  {
    number: "02",
    title: "Engage and Grow",
    body: "Work through world-class curriculum designed to be applied immediately in your life, ministry, and career.",
  },
  {
    number: "03",
    title: "Receive Mentorship",
    body: "Connect with a mentor, gain accountability, and get clear direction on your next step.",
  },
];

export default async function StartHerePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;

  const p = (path: string) => `/${loc}${path}`;

  return (
    <main className="overflow-hidden bg-[#faf9ff] text-ink-900">
      <StartHereAI locale={loc} />

      <section className="relative overflow-hidden bg-ink-900 px-5 py-20 text-paper-0 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_25%,rgba(197,160,89,0.16),transparent_38%)]" aria-hidden />
        <Container className="relative px-0">
          <div className="mb-16">
            <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.45em] text-gold-400">
              Methodology
            </span>
            <h2 className="text-heading-1 text-paper-0 sm:text-[4rem] sm:leading-tight">How Your Journey Works</h2>
            <div className="mt-6 h-px w-28 bg-gold-600" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
            {methodology.map((step) => (
              <article key={step.number} className="group relative min-h-[18rem]">
                <span className="pointer-events-none absolute -left-5 -top-10 font-serif text-[8rem] font-bold leading-none text-gold-600/10 sm:text-[11rem]">
                  {step.number}
                </span>
                <div className="relative pt-10">
                  <h3 className="text-heading-2 text-paper-0 transition-colors duration-300 group-hover:text-gold-400">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-sm text-body-m italic leading-relaxed text-ink-300">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
