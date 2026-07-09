"use client";

import * as React from "react";

const TARGET = "2026-10-12T09:00:00";

function remaining() {
  const now = Date.now();
  const target = new Date(TARGET).getTime();
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    mins: Math.floor((diff / 60_000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function ForumCountdown() {
  const [t, setT] = React.useState<ReturnType<typeof remaining> | null>(null);

  React.useEffect(() => {
    const tick = () => setT(remaining());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: t?.days ?? 0, pad: false },
    { label: "Hours", value: t?.hours ?? 0, pad: true },
    { label: "Mins", value: t?.mins ?? 0, pad: true },
    { label: "Secs", value: t?.secs ?? 0, pad: true },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 rounded-[var(--radius-l)] border border-paper-0/10 bg-ink-900 p-8 text-center sm:gap-8 sm:p-12">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col" suppressHydrationWarning>
          <span className="font-display text-4xl text-gold-600 sm:text-5xl">
            {u.pad ? pad(u.value) : u.value}
          </span>
          <span className="mt-1 text-caption font-semibold uppercase tracking-widest text-ink-300">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
