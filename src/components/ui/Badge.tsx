import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "ink" | "flame" | "verd" | "info" | "neutral";

const tones: Record<Tone, string> = {
  gold: "bg-gold-600/12 text-gold-hover border-gold-600/25",
  ink: "bg-ink-900 text-paper-0 border-transparent",
  flame: "bg-flame-600/12 text-flame-600 border-flame-600/25",
  verd: "bg-verd-600/12 text-verd-600 border-verd-600/25",
  info: "bg-info-600/12 text-info-600 border-info-600/25",
  neutral: "bg-paper-50 text-ink-500 border-ink-100",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-semibold uppercase tracking-wider",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
