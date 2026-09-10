import Link from "next/link";
import { Sparkles, GraduationCap, Users, BookOpen, Landmark, Handshake, Heart, ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";

/**
 * Quick routes. The homepage shows all seven; Start Here passes `exclude`
 * to drop the two whose labels would repeat cards on that page.
 */
export function JourneyStrip({
  locale,
  exclude = [],
}: {
  locale: Locale;
  exclude?: ("growSpiritually" | "becomeLeader")[];
}) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc].journeyStrip;

  const ALL = [
    // Was /journeys/grow-spiritually, a route that no longer exists.
    { key: "growSpiritually", label: c.growSpiritually, icon: Sparkles, href: "/start-here" },
    { key: "becomeLeader", label: c.becomeLeader, icon: GraduationCap, href: "/mentorship" },
    // No community/chapters page exists yet; contact is the nearest real destination.
    { key: "joinCommunity", label: c.joinCommunity, icon: Users, href: "/contact" },
    { key: "accessTeachings", label: c.accessTeachings, icon: BookOpen, href: "/media" },
    { key: "exploreMinistry", label: c.exploreMinistry, icon: Landmark, href: "/ministry" },
    { key: "partner", label: c.partner, icon: Handshake, href: "/partnership" },
    { key: "volunteer", label: c.volunteer, icon: Heart, href: "/contact" },
  ] as const;

  const TILES = ALL.filter((t) => !exclude.includes(t.key as never));
  // 7 tiles sit 4+3; 5 tiles fit one row of five. Literal classes so Tailwind
  // sees them.
  const cols = TILES.length > 5 ? "lg:grid-cols-4" : "lg:grid-cols-5";

  return (
    <section className="border-b border-ink-100/60 bg-paper-0 py-12">
      <Container>
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 ${cols}`}>
          {TILES.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={`/${locale}${href}`}
              className="group flex flex-col rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 transition-all hover:border-gold-600 hover:shadow-elev-2"
            >
              <Icon className="mb-4 h-8 w-8 text-gold-600" aria-hidden />
              <h3 className="text-body-s font-semibold text-ink-900">{label}</h3>
              <ArrowRight className="mt-4 h-4 w-4 self-end text-ink-500 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
