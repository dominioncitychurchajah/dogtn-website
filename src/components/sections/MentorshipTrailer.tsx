"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight, RotateCcw } from "lucide-react";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { homeCopy } from "@/i18n/pages/home";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The mentorship trailer / course preview.
 *
 * `TrailerPlayer` is the card itself — it sits in the homepage hero. It is
 * presented like a course preview rather than a bare embed: a poster with a
 * single play affordance, then the player, then an end screen that appears once
 * the video has fully played and routes to the Leadership Assessment.

 *
 * The end screen relies on the YouTube IFrame API's ENDED state, which is why
 * the player is created through the API rather than a plain <iframe>.
 */

// ⚠️ Interim video: an existing message from the DOGTN channel stands in until the
// real mentorship trailer is published. Swap this one ID — nothing else changes.
const TRAILER_YOUTUBE_ID = "yznUhbmTK8I";

/**
 * Poster = the video's own YouTube thumbnail, so it always matches the trailer.
 * `maxresdefault` is the 1280x720 frame; not every upload has one, so a failed
 * load falls back to `hqdefault`, which YouTube always generates.
 */
const posterUrl = (quality: "maxresdefault" | "hqdefault") =>
  `https://i.ytimg.com/vi/${TRAILER_YOUTUBE_ID}/${quality}.jpg`;

type Phase = "poster" | "playing" | "ended";

/** After this many seconds of playback the preview stops and the unlock popup
 *  appears — the hero video is a teaser, not the full teaching. */
const PREVIEW_SECONDS = 30;

/* Minimal shape of the bits of the YouTube IFrame API this component uses. */
interface YTPlayer {
  destroy: () => void;
  pauseVideo: () => void;
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: { onStateChange?: (e: { data: number }) => void };
    }
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number };
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const API_SRC = "https://www.youtube.com/iframe_api";

/** Resolve once the YouTube IFrame API is ready, loading it on first use. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT as YTNamespace);
    };
    if (!document.querySelector(`script[src="${API_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = API_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

export function TrailerPlayer({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const loc: Locale = isLocale(locale) ? locale : defaultLocale;
  const c = homeCopy[loc].trailer;

  const [phase, setPhase] = React.useState<Phase>("poster");
  const [poster, setPoster] = React.useState(() => posterUrl("maxresdefault"));
  const mountRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<YTPlayer | null>(null);
  const previewTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPreviewTimer = React.useCallback(() => {
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
  }, []);

  React.useEffect(
    () => () => {
      clearPreviewTimer();
      playerRef.current?.destroy();
      playerRef.current = null;
    },
    [clearPreviewTimer]
  );

  async function start() {
    setPhase("playing");
    trackEvent("mentorship_trailer_played", { locale: loc });

    const YT = await loadYouTubeApi();
    const mount = mountRef.current;
    if (!mount) return;

    playerRef.current?.destroy();
    playerRef.current = new YT.Player(mount, {
      videoId: TRAILER_YOUTUBE_ID,
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        // Suppress YouTube's own end screen so ours is the only one shown.
        iv_load_policy: 3,
      },
      events: {
        onStateChange: (e) => {
          // Start the 30s preview countdown the first time playback begins.
          if (e.data === YT.PlayerState.PLAYING && !previewTimerRef.current) {
            previewTimerRef.current = setTimeout(() => {
              playerRef.current?.pauseVideo();
              setPhase("ended");
              trackEvent("mentorship_trailer_preview_ended", { locale: loc });
            }, PREVIEW_SECONDS * 1000);
          }
          // If the (short) video finishes before 30s, show the popup anyway.
          if (e.data === YT.PlayerState.ENDED) {
            clearPreviewTimer();
            setPhase("ended");
            trackEvent("mentorship_trailer_completed", { locale: loc });
          }
        },
      },
    });
  }

  function replay() {
    clearPreviewTimer();
    setPhase("poster");
    playerRef.current?.destroy();
    playerRef.current = null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "relative rounded-[24px] border border-white/20 bg-white/5 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[16px] bg-black">
        {/* Poster + single play affordance */}
        {phase === "poster" && (
          <button
            type="button"
            onClick={start}
            aria-label={c.play}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={poster}
              alt=""
              fill
              unoptimized
              priority
              onError={() => setPoster(posterUrl("hqdefault"))}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Light scrim only — the thumbnail should read as the trailer's own frame. */}
            <span className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[#C9A227] text-[#0A192F] shadow-elev-3 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <PlayCircle className="h-8 w-8 sm:h-10 sm:w-10" aria-hidden />
              </span>
            </span>
            <span className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 text-start sm:bottom-5 sm:left-5">
              <span className="rounded-full bg-[#C9A227]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0A192F]">
                {c.eyebrow}
              </span>
              <span className="text-body-s font-medium text-white/90">{c.duration}</span>
            </span>
          </button>
        )}

        {/* Player mount — the API replaces this node with its iframe */}
        {phase !== "poster" && (
          <div className="absolute inset-0 h-full w-full">
            <div ref={mountRef} className="h-full w-full" />
          </div>
        )}

        {/* End screen — appears only once the trailer has fully played */}
        {phase === "ended" && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0A192F]/95 p-5 text-center backdrop-blur-sm sm:gap-5 sm:p-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A227] sm:text-[11px]">
              {c.endEyebrow}
            </span>
            <p className="max-w-sm text-body-s text-white/80 sm:text-body-m">{c.endBody}</p>
            <Link
              href={`/${loc}/leadership/assessment`}
              onClick={() => trackEvent("assessment_started_via_trailer", { locale: loc })}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C9A227] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0A192F] transition-colors hover:bg-[#e0b430] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A192F] sm:px-8 sm:py-4 sm:text-sm"
            >
              {c.endCta}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center gap-2 text-body-s font-semibold text-white/60 transition-colors hover:text-white"
            >
              <RotateCcw className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
              {c.replay}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default TrailerPlayer;
