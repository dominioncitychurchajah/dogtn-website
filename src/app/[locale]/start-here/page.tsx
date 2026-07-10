import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  Landmark,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Globe2,
  Medal,
} from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { startHereCopy } from "@/i18n/pages/start-here";
import { Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = startHereCopy[isLocale(locale) ? locale : defaultLocale];
  return { title: c.metaTitle };
}

const identities = [
  { title: "Visitor", label: "Getting Started", icon: User, active: true },
  { title: "Learner", label: "Building Foundations", icon: GraduationCap },
  { title: "Disciple", label: "Growing in Faith", icon: Sparkles },
  { title: "Leader", label: "Leading with Purpose", icon: ShieldCheck },
  { title: "Mentor", label: "Guiding Others", icon: Users },
  { title: "Nation Builder", label: "Transforming Nations", icon: Globe2 },
];

const dossiers = [
  {
    title: "Discover Your Purpose",
    body: "A proven path to uncover your calling and divine purpose.",
    icon: Lightbulb,
    href: "/journeys/discover-purpose",
    featured: false,
    modules: ["Blueprint 101", "The Gifted Life"],
    images: ["/images/pastor/whiteboard-5-laws-bw.jpg", "/images/pastor/ecosystem-side-profile.jpg"],
  },
  {
    title: "Deepen Your Faith",
    body: "Strengthen your spiritual foundation through systematic Kingdom teaching.",
    icon: BookOpen,
    href: "/journeys/grow-spiritually",
    featured: true,
    modules: ["Faith Foundations", "Prayer Dynamics"],
    images: ["/images/pastor/prayer-hands-raised.jpg", "/images/pastor/preaching-purple-lit.jpg"],
  },
  {
    title: "Build Your Leadership",
    body: "Learn the principles of governance and how to shape the next generation.",
    icon: Medal,
    href: "/journeys/become-a-leader",
    featured: false,
    modules: ["Stewardship", "Team Dynamics"],
    images: ["/images/pastor/leadership-hand-raised.jpg", "/images/pastor/hero-stadium-arms-wide.jpg"],
  },
  {
    title: "Scale Your Ministry",
    body: "Equip yourself to build and lead ministries with global impact.",
    icon: Network,
    href: "/journeys/build-a-ministry",
    featured: false,
    modules: ["Logic Systems", "Global Scaling"],
    images: ["/images/pastor/dli-conference-whiteboard.jpg", "/images/pastor/sermon-blue-backdrop.jpg"],
  },
  {
    title: "Transform Your Society",
    body: "Learn how to carry transformation into business, culture, and governance.",
    icon: Landmark,
    href: "/journeys/transform-society",
    featured: false,
    modules: ["Cultural Command", "Strategic Reform"],
    images: ["/images/pastor/community-vestments-auditorium.jpg", "/images/pastor/hero-night-of-glory.jpg"],
  },
];

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
      <section className="px-5 pb-16 pt-24 text-center sm:pb-20 sm:pt-28 lg:pb-28 lg:pt-32">
        <Container className="px-0">
          <span className="mb-8 block text-[11px] font-bold uppercase tracking-[0.45em] text-gold-hover">
            Your Starting Point
          </span>
          <h1 className="text-display-l text-ink-900 sm:text-[5.5rem] sm:leading-[0.95]">Start Here</h1>
          <div className="mx-auto mt-8 h-px w-20 bg-gold-600/35" />
          <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl italic leading-snug text-ink-500 sm:text-3xl">
            Your gateway to growth and transformation.{" "}
            <span className="font-bold not-italic text-ink-900">Discover where you fit and how you can grow.</span>
          </p>
        </Container>
      </section>

      <section className="px-5">
        <Container className="px-0">
          <div className="grid grid-cols-2 gap-y-10 border-y border-ink-100 py-12 sm:grid-cols-3 lg:grid-cols-6 lg:py-16">
            {identities.map(({ title, label, icon: Icon, active }) => (
              <div
                key={title}
                className="group flex flex-col items-center px-4 text-center lg:border-r lg:border-ink-100/70 lg:last:border-r-0"
              >
                <span
                  className={cn(
                    "mb-6 grid h-12 w-12 place-items-center rounded-[var(--radius-m)] border transition-all duration-300 group-hover:-translate-y-1",
                    active
                      ? "border-ink-900 bg-ink-900 text-paper-0 shadow-elev-2"
                      : "border-ink-100 bg-paper-0 text-ink-500 group-hover:border-gold-600/50 group-hover:text-gold-hover",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className={cn("text-caption font-bold uppercase tracking-[0.24em]", active ? "text-gold-hover" : "text-ink-700")}>
                  {title}
                </span>
                <span className="mt-2 max-w-[8rem] text-[9px] font-bold uppercase tracking-[0.2em] text-ink-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-5 py-16 sm:py-20 lg:py-28">
        <Container className="px-0">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end">
            <h2 className="text-heading-1 text-ink-900 sm:text-[3.5rem] sm:leading-tight">Find Your Path</h2>
            <div className="hidden h-px flex-1 bg-ink-100 md:block" />
            <Button href={`/${loc}/teachings`} variant="ghost" className="w-fit px-0 text-gold-hover hover:bg-transparent">
              View All Paths
              <ArrowRight className="h-4 w-4 -rotate-45 rtl:rotate-[225deg]" aria-hidden />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
            {dossiers.map((dossier) => {
              const Icon = dossier.icon;
              return (
                <article
                  key={dossier.title}
                  className={cn(
                    "group relative flex min-h-[34rem] flex-col overflow-hidden rounded-[var(--radius-s)] border p-7 shadow-[0_28px_70px_-45px_rgba(10,14,26,0.45)] transition-all duration-500 hover:-translate-y-2",
                    dossier.featured
                      ? "border-ink-900 bg-ink-900 text-paper-0"
                      : "border-ink-100 bg-paper-0 text-ink-900",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-1.5 bg-gold-600 transition-transform duration-700",
                      dossier.featured ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0",
                    )}
                  />
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "text-[10px] font-extrabold uppercase tracking-[0.32em]",
                        dossier.featured ? "text-gold-400" : "text-ink-400",
                      )}
                    >
                        {dossier.featured ? "Core Path" : "Journey"}
                    </span>
                    <Icon className="h-5 w-5 shrink-0 text-gold-hover" aria-hidden />
                  </div>
                  <h3 className={cn("text-heading-3 leading-tight", dossier.featured ? "text-paper-0" : "text-ink-900")}>
                    {dossier.title}
                  </h3>
                  <p className={cn("mt-5 flex-1 text-body-s leading-relaxed", dossier.featured ? "text-ink-300" : "text-ink-500")}>
                    {dossier.body}
                  </p>
                  <div className={cn("mt-8 space-y-5 border-t pt-6", dossier.featured ? "border-paper-0/10" : "border-ink-100")}>
                    {dossier.modules.map((module, index) => (
                      <div key={module} className="flex items-center gap-4">
                        <span className={cn("relative h-10 w-10 overflow-hidden rounded-[var(--radius-s)]", dossier.featured ? "bg-paper-0/10" : "bg-paper-50")}>
                          <Image src={dossier.images[index]} alt="" fill sizes="40px" className={cn("object-cover", !dossier.featured && "grayscale")} />
                        </span>
                        <span className={cn("text-[10px] font-bold uppercase tracking-[0.16em]", dossier.featured ? "text-paper-0/80" : "text-ink-700")}>
                          {module}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    href={p(dossier.href)}
                    className={cn(
                      "mt-8 h-12 w-full rounded-[var(--radius-s)] text-[11px] uppercase tracking-[0.22em]",
                      dossier.featured ? "bg-gold-600 text-ink-900 hover:bg-paper-0" : "bg-ink-900 text-paper-0 hover:bg-gold-600 hover:text-ink-900",
                    )}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
                  </Button>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="px-5 pb-20 pt-4 text-center lg:pb-28">
        <Container className="px-0">
          <div className="mx-auto h-px w-16 bg-gold-600/30" />
          <blockquote className="mx-auto mt-10 max-w-4xl font-serif text-3xl italic leading-tight text-ink-900 sm:text-5xl">
            &quot;We do not just build cathedrals;{" "}
            <span className="font-bold not-italic text-gold-hover">we build people</span> who build nations.&quot;
          </blockquote>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-[10px] font-bold uppercase tracking-[0.32em] text-ink-400">
            <span>Dominion City Global</span>
          </div>
        </Container>
      </section>

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

      <section className="px-5 py-16 sm:py-20 lg:py-28">
        <Container className="px-0">
          <div className="relative overflow-hidden rounded-[var(--radius-m)] border border-gold-600/20 bg-paper-0 p-8 shadow-[0_32px_90px_-60px_rgba(10,14,26,0.45)] sm:p-12 lg:p-16">
            <div className="absolute inset-y-0 left-0 w-1 bg-gold-600/40" aria-hidden />
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.34em] text-gold-hover">
                  Diagnostic Console
                </span>
                <h2 className="text-heading-1 text-ink-900">Not sure where to start?</h2>
                <p className="mt-5 text-body-l italic leading-relaxed text-ink-500">
                  Take our seven-minute assessment to discover your current leadership level and
                  the best next step for your journey.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-stretch gap-4 sm:items-center">
                <Button href={p("/leadership/assessment")} size="l" className="rounded-[var(--radius-s)] bg-ink-900 text-paper-0 hover:bg-gold-600 hover:text-ink-900">
                  Take the Assessment
                  <Compass className="h-4 w-4" aria-hidden />
                </Button>
                <Button href={p("/mentorship")} variant="ghost" className="text-[11px] uppercase tracking-[0.2em] text-ink-400 hover:bg-transparent hover:text-gold-hover">
                  Talk to Someone
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
