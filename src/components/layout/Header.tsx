"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, UserCircle2, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { buildNav, type NavStrings } from "./nav-config";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function Header({ locale, strings }: { locale: Locale; strings: NavStrings }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMega, setOpenMega] = React.useState<string | null>(null);
  const groups = React.useMemo(() => buildNav(locale, strings), [locale, strings]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent (light text) only over the home hero before scroll.
  const overHero = isHome && !scrolled;
  const solid = !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-150",
          solid
            ? "border-b border-ink-100 bg-paper-0/90 text-ink-900 shadow-elev-1 backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-paper-0",
        )}
        onMouseLeave={() => setOpenMega(null)}
      >
        <nav className="mx-auto flex h-20 max-w-content items-center justify-between gap-6 px-5 lg:px-16">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex shrink-0 items-center" aria-label="David Ogbueli — home">
            <Image
              src={solid ? "/images/logo/dr-david-ogbueli-brand-white.png" : "/images/logo/dr-david-ogbueli-brand-dark.png"}
              alt="David Ogbueli"
              width={341}
              height={122}
              priority
              className="h-12 w-auto lg:h-14"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {groups.map((g) => (
              <div key={g.href} className="relative" onMouseEnter={() => setOpenMega(g.mega ? g.label : null)}>
                <Link
                  href={g.href}
                  className={cn(
                    "flex items-center gap-1 rounded-[var(--radius-s)] px-3 py-2 text-body-s font-semibold transition-colors",
                    solid ? "hover:text-gold-hover" : "hover:text-gold-400",
                  )}
                >
                  {g.label}
                  {g.mega && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                </Link>
                {g.mega && openMega === g.label && (
                  <div className="absolute start-0 top-full w-72 pt-2">
                    <ul className="overflow-hidden rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 py-2 text-ink-900 shadow-elev-3">
                      {g.mega.map((m) => {
                        const isExternal = m.href.startsWith("http");
                        const content = (
                          <>
                            <span className="block text-body-m font-semibold">{m.label}</span>
                            {m.desc && <span className="block text-caption text-ink-500">{m.desc}</span>}
                          </>
                        );
                        return (
                          <li key={m.href}>
                            {isExternal ? (
                              <a href={m.href} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 hover:bg-paper-50">
                                {content}
                              </a>
                            ) : (
                              <Link href={m.href} className="block px-4 py-2.5 hover:bg-paper-50">
                                {content}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/${locale}/library`}
              aria-label={strings.search}
              className="rounded-full p-2 hover:bg-current/10"
            >
              <Search className="h-5 w-5" />
            </Link>
            <LanguageSwitcher locale={locale} className="hidden sm:block" />
            <Link href={`/${locale}/my-journey`} aria-label={strings.account} className="rounded-full p-2 hover:bg-current/10">
              <UserCircle2 className="h-6 w-6" />
            </Link>
            <Button href={`/${locale}/give`} size="s" className="hidden sm:inline-flex">
              {strings.give}
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={strings.menu}
              className="rounded-full p-2 hover:bg-current/10 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        groups={groups}
        locale={locale}
        giveLabel={strings.give}
      />
    </>
  );
}
