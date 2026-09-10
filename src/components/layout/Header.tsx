"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { MegaMenu } from "./MegaMenu";
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
  const openPanel = groups.find((g) => g.label === openMega)?.panel;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Transparent (light text) only over the home hero before scroll.
  const overHero = isHome && !scrolled && !openMega;
  const solid = !overHero;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-all duration-150",
          solid
            ? "border-b border-ink-100 text-ink-900 shadow-elev-1"
            : "border-b border-transparent bg-transparent text-paper-0",
          // backdrop-blur on the bar turns the mega panel translucent, so drop it while one is open
          solid && (openMega ? "bg-paper-0" : "bg-paper-0/90 backdrop-blur-md"),
        )}
        onMouseLeave={() => setOpenMega(null)}
      >
        <nav className="mx-auto flex h-20 max-w-content items-center justify-between gap-6 px-5 lg:px-8">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex shrink-0 items-center" aria-label="David Ogbueli — home">
            {solid ? (
              <>
                <Image
                  src="/images/logo/dr-david-ogbueli-brand-dark.png"
                  alt="David Ogbueli"
                  width={341}
                  height={122}
                  priority
                  className="theme-logo-light h-12 w-auto lg:h-14"
                />
                <Image
                  src="/images/logo/dr-david-ogbueli-brand-white.webp"
                  alt="David Ogbueli"
                  width={341}
                  height={122}
                  className="theme-logo-dark h-12 w-auto lg:h-14"
                />
              </>
            ) : (
              <Image
                src="/images/logo/dr-david-ogbueli-brand-white.webp"
                alt="David Ogbueli"
                width={341}
                height={122}
                priority
                className="h-12 w-auto lg:h-14"
              />
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 min-[1340px]:flex">
            {groups.map((g) => {
              const groupIsExternal = g.href.startsWith("http");
              const isOpen = openMega === g.label;
              const groupClassName = cn(
                "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-body-s font-semibold transition-colors",
                solid ? "hover:text-gold-hover" : "hover:text-gold-400",
                isOpen && (solid ? "bg-paper-50 text-gold-hover" : "bg-paper-0/10"),
              );
              const inner = (
                <>
                  {g.label}
                  {g.panel && (
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 opacity-70 transition-transform", isOpen && "rotate-180")}
                    />
                  )}
                </>
              );
              return (
                <div
                  key={g.href}
                  onMouseEnter={() => setOpenMega(g.panel ? g.label : null)}
                  onFocus={() => setOpenMega(g.panel ? g.label : null)}
                >
                  {groupIsExternal ? (
                    <a href={g.href} target="_blank" rel="noopener noreferrer" className={groupClassName}>
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={g.href}
                      className={groupClassName}
                      aria-expanded={g.panel ? isOpen : undefined}
                      onClick={() => setOpenMega(null)}
                    >
                      {inner}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/${locale}/books`}
              aria-label={strings.search}
              className="rounded-full p-2 hover:bg-current/10"
            >
              <Search className="h-5 w-5" />
            </Link>
            <ThemeToggle className="hidden min-[1340px]:flex" />
            <LanguageSwitcher locale={locale} className="hidden sm:block" />
            <Button href={`/${locale}/mentorship`} size="s" className="hidden sm:inline-flex">
              {strings.give}
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={strings.menu}
              className="rounded-full p-2 hover:bg-current/10 min-[1340px]:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {openPanel && (
          <div className="hidden min-[1340px]:block">
            <MegaMenu panel={openPanel} onNavigate={() => setOpenMega(null)} />
          </div>
        )}
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        groups={groups}
        locale={locale}
        ctaLabel={strings.give}
      />
    </>
  );
}
