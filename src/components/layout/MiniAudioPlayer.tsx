"use client";

import { Play, Pause, X, AudioLines } from "lucide-react";
import { useAudioPlayer } from "@/lib/audio-store";

/** Persists across route changes (mounted at layout level). */
export function MiniAudioPlayer() {
  const { track, playing, toggle, stop } = useAudioPlayer();
  if (!track) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] px-3 md:left-auto md:right-4 md:w-96 md:px-0">
      <div className="flex items-center gap-3 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-3 shadow-elev-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-s)] bg-ink-900 text-gold-400">
          <AudioLines className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body-s font-semibold text-ink-900">{track.title}</p>
          <p className="truncate text-caption text-ink-500">{track.speaker}</p>
        </div>
        <button
          onClick={toggle}
          aria-label={playing ? "Pause" : "Play"}
          className="grid h-10 w-10 place-items-center rounded-full bg-gold-600 text-ink-900 hover:bg-gold-hover"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button onClick={stop} aria-label="Close player" className="rounded-full p-1.5 text-ink-500 hover:bg-paper-50">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
