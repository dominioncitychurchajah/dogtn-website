import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarDays,
  FileText,
  HandHeart,
  Play,
  Star,
  CheckCircle2,
  Circle,
} from "lucide-react";
import type { Stage } from "@/data/types";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { myJourneyCopy } from "@/i18n/pages/my-journey";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { title: myJourneyCopy[isLocale(locale) ? locale : defaultLocale].metaTitle };
}

const LADDER: Stage[] = ["Visitor", "Learner", "Disciple", "Leader", "Mentor", "Nation Builder"];
const CURRENT: Stage = "Learner";
const PROGRESS = 62;

export default async function MyJourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = myJourneyCopy[loc];
  const currentIndex = LADDER.indexOf(CURRENT);

  const CHECKLIST = [
    { ...c.checklist[0], done: true },
    { ...c.checklist[1], done: false },
    { ...c.checklist[2], done: false },
  ];

  const continueLearning = [
    {
      badge: c.cards[0].badge,
      badgeTone: "gold" as const,
      title: "Become a Leader",
      desc: c.cards[0].desc,
      pct: 42,
      cta: c.cards[0].cta,
      href: `/${loc}/journeys/become-a-leader`,
      image: "/images/pastor/leadership-hand-raised.jpg",
    },
    {
      badge: c.cards[1].badge,
      badgeTone: "ink" as const,
      title: "DLI Basic",
      desc: c.cards[1].desc,
      pct: 18,
      cta: c.cards[1].cta,
      href: `/${loc}/leadership`,
      image: "/images/pastor/dli-conference-whiteboard.jpg",
    },
  ];

  const utilities = [
    { label: c.utilities[0].label, icon: Award, desc: c.utilities[0].desc, href: `/${loc}/my-journey` },
    { label: c.utilities[1].label, icon: CalendarDays, desc: c.utilities[1].desc, href: "https://dcglobal-gules.vercel.app/en/events" },
    { label: c.utilities[2].label, icon: FileText, desc: c.utilities[2].desc, href: `/${loc}/mentorship/ministry-leaders/status` },
    { label: c.utilities[3].label, icon: HandHeart, desc: c.utilities[3].desc, href: `/${loc}/partnership` },
  ];

  return (
    <>
      {/* Stage header + ladder */}
      <Section surface="paper">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
                {c.eyebrow}
              </span>
              <h1 className="text-heading-1 text-ink-900">{c.welcome}</h1>
              <p className="mt-2 text-body-l text-ink-500">
                {c.currentStage} <span className="font-bold text-ink-900">{c.stages[CURRENT]}</span>
              </p>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-caption font-semibold uppercase tracking-wider text-ink-500">
                {c.journeyProgress}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-display-l text-ink-900">{PROGRESS}%</span>
                <span className="text-caption font-semibold uppercase tracking-wider text-gold-hover">
                  {c.complete}
                </span>
              </div>
            </div>
          </div>

          {/* Ladder */}
          <div className="relative px-2 pb-4 pt-8">
            <div className="absolute inset-x-2 top-[calc(2rem+8px)] h-0.5 -translate-y-1/2 bg-ink-100" aria-hidden />
            <div
              className="absolute left-2 top-[calc(2rem+8px)] h-0.5 -translate-y-1/2 bg-gold-600 transition-all duration-1000"
              style={{ width: `calc((100% - 1rem) * ${currentIndex} / ${LADDER.length - 1})` }}
              aria-hidden
            />
            <ol className="relative flex justify-between">
              {LADDER.map((stage, i) => {
                const done = i < currentIndex;
                const active = i === currentIndex;
                return (
                  <li key={stage} className="flex flex-col items-center gap-4">
                    {active ? (
                      <span className="z-10 grid h-6 w-6 place-items-center rounded-full bg-gold-600 text-ink-900 shadow-[0_0_20px_rgba(197,160,89,0.4)] ring-8 ring-gold-600/20">
                        <Star className="h-3.5 w-3.5 fill-ink-900" aria-hidden />
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "z-10 h-4 w-4 rounded-full",
                          done ? "bg-gold-600 ring-4 ring-gold-600/20" : "bg-ink-100",
                        )}
                        aria-hidden
                      />
                    )}
                    <span
                      className={cn(
                        "text-center text-caption font-semibold",
                        active ? "text-ink-900" : done ? "text-ink-700" : "text-ink-300",
                      )}
                    >
                      {c.stages[stage]}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Checklist */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CHECKLIST.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 transition-colors hover:border-gold-600"
              >
                {item.done ? (
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-600" aria-hidden />
                ) : (
                  <Circle className="mt-0.5 h-6 w-6 shrink-0 text-ink-300" aria-hidden />
                )}
                <div>
                  <p className="text-body-m font-semibold text-ink-900">{item.label}</p>
                  <p className="text-caption text-ink-500">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Continue learning */}
      <Section surface="alt">
        <Container>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-heading-2 text-ink-900">{c.continueLearning}</h2>
            <Link
              href={`/${loc}/media`}
              className="inline-flex items-center gap-2 text-body-s font-semibold text-gold-hover"
            >
              {c.viewAll} <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {continueLearning.map((item) => (
              <div
                key={item.title}
                className="card-lift group overflow-hidden rounded-[var(--radius-l)] border border-ink-100 bg-paper-0"
              >
                <div className="relative h-56 overflow-hidden bg-ink-900">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={cn(
                      "absolute left-4 top-4 rounded-full px-3 py-1 text-caption font-bold uppercase tracking-widest",
                      item.badgeTone === "gold" ? "bg-gold-600 text-ink-900" : "bg-ink-900 text-paper-0",
                    )}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-heading-3 text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-body-s text-ink-500">{item.desc}</p>
                  <div className="mt-6 flex items-end justify-between gap-6">
                    <div className="w-2/3">
                      <div className="mb-1 flex justify-between text-caption text-ink-500">
                        <span>{c.progress}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                        <div className="h-full rounded-full bg-gold-600" style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                    <Link
                      href={item.href}
                      className="shrink-0 rounded-[var(--radius-m)] bg-ink-900 px-6 py-2.5 text-body-s font-semibold text-paper-0 transition-colors hover:bg-ink-700"
                    >
                      {item.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Utility grid + featured assessment */}
      <Section surface="paper">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
              {utilities.map(({ label, icon: Icon, desc, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="group rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 transition-colors hover:border-gold-600"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-[var(--radius-m)] bg-gold-600/10 text-gold-600 transition-colors group-hover:bg-gold-600 group-hover:text-ink-900">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h4 className="text-label-md font-semibold uppercase tracking-wider text-ink-900">{label}</h4>
                  <p className="mt-2 text-caption text-ink-500">{desc}</p>
                </Link>
              ))}
            </div>

            {/* Featured assessment (gravity card) */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-l)] bg-ink-900 p-10 text-paper-0">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-600/20 blur-3xl" aria-hidden />
              <div className="relative">
                <span className="mb-4 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-400">
                  {c.recommendedForYou}
                </span>
                <h3 className="text-heading-2 text-paper-0">{c.assessmentTitle}</h3>
                <p className="mt-4 text-body-m text-ink-300">{c.assessmentBody}</p>
              </div>
              <div className="relative mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    <span className="h-8 w-8 rounded-full border-2 border-ink-900 bg-gold-600/30" />
                    <span className="h-8 w-8 rounded-full border-2 border-ink-900 bg-gold-400/40" />
                    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink-900 bg-gold-600 text-[10px] font-bold text-ink-900">
                      +4K
                    </span>
                  </div>
                  <span className="text-caption text-ink-300">{c.cohortNote}</span>
                </div>
                <Link
                  href={`/${loc}/leadership/assessment`}
                  className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-m)] bg-gold-600 py-4 text-body-s font-bold uppercase tracking-widest text-ink-900 transition-colors hover:bg-gold-hover"
                >
                  {c.beginAssessment} <Play className="h-4 w-4 fill-ink-900" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
