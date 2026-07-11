import { ChevronRight, MapPin, ClipboardCheck, BookOpen, HandHeart } from "lucide-react";
import { DebbieFace } from "@/components/chat/DebbieFace";
import { LANDING_PRIMARY_CHIP, LANDING_SECONDARY, type LandingIconKey } from "@/data/debbie-landing";
import type { DebbieChip } from "@/data/debbie-flows";

const ICONS: Record<LandingIconKey, typeof MapPin> = {
  chapter: MapPin,
  assessment: ClipboardCheck,
  teachings: BookOpen,
  giving: HandHeart,
};

export function DebbieLanding({ onSelect }: { onSelect: (chip: DebbieChip) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-5 flex flex-col items-center gap-3 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink-900 text-gold-400">
          <DebbieFace state="idle" className="h-9 w-9" />
        </span>
        <div>
          <p className="text-body-l font-semibold text-ink-900">Debbie</p>
          <p className="mt-1 text-body-s text-ink-500">
            I&apos;m Debbie. Let me help you find your place in the network.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(LANDING_PRIMARY_CHIP)}
        aria-label="Start a guided journey — where most visitors begin"
        className="flex w-full items-center gap-3 rounded-[var(--radius-l)] border border-gold-600/30 bg-gold-600/10 p-4 text-start transition-colors hover:bg-gold-600/15"
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-m)] bg-ink-900 text-gold-400">
          <DebbieFace state="idle" animated={false} className="h-6 w-6" />
        </span>
        <span className="flex-1">
          <span className="block text-body-m font-semibold text-ink-900">Start a guided journey</span>
          <span className="block text-caption text-ink-500">Where most visitors begin</span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-ink-500" aria-hidden />
      </button>

      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-ink-100" />
        <span className="text-caption text-ink-500">or explore</span>
        <span className="h-px flex-1 bg-ink-100" />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {LANDING_SECONDARY.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelect(item.chip)}
              aria-label={item.label}
              className="flex flex-col items-center gap-2 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 px-3 py-4 text-center transition-colors hover:border-gold-600 hover:bg-gold-600/5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-600/10 text-gold-hover">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-body-s font-medium text-ink-900">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
