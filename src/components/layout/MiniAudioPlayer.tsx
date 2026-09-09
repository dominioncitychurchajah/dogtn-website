"use client";

import * as React from "react";
import { Play, Pause, X, AudioLines, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/lib/audio-store";

/** Persists across route changes (mounted at layout level). */
export function MiniAudioPlayer() {
  const { track, playing, toggle, stop } = useAudioPlayer();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  const src = track?.src;

  // Drive the element from store state. A live stream has no meaningful paused
  // position, so pausing unloads it rather than buffering on in the background.
  React.useEffect(() => {
    const el = audioRef.current;
    if (!el || !src) return;
    if (playing) {
      // Rejection is reported by the element's own onError handler; swallowing
      // here only stops an unhandled promise rejection in the console.
      el.play().catch(() => {});
    } else {
      el.pause();
      if (track?.live) el.load();
    }
  }, [playing, src, track?.live]);

  if (!track) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-3 md:left-auto md:right-4 md:w-96 md:px-0">
      <div className="flex items-center gap-3 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-3 shadow-elev-3">
        {src && (
          <audio
            ref={audioRef}
            src={src}
            preload="none"
            onWaiting={() => setLoading(true)}
            onPlaying={() => {
              setLoading(false);
              setFailed(false);
            }}
            onError={() => {
              setLoading(false);
              setFailed(true);
            }}
          />
        )}
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-s)] bg-ink-900 text-gold-400">
          <AudioLines className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-s font-semibold text-ink-900">{track.title}</p>
          <p className="truncate text-caption text-ink-500">
            {failed ? "Stream unavailable" : track.speaker}
          </p>
        </div>
        {track.live && !failed && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-flame-600/10 px-2 py-1 text-caption font-semibold uppercase tracking-wider text-flame-600">
            <span className="h-1.5 w-1.5 rounded-full bg-flame-600 animate-[pulse-live_2s_ease-in-out_infinite]" aria-hidden />
            Live
          </span>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-600 text-ink-900 hover:bg-gold-hover"
        >
          {loading && playing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : playing ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
        <button onClick={stop} aria-label="Close player" className="shrink-0 rounded-full p-1.5 text-ink-500 hover:bg-paper-50">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
