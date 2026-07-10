import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Globe, Send, Rss } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary, t } from "@/lib/i18n-utils";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const p = (path: string) => `/${locale}${path}`;

  const cols = [
    {
      title: t(dict, "footer.explore"),
      links: [
        { label: "Start Here", href: p("/start-here") },
        { label: "Teachings", href: p("/teachings") },
        { label: "Library", href: p("/library") },
        { label: "Community", href: p("/community") },
      ],
    },
    {
      title: t(dict, "footer.institutions"),
      links: [
        { label: "David Ogbueli Transformation Network", href: p("/institutions/global-leadership-forum") },
        { label: "DLI Academy", href: p("/institutions/dominion-leadership-institute") },
        { label: "Golden Heart Foundation", href: p("/institutions/golden-heart-foundation") },
        { label: "Priesthood Institute", href: p("/institutions/priesthood-institute") },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "About", href: p("/about") },
        { label: "Ministries", href: p("/ministries") },
        { label: "Mentorship", href: p("/mentorship") },
        { label: "Give", href: p("/give") },
        { label: "Global Missions", href: p("/institutions/global-missions-network") },
        { label: "Contact Support", href: "mailto:support@davidogbueli.org" },
      ],
    },
  ];

  return (
    <footer className="mt-auto bg-ink-900 text-ink-300">
      <div className="mx-auto max-w-content px-5 py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Link href={`/${locale}`} className="inline-flex items-center" aria-label="David Ogbueli — home">
              <Image
                src="/images/logo/dr-david-ogbueli-dark.png"
                alt="David Ogbueli"
                width={403}
                height={83}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-body-s leading-relaxed">{t(dict, "footer.tagline")}</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-caption font-semibold uppercase tracking-widest text-paper-0">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-body-s transition-colors hover:text-gold-400">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-paper-0/10 pt-8 md:flex-row">
          <p className="text-caption text-ink-500">
            © 2026 David Ogbueli. {t(dict, "footer.network")}.
          </p>
          <div className="flex gap-4">
            {[MessageCircle, Globe, Send, Rss].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="text-ink-500 transition-colors hover:text-gold-400">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
