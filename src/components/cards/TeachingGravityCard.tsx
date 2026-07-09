import Image from "next/image";
import Link from "next/link";
import { Video, Mic, Layers, Bookmark } from "lucide-react";
import type { Teaching } from "@/data/types";
import type { Locale } from "@/i18n/config";

const formatIcon = { video: Video, audio: Mic, article: Layers };

function formatDuration(min: number) {
  if (min >= 60) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}:${String(m).padStart(2, "0")}:00`;
  }
  return `${min}:00`;
}

/** "Gravity card" — Institutional Gravity teachings-library card treatment. */
export function TeachingGravityCard({ teaching, locale }: { teaching: Teaching; locale: Locale }) {
  const Icon = formatIcon[teaching.format];

  return (
    <div className="group">
      <Link
        href={`/${locale}/teachings/${teaching.slug}`}
        className="relative mb-6 block aspect-video overflow-hidden rounded-[var(--radius-l)] bg-ink-100 shadow-elev-1"
      >
        <Image
          src={teaching.thumbnail}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-4 end-4 rounded-[var(--radius-s)] bg-ink-900/80 px-2 py-1 text-caption font-semibold text-paper-0 backdrop-blur">
          {formatDuration(teaching.durationMin)}
        </span>
        <span className="absolute top-4 start-4 grid h-8 w-8 place-items-center rounded-full bg-paper-0/90 text-ink-900 shadow-elev-1 backdrop-blur">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      </Link>

      <div className="flex flex-col">
        {teaching.tags[0] && (
          <span className="mb-2 text-caption font-semibold uppercase tracking-widest text-gold-hover">
            {teaching.tags[0]}
          </span>
        )}
        <Link href={`/${locale}/teachings/${teaching.slug}`}>
          <h3 className="text-heading-2 leading-snug text-ink-900 transition-colors group-hover:text-gold-hover">
            {teaching.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-body-m text-ink-500">{teaching.description}</p>

        <div className="mt-4 flex items-center justify-between border-t border-ink-100/70 pt-4">
          <span className="inline-flex items-center gap-2 text-ink-300">
            <Layers className="h-4 w-4" aria-hidden />
            <span className="text-caption font-semibold">{teaching.series ?? "Standalone"}</span>
          </span>
          <button
            type="button"
            aria-label="Save for later"
            className="text-ink-300 transition-colors hover:text-gold-hover"
          >
            <Bookmark className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
