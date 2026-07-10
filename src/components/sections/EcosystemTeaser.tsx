import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { HomeCopy } from "@/i18n/pages/home";
import { Section, Container } from "@/components/layout/Section";
import { StatCard } from "@/components/cards/StatCard";
import { DynIcon } from "@/components/ui/DynIcon";
import { institutions } from "@/data/institutions";

// Homepage-only tagline overrides — keeps data/institutions.ts (used by the
// ecosystem map + institution detail pages) untouched.
const TEASER_TAGLINE: Record<string, string> = {
  "dominion-city": "A community of believers growing together in faith, service, and leadership.",
  "dominion-leadership-institute": "Where future leaders are formed with character, purpose, and the skills to transform their sphere.",
  "global-leadership-forum": "Where leaders convene to shape nations and build lasting institutions.",
  "golden-heart-foundation": "Empowering young people with the values, skills, and mentorship they need to lead.",
  "priesthood-institute": "Forming ministers who carry the gospel with depth, integrity, and global vision.",
  "global-missions-network": "Taking the message of transformation to communities around the world.",
};

export function EcosystemTeaser({
  locale,
  copy,
}: {
  locale: Locale;
  copy: HomeCopy["ecosystem"];
}) {
  const nodes = institutions.filter((i) => i.slug in TEASER_TAGLINE);

  return (
    <Section surface="dark">
      <Container>
        <div className="mb-14 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="text-heading-1 text-paper-0">
              {copy.titlePre}
              <span className="text-gold-400">{copy.titleAccent}</span>
              {copy.titlePost}
            </h2>
            <p className="mt-4 text-body-m text-ink-300">{copy.intro}</p>
          </div>
          <div className="flex shrink-0 gap-10 lg:mb-2">
            <StatCard dark value="1.2M+" label={copy.statReach} />
            <StatCard dark value="50+" label={copy.statNations} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {nodes.map((institution) => (
            <Link
              key={institution.slug}
              href={`/${locale}/institutions/${institution.slug}`}
              className="card-lift group flex h-full flex-col rounded-[var(--radius-l)] border border-paper-0/10 bg-paper-0/5 p-8 text-paper-0 hover:bg-paper-0/10"
            >
              <DynIcon name={institution.icon} className="mb-3 h-6 w-6 text-gold-400" aria-hidden />
              <h4 className="text-heading-3 text-paper-0">{institution.name}</h4>
              <p className="mt-2 flex-1 text-caption text-ink-300/90">
                {TEASER_TAGLINE[institution.slug]}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-body-s font-semibold text-gold-400">
                {copy.explore}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </span>
            </Link>
          ))}

          <Link
            href={`/${locale}/institutions`}
            className="card-lift group flex h-full flex-col justify-between rounded-[var(--radius-l)] border border-gold-400/30 bg-gold-600/15 p-8 text-paper-0 md:col-span-2"
          >
            <div>
              <h3 className="text-heading-3 text-paper-0">{copy.discoverTitle}</h3>
              <p className="mt-3 max-w-sm text-body-m text-ink-300">{copy.discoverBody}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 self-start rounded-[var(--radius-m)] bg-gold-600 px-6 py-3 text-body-s font-semibold text-ink-900 transition-colors group-hover:bg-gold-hover">
              {copy.viewAll}
            </span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
