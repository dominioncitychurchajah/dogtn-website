import Link from "next/link";
import { Sparkles, GraduationCap, Users, BookOpen, Landmark, ArrowRight } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { Container } from "@/components/layout/Section";

export function JourneyStrip({ locale }: { locale: Locale }) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc].journeyStrip;

  const TILES = [
    { label: c.growSpiritually, icon: Sparkles, href: "/journeys/grow-spiritually" },
    { label: c.becomeLeader, icon: GraduationCap, href: "/journeys/become-a-leader" },
    { label: c.joinCommunity, icon: Users, href: "/start-here" },
    { label: c.accessTeachings, icon: BookOpen, href: "/media" },
    { label: c.exploreMinistry, icon: Landmark, href: "/ministry" },
  ];

  return (
    <section className="border-b border-ink-100/60 bg-paper-0 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
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
