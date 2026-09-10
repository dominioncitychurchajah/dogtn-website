"use client";

/** Thin determinate-looking bar shown while a form submission is in flight. */
export function SubmitProgress({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="rounded-xl bg-[#F8FAFC] p-4" role="status" aria-live="polite">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-[#0A192F]">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-[#C9A227]">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full bg-[#C9A227] transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
