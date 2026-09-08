"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MegaLink, MegaPanel } from "./nav-config";

/** Fan positions for a 3-cover stack, front-most first. */
const FAN = [
  "z-30 h-[196px] -translate-x-[76px] -rotate-[6deg] group-hover:-translate-x-[90px]",
  "z-20 h-[184px] -translate-x-[6px] rotate-[2deg] opacity-90",
  "z-10 h-[172px] translate-x-[58px] rotate-[9deg] opacity-75 group-hover:translate-x-[72px]",
];

function LinkRow({ link, onNavigate }: { link: MegaLink; onNavigate: () => void }) {
  const Icon = link.icon;
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group flex items-start gap-4 rounded-[var(--radius-m)] px-3 py-2.5 transition-colors hover:bg-paper-50"
    >
      {link.image ? (
        <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-[var(--radius-s)] shadow-elev-1">
          <Image src={link.image} alt="" fill sizes="40px" className="object-cover" />
        </span>
      ) : Icon ? (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-m)] bg-paper-50 text-gold-hover transition-colors group-hover:bg-gold-600 group-hover:text-ink-900">
          <Icon className="h-[18px] w-[18px]" />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block text-body-m font-semibold transition-colors group-hover:text-gold-hover">
          {link.label}
        </span>
        {link.desc && <span className="mt-0.5 block text-body-s text-ink-500">{link.desc}</span>}
      </span>
    </Link>
  );
}

export function MegaMenu({ panel, onNavigate }: { panel: MegaPanel; onNavigate: () => void }) {
  const { feature } = panel;
  return (
    <div className="animate-fade-up absolute inset-x-0 top-full border-t border-ink-100 bg-paper-0 text-ink-900 shadow-elev-4">
      <div className="mx-auto grid max-w-content gap-x-12 gap-y-10 px-5 py-10 lg:grid-cols-12 lg:px-16">
        {/* Primary links */}
        <div className="lg:col-span-5">
          <p className="px-3 pb-3 text-caption font-semibold uppercase tracking-[0.14em] text-ink-300">
            {panel.title}
          </p>
          <div className="flex flex-col">
            {panel.links.map((l) => (
              <LinkRow key={l.href} link={l} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Feature + secondary columns */}
        <div className="space-y-8 lg:col-span-7 lg:border-s lg:border-ink-100 lg:ps-12">
          {feature && (
            <Link
              href={feature.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex overflow-hidden rounded-[var(--radius-l)] bg-ink-900 text-paper-0 shadow-elev-2 transition-shadow hover:shadow-elev-3",
                feature.stack && "min-h-[276px]",
              )}
            >
              <div className={cn("relative z-10 p-8", feature.stack ? "max-w-[54%]" : "max-w-[62%]")}>
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-gold-400">
                  {feature.eyebrow}
                </p>
                <p className="mt-3 font-display text-heading-3">{feature.title}</p>
                <p className="mt-2 text-body-s text-ink-300">{feature.desc}</p>
                {feature.meta && <p className="mt-4 text-body-s text-gold-400">{feature.meta}</p>}
                <span className="mt-5 inline-flex items-center gap-2 text-body-s font-semibold">
                  {feature.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
              {feature.stack ? (
                <div className="pointer-events-none absolute inset-y-0 end-0 hidden w-[46%] items-center justify-center sm:flex">
                  <span className="absolute h-44 w-44 rounded-full bg-gold-600/25 blur-3xl" />
                  {feature.stack.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      width={667}
                      height={1000}
                      sizes="140px"
                      className={cn(
                        "absolute w-auto rounded-[3px] shadow-[0_18px_40px_rgba(0,0,0,0.55)] ring-1 ring-paper-0/15 transition-transform duration-300 ease-[var(--ease-standard)]",
                        FAN[i],
                      )}
                    />
                  ))}
                </div>
              ) : feature.image ? (
                <>
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-right"
                  />
                  <span className="absolute inset-0 bg-gradient-to-r from-ink-900 from-40% via-ink-900/85 via-70% to-ink-900/20" />
                </>
              ) : null}
            </Link>
          )}

          {panel.columns && (
            <div className="grid gap-8 sm:grid-cols-2">
              {panel.columns.map((col) => (
                <div key={col.title}>
                  <p className="pb-2 text-caption font-semibold uppercase tracking-[0.14em] text-ink-300">
                    {col.title}
                  </p>
                  <ul className="space-y-1">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={onNavigate}
                          className="block py-1.5 text-body-m text-ink-700 transition-colors hover:text-gold-hover"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
