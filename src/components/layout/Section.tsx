import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered content container — max 1280px with responsive margins. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-content px-5 lg:px-16", className)}>{children}</div>;
}

/** Vertical-rhythm section wrapper (96/64/48 per DS). Optional dark/paper surface. */
export function Section({
  surface = "paper",
  className,
  children,
  id,
}: {
  surface?: "paper" | "alt" | "dark";
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const bg =
    surface === "dark"
      ? "bg-ink-900 text-paper-0"
      : surface === "alt"
        ? "bg-paper-50 text-ink-900"
        : "bg-paper-0 text-ink-900";
  return (
    <section id={id} className={cn("py-12 sm:py-16 lg:py-24", bg, className)}>
      {children}
    </section>
  );
}

/** Section eyebrow + heading + optional intro. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "start",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <span className="mb-2 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-hover">
          {eyebrow}
        </span>
      )}
      <h2 className={cn("text-heading-1", dark ? "text-paper-0" : "text-ink-900")}>{title}</h2>
      {intro && <p className={cn("mt-3 text-body-l", dark ? "text-ink-300" : "text-ink-500")}>{intro}</p>}
    </div>
  );
}
