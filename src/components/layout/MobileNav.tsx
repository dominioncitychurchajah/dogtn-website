"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
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
  giveLabel,
}: {
  open: boolean;
  onClose: () => void;
  groups: NavGroup[];
  locale: Locale;
  giveLabel: string;
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
    <div className="fixed inset-0 z-[120] flex flex-col bg-ink-900 text-paper-0 lg:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-display text-heading-3">Menu</span>
        <button onClick={onClose} aria-label="Close menu" className="rounded-full p-2 hover:bg-paper-0/10">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="space-y-1">
          {groups.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                onClick={onClose}
                className="block rounded-[var(--radius-m)] px-3 py-3 text-heading-3 font-display hover:bg-paper-0/5"
              >
                {g.label}
              </Link>
              {g.mega && (
                <ul className="ms-3 mb-2 space-y-0.5 border-s border-paper-0/10 ps-4">
                  {g.mega.map((m) =>
                    m.href.startsWith("http") ? (
                      <li key={m.href}>
                        <a
                          href={m.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="block py-2 text-body-m text-ink-300 hover:text-gold-400"
                        >
                          {m.label}
                        </a>
                      </li>
                    ) : (
                      <li key={m.href}>
                        <Link
                          href={m.href}
                          onClick={onClose}
                          className="block py-2 text-body-m text-ink-300 hover:text-gold-400"
                        >
                          {m.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-between gap-4 border-t border-paper-0/10 px-5 py-3">
        <span className="text-body-s text-ink-300">Appearance</span>
        <ThemeToggle className="flex" />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-paper-0/10 px-5 py-4">
        <LanguageSwitcher locale={locale} />
        <Button href={`/${locale}/give`} onClick={onClose} className="flex-1">
          {giveLabel}
        </Button>
      </div>
    </div>
  );
}
