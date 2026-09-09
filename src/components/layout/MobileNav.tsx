"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import type { NavGroup } from "./nav-config";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/i18n/config";

export function MobileNav({
  open,
  onClose,
  groups,
  locale,
  ctaLabel,
}: {
  open: boolean;
  onClose: () => void;
  groups: NavGroup[];
  locale: Locale;
  ctaLabel: string;
}) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-ink-900 text-paper-0 min-[1340px]:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-heading-3">Menu</span>
        <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-paper-0/10">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="space-y-1">
          {groups.map((g) => {
            // Panels carry cross-links to other top-level pages ("Engage",
            // "Explore", "Go further") — useful in a wide desktop panel, pure
            // duplication in a mobile list. Keep only the group's own children.
            const items = g.panel
              ? [...g.panel.links, ...(g.panel.columns?.flatMap((c) => c.links) ?? [])].filter(
                  (m, i, a) =>
                    a.findIndex((x) => x.href === m.href) === i &&
                    (m.href === g.href || !groups.some((o) => o.href === m.href)),
                )
              : [];

            if (!g.panel) {
              return (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    onClick={onClose}
                    className="block rounded-[var(--radius-m)] px-3 py-3 font-display text-heading-3 hover:bg-paper-0/5"
                  >
                    {g.label}
                  </Link>
                </li>
              );
            }

            return (
              <li key={g.href}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-[var(--radius-m)] px-3 py-3 font-display text-heading-3 hover:bg-paper-0/5 [&::-webkit-details-marker]:hidden">
                    {g.label}
                    <ChevronDown
                      className="h-5 w-5 text-ink-300 transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <ul className="mb-2 ms-3 space-y-0.5 border-s border-paper-0/10 ps-4">
                    {items.map((m) => (
                      <li key={m.href}>
                        <Link
                          href={m.href}
                          onClick={onClose}
                          className="block py-2 text-body-m text-ink-300 hover:text-gold-400"
                        >
                          {m.label}
                        </Link>
                      </li>
                    ))}
                    {g.panel.feature && (
                      <li>
                        <Link
                          href={g.panel.feature.href}
                          onClick={onClose}
                          className="mt-2 block overflow-hidden rounded-[var(--radius-m)] border border-gold-600/40"
                        >
                          {/* Same artwork the desktop panel shows. The photo is
                              composed in its right half, so crop from the right. */}
                          {g.panel.feature.stack ? (
                            <span className="flex items-end justify-center bg-ink-800/50 px-3 py-4">
                              {g.panel.feature.stack.slice(0, 3).map((src, i) => (
                                <Image
                                  key={src}
                                  src={src}
                                  alt=""
                                  width={64}
                                  height={96}
                                  className={`h-16 w-auto rounded-[2px] shadow-elev-3 ${i > 0 ? "-ms-5" : ""}`}
                                  style={{ transform: `rotate(${(i - 1) * 7}deg)`, zIndex: 3 - i }}
                                />
                              ))}
                            </span>
                          ) : g.panel.feature.image ? (
                            <span className="relative block aspect-[16/9] bg-ink-900">
                              <Image
                                src={g.panel.feature.image}
                                alt=""
                                fill
                                sizes="100vw"
                                className="object-cover object-right"
                              />
                            </span>
                          ) : null}
                          <span className="block px-3 py-2.5">
                            <span className="block text-caption uppercase tracking-[0.14em] text-gold-400">
                              {g.panel.feature.eyebrow}
                            </span>
                            <span className="block text-body-m font-semibold">{g.panel.feature.title}</span>
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center justify-between gap-4 border-t border-paper-0/10 px-5 py-3">
        <span className="text-body-s text-ink-300">Appearance</span>
        <ThemeToggle className="flex" />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-paper-0/10 px-5 py-4">
        <LanguageSwitcher locale={locale} />
        <Button href={`/${locale}/mentorship`} onClick={onClose} className="flex-1">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
