import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronsDown, BadgeCheck, Rocket, Landmark, Medal, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Section, Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PartnershipEngine } from "@/components/forms/PartnershipEngine";
import { PrivateBriefingForm } from "@/components/forms/PrivateBriefingForm";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Invest in the blueprint for a better future. Your stewardship fuels the institutional engines of leadership, mentorship, and global missions.",
};

const PILLARS = [
  "Direct oversight of 400+ mentorship hubs worldwide.",
  "Digitization of 30+ years of transformation teachings.",
  "Deployment of rapid-response global mission teams.",
];

const TIERS = [
  {
    icon: Rocket,
    name: "Strategic Partner",
    level: "Foundation Level",
    featureIcon: CheckCircle2,
    features: ["Quarterly Impact Updates", "Annual Transformation Report", "Monthly Prayer Digest"],
    featured: false,
  },
  {
    icon: Landmark,
    name: "Legacy Builder",
    level: "Institutional Support",
    featureIcon: Star,
    features: ["VIP access to the teachings vault", "Institutional voting on select projects", "Reserved seating at global summits"],
    featured: true,
  },
  {
    icon: Medal,
    name: "Kingdom Financier",
    level: "Strategic Deployment",
    featureIcon: ShieldCheck,
    features: ["Direct mentor briefings", "Private roundtable participation", "Legacy naming opportunities"],
    featured: false,
  },
];

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src="/images/pastor/community-vestments-auditorium.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/40" aria-hidden />
        <Container className="relative z-10 py-28 text-center">
          <span className="mb-8 block text-caption font-semibold uppercase tracking-[0.3em] text-gold-400">
            Global Transformation Network
          </span>
          <h1 className="mx-auto max-w-4xl text-display-l leading-tight">
            Architecting a Legacy of <span className="text-gold-600">Transformation.</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-body-l text-ink-300">
            Invest in the blueprint for a better future. Your stewardship fuels the institutional
            engines of leadership, mentorship, and global missions.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#giving-engine" size="l" className="uppercase tracking-wider">
              Partner with the Mission
            </Button>
            <Button
              href={`/${loc}/give`}
              size="l"
              variant="secondary"
              className="border-paper-0/30 bg-transparent uppercase tracking-wider text-paper-0 hover:bg-paper-0/10"
            >
              View Annual Impact Report
            </Button>
          </div>
        </Container>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <ChevronsDown className="h-8 w-8 animate-bounce text-gold-600" aria-hidden />
        </div>
      </section>

      {/* Giving engine */}
      <Section surface="dark" id="giving-engine">
        <Container>
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-heading-1 text-paper-0">
                Invest into the <span className="text-gold-600">Transformation Ecosystem</span>
              </h2>
              <p className="mt-8 text-body-l leading-relaxed text-ink-300">
                Dominion City is more than a gathering; it is an institutional gravity point. When
                you give, you are not just donating — you are seed-funding global transformation
                across four critical pillars of society.
              </p>
              <ul className="mt-12 space-y-6">
                {PILLARS.map((p) => (
                  <li key={p} className="flex items-start gap-4 text-body-m text-ink-300">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PartnershipEngine />
          </div>
        </Container>
      </Section>

      {/* Partnership echelons */}
      <Section surface="paper">
        <Container>
          <div className="mb-20 text-center">
            <h2 className="text-heading-1 text-ink-900">
              Partnership <span className="text-gold-600">Echelons</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-body-l text-ink-500">
              Elevate your stewardship through dedicated tiers of institutional involvement and access.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {TIERS.map((tier) => {
              const TierIcon = tier.icon;
              const FeatIcon = tier.featureIcon;
              return (
                <div
                  key={tier.name}
                  className={
                    tier.featured
                      ? "card-lift relative flex flex-col border border-gold-600/40 bg-ink-900 p-10 text-paper-0"
                      : "card-lift flex flex-col border border-ink-100 bg-paper-0 p-10"
                  }
                >
                  {tier.featured && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-600 px-4 py-1 text-caption font-bold uppercase tracking-wider text-ink-900">
                      Recommended
                    </span>
                  )}
                  <div className="mb-8">
                    <TierIcon className="mb-4 h-9 w-9 text-gold-600" aria-hidden />
                    <h3 className={tier.featured ? "text-heading-3 text-paper-0" : "text-heading-3 text-ink-900"}>
                      {tier.name}
                    </h3>
                    <p className={tier.featured ? "text-caption font-semibold uppercase tracking-wider text-gold-400" : "text-caption font-semibold uppercase tracking-wider text-ink-500"}>
                      {tier.level}
                    </p>
                  </div>
                  <div
                    className="mb-8 h-px w-full"
                    style={{ background: "linear-gradient(90deg, transparent, #C5A059, transparent)" }}
                    aria-hidden
                  />
                  <ul className={tier.featured ? "mb-10 flex-1 space-y-4 text-body-s text-ink-300" : "mb-10 flex-1 space-y-4 text-body-s text-ink-500"}>
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <FeatIcon className="h-4 w-4 shrink-0 text-gold-600" aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                  {tier.featured ? (
                    <Link
                      href={`/${loc}/give`}
                      className="w-full rounded-[var(--radius-s)] bg-gold-600 py-4 text-center text-caption font-semibold uppercase tracking-widest text-ink-900 transition-all hover:bg-gold-hover"
                    >
                      Join at this level
                    </Link>
                  ) : (
                    <Link
                      href={`/${loc}/give`}
                      className="w-full rounded-[var(--radius-s)] border-2 border-ink-900 py-4 text-center text-caption font-semibold uppercase tracking-widest text-ink-900 transition-all hover:bg-ink-900 hover:text-paper-0"
                    >
                      Join at this level
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Private foundation module */}
      <Section surface="alt">
        <Container>
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-l)] shadow-elev-3">
              <Image
                src="/images/pastor/dli-conference-whiteboard.jpg"
                alt=""
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-heading-1 text-ink-900">
                Your Stewardship, <br />
                <span className="text-gold-600">Our Collective Influence.</span>
              </h2>
              <p className="mt-8 text-body-l text-ink-500">
                For private foundations, family offices, or individuals seeking structured legacy
                partnerships, we offer a dedicated concierge to discuss strategic mission alignment
                and asset-based giving.
              </p>
              <div className="mt-12">
                <PrivateBriefingForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
