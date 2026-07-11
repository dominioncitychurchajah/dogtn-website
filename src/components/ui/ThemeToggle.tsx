"use client";

import * as React from "react";
import { Sun, Monitor, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemePref = "light" | "system" | "dark";

const STORAGE_KEY = "dogtn-theme";
const CHANGE_EVENT = "dogtn-theme-change";

function resolve(pref: ThemePref): "light" | "dark" {
  if (pref !== "system") return pref;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function apply(pref: ThemePref) {
  document.documentElement.setAttribute("data-theme", resolve(pref));
}

const OPTIONS = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "system", icon: Monitor, label: "Match device theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
] as const;

/** 3-state theme switch. Inherits currentColor so it works on light bars
 *  and dark surfaces (mobile drawer) alike. Mounted in Header (desktop)
 *  and MobileNav (drawer footer). */
export function ThemeToggle({ className }: { className?: string }) {
  // null until mounted — SSR renders no active state, avoiding hydration drift.
  const [pref, setPref] = React.useState<ThemePref | null>(null);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemePref | null;
    setPref(stored ?? "system");

    // Keep multiple instances (header + drawer) in sync.
    const onChange = (e: Event) => setPref((e as CustomEvent<ThemePref>).detail);
    window.addEventListener(CHANGE_EVENT, onChange);

    // Follow OS changes while in system mode.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onMq = () => {
      const current = (window.localStorage.getItem(STORAGE_KEY) as ThemePref | null) ?? "system";
      if (current === "system") apply("system");
    };
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener(CHANGE_EVENT, onChange);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  function select(next: ThemePref) {
    setPref(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    apply(next);
    window.dispatchEvent(new CustomEvent<ThemePref>(CHANGE_EVENT, { detail: next }));
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn("items-center rounded-full border border-current/20 p-0.5", className)}
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={pref === value}
          aria-label={label}
          title={label}
          onClick={() => select(value)}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-full transition-all",
            pref === value ? "bg-current/15" : "opacity-55 hover:opacity-100",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
