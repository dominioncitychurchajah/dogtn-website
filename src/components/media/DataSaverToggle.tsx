"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "dogtn-datasaver";

function readInitial(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Data Saver preference persisted to localStorage (`dogtn-datasaver`).
 * Returns [on, setOn]. Guards `window` so it is SSR-safe.
 */
export function useDataSaver(): [boolean, (next: boolean) => void] {
  const [on, setOnState] = React.useState<boolean>(false);

  // Hydrate from storage after mount to avoid SSR mismatch.
  React.useEffect(() => {
    setOnState(readInitial());
  }, []);

  // Keep multiple hook instances in sync across the page.
  React.useEffect(() => {
    function handler(e: StorageEvent) {
      if (e.key === STORAGE_KEY) setOnState(e.newValue === "1");
    }
    function local(e: Event) {
      const detail = (e as CustomEvent<boolean>).detail;
      if (typeof detail === "boolean") setOnState(detail);
    }
    window.addEventListener("storage", handler);
    window.addEventListener("dogtn-datasaver-change", local as EventListener);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("dogtn-datasaver-change", local as EventListener);
    };
  }, []);

  const setOn = React.useCallback((next: boolean) => {
    setOnState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      window.dispatchEvent(new CustomEvent("dogtn-datasaver-change", { detail: next }));
    } catch {
      /* ignore storage failures */
    }
  }, []);

  return [on, setOn];
}

/** Inline toggle switch for the teachings filter bar. */
export function DataSaverToggle({ className, label = "Data Saver" }: { className?: string; label?: string }) {
  const [on, setOn] = useDataSaver();
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-caption font-semibold uppercase tracking-wider text-ink-500">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Toggle data saver"
        onClick={() => setOn(!on)}
        className={cn(
          "relative h-6 w-10 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600",
          on ? "bg-gold-600" : "bg-ink-100",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full bg-paper-0 shadow-elev-1 transition-transform duration-200 start-1",
            on ? "translate-x-4 rtl:-translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}
