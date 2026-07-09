import { Check } from "lucide-react";
import type { Stage } from "@/data/types";
import { cn } from "@/lib/utils";

const STAGES: Stage[] = ["Visitor", "Learner", "Disciple", "Leader", "Mentor", "Nation Builder"];

export function JourneyLadder({
  current,
  className,
  orientation = "horizontal",
}: {
  current: Stage;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const currentIndex = STAGES.indexOf(current);

  return (
    <ol
      className={cn(
        "flex gap-2",
        orientation === "vertical" ? "flex-col" : "flex-col sm:flex-row sm:items-center",
        className,
      )}
      aria-label="Transformation ladder"
    >
      {STAGES.map((stage, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={stage} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-9 w-9 shrink-0 place-items-center rounded-full text-body-s font-semibold",
                done && "bg-verd-600 text-paper-0",
                active && "bg-gold-600 text-ink-900 ring-4 ring-gold-600/25",
                !done && !active && "bg-ink-100 text-ink-500",
              )}
              aria-current={active ? "step" : undefined}
            >
              {done ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={cn(
                "text-body-s",
                active ? "font-semibold text-ink-900" : "text-ink-500",
              )}
            >
              {stage}
            </span>
            {orientation === "horizontal" && i < STAGES.length - 1 && (
              <span className="hidden h-px flex-1 bg-ink-100 sm:block" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
