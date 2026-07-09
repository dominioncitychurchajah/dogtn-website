import type { Metadata } from "next";
import { ArrowRight, Timer, FileText, ShieldCheck, Eye, Brain, Network, Globe, Building2, TrendingUp, Info } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Leadership Assessment",
  description:
    "A comprehensive 7-minute growth diagnostic designed to evaluate your current sphere of impact and unlock the next tier of your global leadership potential.",
};

const PILLARS = [
  { label: "Character", icon: ShieldCheck },
  { label: "Vision", icon: Eye },
  { label: "Competence", icon: Brain },
  { label: "Influence", icon: Network },
  { label: "Kingdom Orientation", icon: Globe },
];

const TRUST = [
  { label: "Institutional Gravity", icon: Building2 },
  { label: "Global Standards", icon: Globe },
  { label: "Evidence-Based", icon: TrendingUp },
];

export default async function AssessmentIntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <Section surface="alt" className="relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#0A0E1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-600/20 bg-gold-600/10 px-3 py-1 text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
            <span className="h-2 w-2 rounded-full bg-gold-600" aria-hidden />
            Institutional Diagnostic
          </span>
          <h1 className="text-display-l text-ink-900">Find your next leadership step</h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-l leading-relaxed text-ink-500">
            A comprehensive 7-minute growth diagnostic designed to evaluate your current sphere of
            impact and unlock the next tier of your global leadership potential.
          </p>
        </div>

        {/* Diagnostic card */}
        <div className="relative mx-auto mt-16 max-w-4xl rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-2 lg:p-12">
          {/* Top accent line */}
          <div className="absolute left-1/2 top-0 h-1 w-32 -translate-x-1/2 rounded-b-full bg-gold-600" aria-hidden />

          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left: content */}
            <div>
              <h2 className="text-heading-2 text-ink-900">Leadership Maturity Matrix</h2>
              <p className="mt-4 text-body-m text-ink-500">
                This assessment utilizes the Transformation Ecosystem framework to provide a
                precise roadmap for your personal and institutional advancement.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <Timer className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="text-body-m font-semibold text-ink-900">7-Minute Duration</p>
                    <p className="text-caption text-ink-500">Efficient, high-impact diagnostic flow.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                  <div>
                    <p className="text-body-m font-semibold text-ink-900">Personalized Insight Report</p>
                    <p className="text-caption text-ink-500">Receive a detailed breakdown of your metrics.</p>
                  </div>
                </div>
              </div>

              <Button
                href={`/${loc}/leadership/assessment/question`}
                size="l"
                className="cta-pulse mt-10 w-full uppercase tracking-widest sm:w-auto"
              >
                Start Assessment
                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
              </Button>
            </div>

            {/* Right: measured pillars */}
            <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-50 p-8">
              <h3 className="mb-6 text-center text-caption font-semibold uppercase tracking-wider text-ink-500">
                Measured Pillars
              </h3>
              <ul className="space-y-3">
                {PILLARS.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="group flex items-center justify-between rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 p-4 transition-colors hover:border-gold-600/40"
                  >
                    <span className="flex items-center gap-4">
                      <Icon className="h-5 w-5 text-ink-500 transition-colors group-hover:text-gold-600" aria-hidden />
                      <span className="text-body-m font-semibold text-ink-900">{label}</span>
                    </span>
                    <Info className="h-5 w-5 text-transparent transition-colors group-hover:text-gold-600" aria-hidden />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Trust banner */}
        <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 grayscale">
          {TRUST.map(({ label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 text-ink-900">
              <Icon className="h-5 w-5" aria-hidden />
              <span className="text-body-s font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
