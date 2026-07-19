"use client";

import * as React from "react";
import { ClipboardCheck, User, ArrowRight } from "lucide-react";

interface QuickJumpCardsProps {
  locale: string;
}

interface JumpCard {
  id: "assessment" | "mentorship";
  title: string;
  desc: string;
  icon: typeof ClipboardCheck;
  ctaText: string;
  url: string;
}

const cards = (locale: string): JumpCard[] => [
  {
    id: "assessment",
    title: "Take your 7-minute assessment",
    desc: "Discover your current leadership level and the best next step.",
    icon: ClipboardCheck,
    ctaText: "Start now",
    url: `/${locale}/leadership/assessment`,
  },
  {
    id: "mentorship",
    title: "Get matched with a mentor",
    desc: "Find a mentor who aligns with your calling and season.",
    icon: User,
    ctaText: "Get matched",
    url: `/${locale}/mentorship`,
  },
];

export function QuickJumpCards({ locale }: QuickJumpCardsProps) {
  return (
    <div>
      <div className="flex items-center gap-4" aria-hidden>
        <div className="h-px flex-1 bg-white/10" />
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Or jump straight in
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        {cards(locale).map(({ id, title, desc, icon: Icon, ctaText, url }) => (
          <a
            key={id}
            href={url}
            className="group flex flex-1 items-start gap-4 rounded-[12px] border border-white/10 bg-white/5 p-5 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(201,168,76,0.4)] hover:bg-white/[0.08]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-gold-400">
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body-s font-semibold text-paper-0">{title}</span>
              <span className="mt-0.5 block text-caption leading-relaxed text-white/50">{desc}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-caption font-semibold text-gold-400 transition-colors group-hover:text-gold-hover">
                {ctaText}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
