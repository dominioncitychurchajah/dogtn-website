"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { locales, localeNames, isLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale, className }: { locale: Locale; className?: string }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function switchTo(next: Locale) {
    const segs = pathname.split("/");
    if (isLocale(segs[1])) segs[1] = next;
    else segs.splice(1, 0, next);
    router.push(segs.join("/") || `/${next}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full px-2.5 py-2 text-body-s font-semibold text-current hover:bg-current/10"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 py-1 text-ink-900 shadow-elev-3"
        >
          {locales.map((l) => (
            <li key={l}>
              <button
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className="flex w-full items-center justify-between px-4 py-2 text-body-s hover:bg-paper-50"
              >
                {localeNames[l]}
                {l === locale && <Check className="h-4 w-4 text-gold-600" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
