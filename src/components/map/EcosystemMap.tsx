"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Institution } from "@/data/types";
import type { Locale } from "@/i18n/config";
import { Tabs } from "@/components/ui/Tabs";
import { InstitutionCard } from "@/components/cards/InstitutionCard";
import { DynIcon } from "@/components/ui/DynIcon";

/**
 * Signature ecosystem visual: a central "network" node with the 7 institutions
 * orbiting it. Rendered as a Tabs surface offering an SVG node map AND an
 * accessible card list (each a genuine, focusable view — not a hidden duplicate).
 */
export function EcosystemMap({
  institutions,
  locale,
}: {
  institutions: Institution[];
  locale: Locale;
}) {
  return (
    <Tabs
      defaultValue="map"
      items={[
        { value: "map", label: "Map", content: <NodeMap institutions={institutions} locale={locale} /> },
        {
          value: "list",
          label: "List",
          content: (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {institutions.map((inst) => (
                <li key={inst.slug} className="h-full">
                  <InstitutionCard institution={inst} locale={locale} dark />
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  );
}

// --- SVG node map -----------------------------------------------------------

const VIEW = 800; // square viewBox
const CENTER = VIEW / 2;
const ORBIT = 300; // radius of the orbiting nodes (percentage space)

/** Position of node i of n on the orbit, in 0–100 % coordinates. Start at top. */
function nodePos(i: number, n: number) {
  const angle = (i / n) * Math.PI * 2 - Math.PI / 2; // -90deg = top
  const cx = CENTER + ORBIT * Math.cos(angle);
  const cy = CENTER + ORBIT * Math.sin(angle);
  return { x: (cx / VIEW) * 100, y: (cy / VIEW) * 100 };
}

function NodeMap({ institutions, locale }: { institutions: Institution[]; locale: Locale }) {
  const n = institutions.length;

  return (
    <div className="w-full overflow-x-auto">
      <div className="relative mx-auto aspect-square w-full min-w-[340px] max-w-[720px]">
        {/* Connecting lines + halos (decorative) */}
        <svg
          viewBox={`0 0 ${VIEW} ${VIEW}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="eco-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <circle cx={CENTER} cy={CENTER} r={260} fill="url(#eco-core)" />
          <circle
            cx={CENTER}
            cy={CENTER}
            r={ORBIT}
            fill="none"
            stroke="#C9A227"
            strokeOpacity="0.15"
            strokeDasharray="2 8"
          />

          <g stroke="url(#eco-line)" strokeWidth="1.5" fill="none">
            {institutions.map((inst, i) => {
              const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
              const x2 = CENTER + ORBIT * Math.cos(angle);
              const y2 = CENTER + ORBIT * Math.sin(angle);
              return <line key={inst.slug} x1={CENTER} y1={CENTER} x2={x2} y2={y2} />;
            })}
          </g>
        </svg>

        {/* Central node */}
        <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <div className="pulse-live flex h-20 w-20 items-center justify-center rounded-full border-4 border-ink-900 bg-gold-600 shadow-elev-3 sm:h-28 sm:w-28">
            <DynIcon name="compass" className="h-8 w-8 text-ink-900 sm:h-11 sm:w-11" aria-hidden />
          </div>
          <span className="mt-3 block max-w-[9rem] text-caption font-semibold uppercase tracking-widest text-gold-400">
            David Ogbueli
            <span className="mt-0.5 block font-normal text-ink-300">Transformation Network</span>
          </span>
        </div>

        {/* Orbiting institution nodes — real, focusable links */}
        {institutions.map((inst, i) => {
          const { x, y } = nodePos(i, n);
          return (
            <Link
              key={inst.slug}
              href={`/${locale}/institutions/${inst.slug}`}
              aria-label={`${inst.name} — ${inst.tagline}`}
              className="group absolute z-20 flex w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center focus:outline-none sm:w-32"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold-600 bg-ink-900 shadow-elev-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-gold-600 group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-gold-400 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink-900 sm:h-16 sm:w-16">
                <DynIcon
                  name={inst.icon}
                  className="h-6 w-6 text-gold-400 transition-colors group-hover:text-ink-900 sm:h-7 sm:w-7"
                  aria-hidden
                />
              </span>
              <span className="mt-2 text-caption font-semibold leading-tight text-ink-300 transition-colors group-hover:text-paper-0 group-focus-visible:text-paper-0">
                {inst.shortName}
              </span>
            </Link>
          );
        })}
      </div>

      <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-body-s text-ink-300">
        Select any institution to explore its mandate
        <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
      </p>
    </div>
  );
}
