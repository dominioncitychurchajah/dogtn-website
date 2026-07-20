import type { Metadata } from "next";
import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { Container } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { PartnershipClient } from "./components/PartnershipClient";
import { partnershipCopy } from "@/i18n/pages/partnership";

export const metadata: Metadata = {
  title: "Partnership | David Ogbueli Global Transformation Network",
  description:
    "Every $50 you give trains one leader for a lifetime of impact. Join 2,400 partners worldwide who are already transforming nations through purpose, mentorship, and community.",
};

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = partnershipCopy[loc];

  return (
    <main className="overflow-hidden bg-ink-900">
      {/* PERSUASIVE HERO */}
      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-ink-900 text-paper-0">
        <Image
          src="/images/pastor/community-vestments-auditorium.jpg"
          alt="Dr. David Ogbueli addressing leadership auditorium"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/40" aria-hidden />
        <Container className="relative z-10 pt-32 pb-24 text-center">
          <span className="mb-6 block text-[11px] font-bold uppercase tracking-[0.45em] text-gold-400">
            {c.heroEyebrow}
          </span>
          <h1 className="mx-auto max-w-4xl font-display text-[32px] sm:text-[48px] lg:text-[64px] leading-tight text-paper-0">
            {c.heroTitlePre}<span className="text-gold-600 font-bold block sm:inline">{c.heroTitleAccent}</span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-body-l text-ink-300 leading-relaxed">
            {c.heroSubtitle}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="#giving-engine" size="l" className="uppercase tracking-widest font-bold">
              {c.becomePartner}
            </Button>
            <Button
              href="https://dcglobal-gules.vercel.app/en/projects"
              target="_blank"
              rel="noopener noreferrer"
              size="l"
              variant="secondary"
              className="border-paper-0/30 bg-transparent uppercase tracking-widest text-paper-0 hover:bg-paper-0/10"
            >
              {c.seeImpact}
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 max-w-3xl mx-auto border-t border-white/10 pt-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-heading-2 font-display font-bold text-gold-400">12,000+</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">{c.statLeaders}</span>
              </div>
              <div>
                <span className="block text-heading-2 font-display font-bold text-gold-400">400+</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">{c.statHubs}</span>
              </div>
              <div>
                <span className="block text-heading-2 font-display font-bold text-gold-400">30+</span>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block mt-1">{c.statNations}</span>
              </div>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
          <ChevronsDown className="h-6 w-6 animate-bounce text-gold-600" aria-hidden />
        </div>
      </section>

      {/* RENDER DYNAMIC LAYOUT PORTIONS */}
      <PartnershipClient locale={loc} />
    </main>
  );
}
