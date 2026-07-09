"use client";

import * as React from "react";
import { Play, Headphones, BookOpen, Check, CircleDot } from "lucide-react";
import type { Journey } from "@/data/types";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const typeIcon = { video: Play, audio: Headphones, reading: BookOpen };

export function JourneyPlayerClient({ journey, poster }: { journey: Journey; poster: string }) {
  const { toast } = useToast();
  const [activeId, setActiveId] = React.useState(journey.modules[0]?.id);
  const [completed, setCompleted] = React.useState<Set<string>>(
    () => new Set(journey.modules.filter((m) => m.completed).map((m) => m.id)),
  );

  const active = journey.modules.find((m) => m.id === activeId) ?? journey.modules[0];
  const doneCount = completed.size;
  const pct = (doneCount / journey.modules.length) * 100;

  function markComplete() {
    if (!active) return;
    setCompleted((prev) => new Set(prev).add(active.id));
    toast("Module complete — keep going!");
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
      {/* Player pane */}
      <div className="lg:col-span-2">
        <VideoPlayer poster={poster} title={active?.title} />
        <div className="mt-6">
          <span className="text-caption font-semibold uppercase tracking-wider text-gold-hover">
            {journey.title}
          </span>
          <h1 className="mt-1 text-heading-1 text-ink-900">{active?.title}</h1>
          <p className="mt-3 measure text-body-l text-ink-500">{journey.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <Button onClick={markComplete} disabled={active ? completed.has(active.id) : false}>
              {active && completed.has(active.id) ? (
                <>
                  <Check className="h-4 w-4" /> Completed
                </>
              ) : (
                "Mark as complete"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Module list */}
      <aside className="lg:col-span-1">
        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-5">
          <div className="mb-4">
            <p className="text-body-s font-semibold text-ink-900">
              {doneCount} of {journey.modules.length} modules
            </p>
            <ProgressBar value={pct} className="mt-2" tone="verd" label="Journey progress" />
          </div>
          <ul className="space-y-1">
            {journey.modules.map((m, i) => {
              const Icon = typeIcon[m.type];
              const isDone = completed.has(m.id);
              const isActive = m.id === activeId;
              return (
                <li key={m.id}>
                  <button
                    onClick={() => setActiveId(m.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[var(--radius-m)] px-3 py-3 text-start transition-colors",
                      isActive ? "bg-paper-50 ring-1 ring-gold-600/30" : "hover:bg-paper-50",
                    )}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                        isDone ? "bg-verd-600 text-paper-0" : "bg-ink-100 text-ink-500",
                      )}
                    >
                      {isDone ? <Check className="h-4 w-4" /> : isActive ? <CircleDot className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-body-s font-medium text-ink-900">{m.title}</span>
                      <span className="inline-flex items-center gap-1 text-caption text-ink-500">
                        <Icon className="h-3 w-3" /> {m.type} · {m.durationMin}m
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
