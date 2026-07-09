"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { teachingsCopy } from "@/i18n/pages/teachings";

/** Large hero search input. Syncs to the `q` URL param (read by TeachingsBrowser). */
export function TeachingsSearchBar({ locale }: { locale: Locale }) {
  const c = teachingsCopy[locale];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    const handle = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("q", value);
      else params.delete("q");
      router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="group relative mx-auto w-full max-w-4xl">
      <span className="pointer-events-none absolute inset-y-0 start-6 flex items-center text-ink-300 transition-colors group-focus-within:text-gold-hover">
        <Search className="h-6 w-6" aria-hidden />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={c.searchPlaceholder}
        className="h-20 w-full rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 ps-16 pe-8 text-heading-3 text-ink-900 shadow-elev-1 transition-all placeholder:text-ink-300/70 focus:border-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-600/20"
      />
      <span className="absolute inset-y-0 end-4 hidden items-center md:flex">
        <kbd className="rounded-[var(--radius-s)] border border-ink-100 bg-paper-50 px-3 py-1 text-caption font-semibold text-ink-500">
          ⌘K
        </kbd>
      </span>
    </div>
  );
}
