import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ShieldCheck,
  Eye,
  Brain,
  TrendingUp,
  Handshake,
  Building2,
  Timer,
  GraduationCap,
  Medal,
  Award,
  Network,
  Clock,
  Laptop,
  Users,
  CalendarDays,
  Lock,
} from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { CertVerifier } from "@/components/leadership/CertVerifier";
import { leadershipCopy } from "@/i18n/pages/leadership";
import { courses } from "@/data/courses";
import { teachings } from "@/data/teachings";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = leadershipCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle, description: c.metaDescription };
}

const PILLAR_ICONS = [ShieldCheck, Eye, Brain, TrendingUp, Handshake];
const PATHWAY_ICONS = [
  { icon: GraduationCap, active: true },
  { icon: Medal, active: false },
  { icon: Award, active: false },
  { icon: Network, active: false },
];

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = leadershipCopy[loc];

  const dliHref = `/${loc}/institutions/dominion-leadership-institute`;

  const modules = [
    {
      course: courses[0],
      badge: "Foundation",
      badgeTone: "ink" as const,
      image: "/images/pastor/whiteboard-5-laws-bw.jpg",
      format: c.formatHybrid,
      formatIcon: Laptop,
      blurb: c.blurbs[0],
    },
    {
      course: courses[1],
      badge: "Strategic",
      badgeTone: "gold" as const,
      image: "/images/pastor/dli-conference-whiteboard.jpg",
      format: c.formatIntensive,
      formatIcon: Users,
      blurb: c.blurbs[1],
    },
  ];

  const journal = teachings.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <header className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          <Image
            src="/images/pastor/sermon-blue-backdrop.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/70 to-ink-900/30" />
        </div>
        <Container className="relative py-24">
          <div className="max-w-2xl">
            <span className="mb-6 flex items-center gap-3 text-caption font-semibold uppercase tracking-[0.3em] text-gold-600">
              <span className="h-px w-12 bg-gold-600" aria-hidden />
              {c.heroEyebrow}
            </span>
            <h1 className="gravity-text text-display-l leading-tight text-paper-0">{c.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-body-l leading-relaxed text-ink-300">
              {c.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={`/${loc}/leadership/assessment`} size="l" className="uppercase tracking-widest">
                {c.startAssessment}
                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
              </Button>
              <Button
                href={dliHref}
                size="l"
                variant="secondary"
                className="border-paper-0/30 bg-transparent uppercase tracking-widest text-paper-0 hover:bg-paper-0/10"
              >
                {c.exploreCourses}
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Assessment bento — overlaps hero */}
      <Container className="relative z-30 -mt-24 pb-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main card */}
          <div className="relative overflow-hidden border border-ink-100 bg-paper-0 p-10 shadow-elev-3 lg:col-span-8 lg:p-12">
            <Building2
              className="pointer-events-none absolute -bottom-8 -right-8 h-64 w-64 text-ink-900/[0.03]"
              aria-hidden
            />
            <div className="relative">
              <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-heading-2 text-ink-900">{c.bentoTitle}</h2>
                  <p className="mt-2 text-body-m text-ink-500">
                    {c.bentoSubtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-paper-50 px-4 py-2 text-body-s font-semibold text-ink-700">
                  <Timer className="h-4 w-4 text-gold-600" aria-hidden /> {c.quickAssessment}
                </span>
              </div>
              <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
                {PILLAR_ICONS.map((Icon, i) => (
                  <div
                    key={c.pillars[i]}
                    className="flex flex-col items-center rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 p-4 text-center transition-transform hover:-translate-y-1"
                  >
                    <Icon className="mb-3 h-7 w-7 text-gold-600" aria-hidden />
                    <span className="text-caption font-semibold uppercase tracking-wide text-ink-700">{c.pillars[i]}</span>
                  </div>
                ))}
              </div>
              <Button href={`/${loc}/leadership/assessment/question`} size="l" className="uppercase tracking-widest">
                {c.launchEngine}
              </Button>
            </div>
          </div>

          {/* Side stats card */}
          <div className="flex flex-col justify-between bg-ink-900 p-10 text-paper-0 lg:col-span-4 lg:p-12">
            <div>
              <h3 className="mb-8 font-display text-heading-3 text-gold-600">{c.globalFootprint}</h3>
              <div className="space-y-8">
                <div>
                  <div className="font-display text-display-l leading-none text-paper-0">45k+</div>
                  <div className="mt-1 text-caption font-semibold uppercase tracking-widest text-ink-300">
                    {c.certifiedLeaders}
                  </div>
                </div>
                <div>
                  <div className="font-display text-display-l leading-none text-paper-0">120</div>
                  <div className="mt-1 text-caption font-semibold uppercase tracking-widest text-ink-300">
                    {c.countries}
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-10 border-t border-paper-0/10 pt-8 text-body-m italic text-ink-300">
              &ldquo;{c.quote}&rdquo;
            </p>
          </div>
        </div>
      </Container>

      {/* Leadership Pathway stepper */}
      <Section surface="alt">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="text-heading-1 text-ink-900">{c.pathwayTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-body-m text-ink-500">
              {c.pathwaySubtitle}
            </p>
          </div>
          <div className="relative flex flex-col justify-between gap-12 md:flex-row md:gap-4">
            <div className="absolute inset-x-0 top-7 hidden h-px bg-ink-100 md:block" aria-hidden />
            {c.pathway.map((step, i) => {
              const { icon: Icon, active } = PATHWAY_ICONS[i];
              return (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center md:w-1/4">
                <span
                  className={
                    active
                      ? "mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold-600 text-ink-900 shadow-elev-2"
                      : "mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-ink-100 bg-paper-0 text-ink-500"
                  }
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h4 className="text-heading-3 text-ink-900">{step.title}</h4>
                <p className="mt-2 max-w-[16rem] px-4 text-caption text-ink-500">{step.caption}</p>
              </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Core Modules */}
      <Section surface="paper">
        <Container>
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <span className="mb-2 block text-caption font-semibold uppercase tracking-widest text-gold-hover">
                {c.activeEnrollment}
              </span>
              <h2 className="text-heading-1 text-ink-900">{c.coreModules}</h2>
            </div>
            <Link
              href={dliHref}
              className="whitespace-nowrap border-b border-ink-900 pb-1 text-caption font-semibold uppercase tracking-widest text-ink-900 transition-colors hover:border-gold-600 hover:text-gold-hover"
            >
              {c.viewAllCourses}
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {modules.map(({ course, badge, badgeTone, image, format, formatIcon: FormatIcon, blurb }) => (
              <div key={course.id} className="group overflow-hidden border border-ink-100 bg-paper-0 transition-colors hover:border-gold-600/40">
                <div className="relative h-64 overflow-hidden bg-ink-900">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={
                      badgeTone === "gold"
                        ? "absolute left-4 top-4 bg-gold-600 px-4 py-1 text-caption font-semibold uppercase tracking-wider text-ink-900"
                        : "absolute left-4 top-4 bg-ink-900 px-4 py-1 text-caption font-semibold uppercase tracking-wider text-paper-0"
                    }
                  >
                    {badge}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-heading-3 text-ink-900">{course.title}</h3>
                  <p className="mt-4 line-clamp-2 text-body-m text-ink-500">{blurb}</p>
                  <div className="mt-8 grid grid-cols-2 gap-y-6">
                    <Detail icon={Clock} label={c.duration} value={`${course.durationWeeks} ${c.weeks}`} />
                    <Detail icon={FormatIcon} label={c.format} value={format} />
                    <Detail icon={CalendarDays} label={c.nextCohort} value={formatDate(course.cohortDate)} />
                  </div>
                  <Link
                    href={dliHref}
                    className="mt-8 block border border-ink-900 py-4 text-center text-caption font-semibold uppercase tracking-widest text-ink-900 transition-colors hover:bg-ink-900 hover:text-paper-0"
                  >
                    {c.viewCourse}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* The Leadership Journal */}
      <Section surface="alt">
        <Container>
          <h2 className="mb-12 text-heading-1 text-ink-900">{c.journalTitle}</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journal.map((t) => (
              <Link key={t.slug} href={`/${loc}/teachings/${t.slug}`} className="group">
                <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-ink-900">
                  <Image
                    src={t.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mb-3 block text-caption font-semibold uppercase tracking-widest text-gold-hover">
                  {t.tags[0]}
                </span>
                <h4 className="text-heading-3 leading-snug text-ink-900 group-hover:underline">{t.title}</h4>
                <p className="mt-3 line-clamp-2 text-body-s text-ink-500">{t.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Validate Credentials */}
      <Section surface="dark">
        <Container>
          <div className="border border-paper-0/10 bg-paper-0/5 p-10 lg:p-16">
            <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
              <div className="max-w-xl text-center lg:text-start">
                <h2 className="text-heading-2 text-paper-0">{c.validateTitle}</h2>
                <p className="mt-4 text-body-m text-ink-300">
                  {c.validateBody}
                </p>
              </div>
              <div className="w-full max-w-md">
                <CertVerifier />
                <p className="mt-4 flex items-center justify-center gap-2 text-caption text-ink-300 lg:justify-start">
                  <Lock className="h-4 w-4" aria-hidden />
                  {c.blockchainNote}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 shrink-0 text-gold-600" />
      <div>
        <div className="text-caption font-bold text-ink-900">{label}</div>
        <div className="text-caption text-ink-500">{value}</div>
      </div>
    </div>
  );
}
