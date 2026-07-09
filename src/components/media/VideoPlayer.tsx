"use client";

import * as React from "react";
import Image from "next/image";
import {
  Play,
  Settings,
  Gauge,
  Captions,
  PictureInPicture2,
  Headphones,
  Check,
  Rss,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDataSaver } from "@/components/media/DataSaverToggle";

const QUALITIES = ["Auto", "1080p", "480p", "240p (Data Saver)"] as const;
const SPEEDS = ["0.75x", "1x", "1.25x", "1.5x", "2x"] as const;

/**
 * 16:9 video player mock. Shows a poster with a gold play button;
 * on play swaps to an HTML5 <video controls>. Quality/speed/captions/PiP
 * are visual/stateful mocks. Respects the Data Saver preference.
 */
export function VideoPlayer({
  poster,
  src,
  title,
}: {
  poster: string;
  src?: string;
  title?: string;
}) {
  const [playing, setPlaying] = React.useState(false);
  const [dataSaver] = useDataSaver();
  const [quality, setQuality] = React.useState<string>("Auto");
  const [speed, setSpeed] = React.useState<string>("1x");
  const [captions, setCaptions] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<"quality" | "speed" | null>(null);

  // When data saver turns on, prefer the lowest quality tier.
  React.useEffect(() => {
    if (dataSaver) setQuality("240p (Data Saver)");
  }, [dataSaver]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-l)] bg-ink-900 shadow-elev-3">
      {!playing ? (
        <>
          <Image
            src={poster}
            alt={title ? `${title} poster` : ""}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-ink-900/25" />
          {dataSaver && (
            <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-paper-0/20 bg-ink-900/80 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-paper-0 backdrop-blur">
              <Rss className="h-3 w-3" /> Data Saver — low quality
            </span>
          )}
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-600 text-ink-900 shadow-elev-3 transition-transform duration-300 hover:scale-110">
              <Play className="h-9 w-9 fill-ink-900" />
            </span>
          </button>
        </>
      ) : src ? (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          controls
          autoPlay
          poster={poster}
          src={src}
          className="h-full w-full bg-ink-900 object-contain"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-ink-900 text-center text-paper-0">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper-0/20 bg-paper-0/5">
            <Play className="h-7 w-7 fill-paper-0" />
          </span>
          <p className="text-body-s text-ink-300">Prototype player — video stream not connected</p>
        </div>
      )}

      {/* Mock control strip */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center justify-end gap-1 bg-gradient-to-t from-ink-900/85 to-transparent p-3">
        {/* Quality */}
        <div className="relative">
          <ControlButton
            active={openMenu === "quality"}
            label="Quality"
            onClick={() => setOpenMenu(openMenu === "quality" ? null : "quality")}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden text-caption font-semibold sm:inline">{quality.split(" ")[0]}</span>
          </ControlButton>
          {openMenu === "quality" && (
            <Menu>
              {QUALITIES.map((q) => (
                <MenuItem
                  key={q}
                  selected={q === quality}
                  onClick={() => {
                    setQuality(q);
                    setOpenMenu(null);
                  }}
                >
                  {q}
                </MenuItem>
              ))}
            </Menu>
          )}
        </div>

        {/* Speed */}
        <div className="relative">
          <ControlButton
            active={openMenu === "speed"}
            label="Playback speed"
            onClick={() => setOpenMenu(openMenu === "speed" ? null : "speed")}
          >
            <Gauge className="h-4 w-4" />
            <span className="hidden text-caption font-semibold sm:inline">{speed}</span>
          </ControlButton>
          {openMenu === "speed" && (
            <Menu>
              {SPEEDS.map((s) => (
                <MenuItem
                  key={s}
                  selected={s === speed}
                  onClick={() => {
                    setSpeed(s);
                    setOpenMenu(null);
                  }}
                >
                  {s}
                </MenuItem>
              ))}
            </Menu>
          )}
        </div>

        {/* Captions */}
        <ControlButton
          active={captions}
          label="Toggle captions"
          onClick={() => setCaptions((c) => !c)}
        >
          <Captions className="h-4 w-4" />
        </ControlButton>

        {/* PiP */}
        <ControlButton label="Picture in picture">
          <PictureInPicture2 className="h-4 w-4" />
        </ControlButton>

        {/* Audio only hint */}
        <ControlButton label="Audio only">
          <Headphones className="h-4 w-4" />
        </ControlButton>
      </div>
    </div>
  );
}

function ControlButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--radius-s)] px-2.5 py-1.5 text-paper-0 transition-colors hover:bg-paper-0/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
        active && "bg-gold-600 text-ink-900 hover:bg-gold-hover",
      )}
    >
      {children}
    </button>
  );
}

function Menu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-full end-0 mb-2 min-w-40 overflow-hidden rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 py-1 text-ink-900 shadow-elev-3">
      {children}
    </div>
  );
}

function MenuItem({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 px-4 py-2 text-body-s hover:bg-paper-50"
    >
      <span>{children}</span>
      {selected && <Check className="h-4 w-4 text-gold-hover" />}
    </button>
  );
}
