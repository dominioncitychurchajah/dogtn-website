import Link from "next/link";
import { Users, BookOpen, Landmark, Handshake, Heart, ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";

export function JourneyStrip({ locale }: { locale: Locale }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc].journeyStrip;

  const TILES = [
    // No community/chapters page exists yet; contact is the nearest real destination.
    { label: c.joinCommunity, icon: Users, href: "/contact" },
    { label: c.accessTeachings, icon: BookOpen, href: "/media" },
    { label: c.exploreMinistry, icon: Landmark, href: "/ministry" },
    { label: c.partner, icon: Handshake, href: "/partnership" },
    { label: c.volunteer, icon: Heart, href: "/contact" },
  ];

  return (
    <section className="border-b border-ink-100/60 bg-paper-0 py-12">
      <Container>
        {/* Five tiles in a four-column grid left one stranded on its own row.
            Five columns on desktop puts them in a single line. */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
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
