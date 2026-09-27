"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Click-to-load YouTube embed: shows the video's own thumbnail and only pulls
 * in YouTube's iframe once someone presses play, keeping the hero light.
 */
export function EventHeroVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = React.useState(false);
  const [poster, setPoster] = React.useState(`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-l)] border border-paper-0/10 bg-black shadow-elev-4">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={poster}
            alt=""
            fill
            unoptimized
            priority
            onError={() => setPoster(`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`)}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent" aria-hidden />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-gold-600 text-ink-900 shadow-elev-3 transition-transform duration-300 group-hover:scale-110 sm:h-24 sm:w-24">
              <Play className="ms-1 h-9 w-9 fill-current" aria-hidden />
            </span>
          </span>
          <span className="absolute bottom-5 start-5 hidden text-caption sm:block font-semibold uppercase tracking-[0.25em] text-paper-0/80">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
