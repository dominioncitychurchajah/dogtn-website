"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const FREQUENCIES = ["One-time", "Monthly", "Quarterly"] as const;
const PILLARS = ["Institutional Excellence", "Legacy Vault Digitization", "Global Missions", "General Support"];
const PRESETS = [100, 500, 1000];

/** The "Giving Engine" glass donation card on the Partnership page. */
export function PartnershipEngine() {
  const { toast } = useToast();
  const [frequency, setFrequency] = React.useState<(typeof FREQUENCIES)[number]>("One-time");
  const [pillar, setPillar] = React.useState(PILLARS[0]);
  const [amount, setAmount] = React.useState<number | null>(100);
  const [custom, setCustom] = React.useState("");

  const effective = custom !== "" && Number(custom) > 0 ? Number(custom) : amount ?? 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (effective <= 0) {
      toast("Please choose an amount to sow.", "info");
      return;
    }
    toast(
      `Thank you — $${effective.toLocaleString("en-US")} ${frequency.toLowerCase()} toward ${pillar}. Redirecting to secure checkout…`,
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[var(--radius-l)] border border-gold-600/20 bg-paper-0/5 p-8 backdrop-blur-md lg:p-10"
    >
      {/* Frequency */}
      <div className="mb-8">
        <label className="mb-4 block text-caption font-semibold uppercase tracking-wider text-paper-0">
          Select Frequency
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FREQUENCIES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              aria-pressed={frequency === f}
              className={cn(
                "rounded-[var(--radius-s)] py-3 text-body-s font-semibold transition-all",
                frequency === f ? "bg-gold-600 text-ink-900" : "bg-paper-0/10 text-paper-0 hover:bg-paper-0/20",
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

      {/* Amount */}
      <div className="mb-10">
        <label className="mb-4 block text-caption font-semibold uppercase tracking-wider text-paper-0">
          Select Amount (USD)
        </label>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {PRESETS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setAmount(v);
                setCustom("");
              }}
              aria-pressed={custom === "" && amount === v}
              className={cn(
                "rounded-[var(--radius-s)] border py-3 text-body-s font-semibold transition-all",
                custom === "" && amount === v
                  ? "border-gold-600 bg-gold-600/15 text-paper-0"
                  : "border-paper-0/20 bg-paper-0/5 text-paper-0 hover:border-gold-600",
              )}
            >
              ${v.toLocaleString("en-US")}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-300">$</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setAmount(null);
            }}
            placeholder="Custom Amount"
            aria-label="Custom amount"
            className="w-full rounded-[var(--radius-s)] border border-paper-0/20 bg-paper-0/5 p-4 ps-8 text-body-m text-paper-0 outline-none transition-colors placeholder:text-ink-300 focus:border-gold-600"
          />
        </div>
      </div>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-3 rounded-[var(--radius-m)] bg-gold-600 py-5 text-body-m font-bold text-ink-900 transition-all hover:bg-gold-hover"
      >
        Sow into the Kingdom
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden />
      </button>
      <p className="mt-6 text-center text-caption text-ink-300">
        Securely processed via Global Transformation Trust. All gifts are tax-deductible in
        accordance with local regulations.
      </p>
    </form>
  );
}
