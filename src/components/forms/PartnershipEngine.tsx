"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const RHYTHMS = ["Pray", "Serve", "Connect"] as const;
const PILLARS = ["Institutional Excellence", "Legacy Vault Digitization", "Global Missions", "General Support"];

/** Partnership interest card on the Partnership page. */
export function PartnershipEngine() {
  const { toast } = useToast();
  const [rhythm, setRhythm] = React.useState<(typeof RHYTHMS)[number]>("Pray");
  const [pillar, setPillar] = React.useState(PILLARS[0]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    toast(`Thank you — your partnership interest for ${pillar} has been noted.`);
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[var(--radius-l)] border border-gold-600/20 bg-paper-0/5 p-8 backdrop-blur-md lg:p-10"
    >
      {/* Partnership rhythm */}
      <div className="mb-8">
        <label className="mb-4 block text-caption font-semibold uppercase tracking-wider text-paper-0">
          Select Partnership Path
        </label>
        <div className="grid grid-cols-3 gap-2">
          {RHYTHMS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setRhythm(f)}
              aria-pressed={rhythm === f}
              className={cn(
                "rounded-[var(--radius-s)] py-3 text-body-s font-semibold transition-all",
                rhythm === f ? "bg-gold-600 text-ink-900" : "bg-paper-0/10 text-paper-0 hover:bg-paper-0/20",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Impact pillar */}
      <div className="mb-8">
        <label htmlFor="pillar" className="mb-4 block text-caption font-semibold uppercase tracking-wider text-paper-0">
          Select Impact Pillar
        </label>
        <select
          id="pillar"
          value={pillar}
          onChange={(e) => setPillar(e.target.value)}
          className="w-full rounded-[var(--radius-s)] border border-paper-0/20 bg-paper-0/5 p-4 text-body-m text-paper-0 outline-none focus:border-gold-600 [&>option]:text-ink-900"
        >
          {PILLARS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-10">
        <label htmlFor="partnership-note" className="mb-4 block text-caption font-semibold uppercase tracking-wider text-paper-0">
          Note
        </label>
        <textarea
          id="partnership-note"
          rows={4}
          placeholder="Tell us how you would like to partner."
          className="w-full resize-none rounded-[var(--radius-s)] border border-paper-0/20 bg-paper-0/5 p-4 text-body-m text-paper-0 outline-none transition-colors placeholder:text-ink-300 focus:border-gold-600"
        />
      </div>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-3 rounded-[var(--radius-m)] bg-gold-600 py-5 text-body-m font-bold text-ink-900 transition-all hover:bg-gold-hover"
      >
        Register Partnership Interest
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
      </button>
      <p className="mt-6 text-center text-caption text-ink-300">
        Our team will follow up with the most relevant next step for your selected pillar.
      </p>
    </form>
  );
}
