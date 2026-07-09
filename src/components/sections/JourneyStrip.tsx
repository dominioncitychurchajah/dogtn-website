import Link from "next/link";
import { Sparkles, GraduationCap, Users, BookOpen, Landmark, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { Container } from "@/components/layout/Section";

const TILES = [
  { label: "Grow Spiritually", icon: Sparkles, href: "/journeys/grow-spiritually" },
  { label: "Become a Leader", icon: GraduationCap, href: "/journeys/become-a-leader" },
  { label: "Join a Community", icon: Users, href: "/community" },
  { label: "Access Teachings", icon: BookOpen, href: "/teachings" },
  { label: "Explore Institutions", icon: Landmark, href: "/institutions" },
];

export function JourneyStrip({ locale }: { locale: Locale }) {
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
