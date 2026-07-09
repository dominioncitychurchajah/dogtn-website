"use client";

import * as React from "react";
import { ScanSearch, Aperture } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

/** Hero "research console" search — writes the `q` param read by VaultBrowser. */
export function VaultSearchConsole() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");

  const commit = React.useCallback(
    (next: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set("q", next);
      else params.delete("q");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}#archive` : pathname, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  React.useEffect(() => {
    const t = setTimeout(() => commit(value), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="mx-auto max-w-4xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          commit(value);
          document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex flex-col items-stretch gap-3 rounded-[2rem] border border-paper-0/10 bg-paper-0/[0.08] p-3 shadow-elev-4 backdrop-blur-xl sm:flex-row sm:items-center"
      >
        <div className="flex flex-1 items-center px-4 sm:px-6">
          <ScanSearch className="me-4 h-7 w-7 shrink-0 text-gold-600" aria-hidden />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Research keywords, themes, or historical seasons…"
            aria-label="Search the Legacy Vault"
            className="w-full bg-transparent py-5 text-body-l text-paper-0 placeholder:text-ink-300/70 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-l)] bg-gold-600 px-10 py-5 text-body-s font-bold uppercase tracking-widest text-ink-900 shadow-elev-2 transition-colors hover:bg-gold-hover"
        >
          Enter Vault <Aperture className="h-5 w-5" aria-hidden />
        </button>
      </form>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-caption font-bold uppercase tracking-widest text-ink-300/70">
        <span>Popular: Governance</span>
        <span aria-hidden>•</span>
        <span>Nation Building</span>
        <span aria-hidden>•</span>
        <span>Solomonic Wisdom</span>
      </div>
    </div>
  );
}
