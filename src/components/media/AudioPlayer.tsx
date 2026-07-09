"use client";

import * as React from "react";
import { Play, Pause, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/lib/audio-store";

// Deterministic pseudo-random bar heights so SSR and client match.
const BARS = Array.from({ length: 56 }, (_, i) => {
  const seed = Math.sin(i * 12.9898) * 43758.5453;
  const frac = seed - Math.floor(seed);
  return 30 + Math.round(frac * 70); // 30–100%
});

/**
 * Waveform-style audio player. Play/pause is wired to the global
 * mini-player via useAudioPlayer().play(...).
 */
export function AudioPlayer({
  title,
  speaker,
  src,
}: {
  title: string;
  speaker: string;
  src?: string;
}) {
  const { track, playing, play, toggle } = useAudioPlayer();
  const isCurrent = track?.title === title && track?.speaker === speaker;
  const isPlaying = isCurrent && playing;

  function handleToggle() {
    if (isCurrent) {
      toggle();
    } else {
      play({ title, speaker, src });
    }
  }

  return (
    <div className="flex items-center gap-5 rounded-[var(--radius-l)] border border-ink-100 bg-ink-900 p-5 text-paper-0 shadow-elev-2">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold-600 text-ink-900 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
      >
        {isPlaying ? <Pause className="h-6 w-6 fill-ink-900" /> : <Play className="h-6 w-6 fill-ink-900" />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex h-12 items-end gap-[3px]" aria-hidden>
          {BARS.map((h, i) => (
            <span
              key={i}
              className={cn(
                "w-full rounded-full transition-colors",
                isPlaying && i < 22 ? "bg-gold-400" : "bg-paper-0/25",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-2 truncate text-body-s text-ink-300">
          {isPlaying ? "Now playing" : "Audio message"} · {speaker}
        </p>
      </div>

      <a
        href={src ?? "#"}
        download
        aria-label="Download audio"
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-m)] border border-paper-0/20 text-paper-0 transition-colors hover:bg-paper-0/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
      >
        <Download className="h-5 w-5" />
      </a>
    </div>
  );
}
