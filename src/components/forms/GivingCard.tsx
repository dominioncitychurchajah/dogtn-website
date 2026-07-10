"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { giveCopy } from "@/i18n/pages/give";

type Currency = "USD" | "GBP" | "EUR" | "NGN";
type Frequency = "one-time" | "monthly";

const SYMBOL: Record<Currency, string> = { USD: "$", GBP: "£", EUR: "€", NGN: "₦" };
const FLAG: Record<Currency, string> = { USD: "🇺🇸", GBP: "🇬🇧", EUR: "🇪🇺", NGN: "🇳🇬" };
const PRESETS: Record<Currency, number[]> = {
  USD: [5, 10, 25, 50],
  GBP: [5, 10, 25, 50],
  EUR: [5, 10, 25, 50],
  NGN: [2500, 5000, 10000, 25000],
};

export function GivingCard({ locale }: { locale: Locale }) {
  const { toast } = useToast();
  const c = giveCopy[locale];
  const FUNDS = c.funds;

  const [fund, setFund] = React.useState(FUNDS[0]);
  const [frequency, setFrequency] = React.useState<Frequency>("one-time");
  const [currency, setCurrency] = React.useState<Currency>("USD");
  const [amount, setAmount] = React.useState<number | null>(null);
  const [custom, setCustom] = React.useState("");

  const presets = PRESETS[currency];
  const symbol = SYMBOL[currency];

  function switchCurrency(next: Currency) {
    setCurrency(next);
    setAmount(null);
    setCustom("");
  }
  function selectPreset(v: number) {
    setAmount(v);
    setCustom("");
  }
  function onCustom(raw: string) {
    setCustom(raw);
    setAmount(null);
  }

  const effective = custom !== "" && Number(custom) > 0 ? Number(custom) : amount ?? 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (effective <= 0) {
      toast(c.toastChooseAmount, "info");
      return;
    }
    const freqLabel = frequency === "monthly" ? c.toastFreqMonthly : c.toastFreqOneTime;
    toast(
      c.toastThankYou
        .replace("{amount}", `${symbol}${effective.toLocaleString("en-US")}`)
        .replace("{frequency}", freqLabel)
        .replace("{fund}", fund),
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto w-full max-w-[560px] rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-2 md:p-12"
    >
      {/* Fund selector */}
      <fieldset className="mb-8">
        <legend className="mb-4 block text-caption font-semibold uppercase tracking-wider text-ink-500">
          {c.selectFund}
        </legend>
        <div className="flex flex-wrap gap-2">
          {FUNDS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFund(f)}
              aria-pressed={fund === f}
              className={cn(
                "rounded-full border px-4 py-2 text-body-s font-semibold transition-all",
                fund === f
                  ? "border-gold-600 bg-gold-600/10 text-gold-hover"
                  : "border-ink-100 text-ink-500 hover:border-gold-600/50",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Frequency toggle */}
      <div className="mb-8 flex gap-1 rounded-[var(--radius-m)] bg-paper-50 p-1">
        <button
          type="button"
          onClick={() => setFrequency("one-time")}
          aria-pressed={frequency === "one-time"}
          className={cn(
            "flex-1 rounded-[var(--radius-s)] py-2.5 text-body-s font-semibold transition-all",
            frequency === "one-time" ? "bg-paper-0 text-ink-900 shadow-elev-1" : "text-ink-500 hover:text-ink-900",
          )}
        >
          {c.oneTime}
        </button>
        <button
          type="button"
          onClick={() => setFrequency("monthly")}
          aria-pressed={frequency === "monthly"}
          className={cn(
            "relative flex-1 rounded-[var(--radius-s)] py-2.5 text-body-s font-semibold transition-all",
            frequency === "monthly" ? "bg-paper-0 text-ink-900 shadow-elev-1" : "text-ink-500 hover:text-ink-900",
          )}
        >
          {c.monthly}
          <span className="absolute -right-1.5 -top-2 rounded-full bg-gold-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-900">
            {c.impactBadge}
          </span>
        </button>
      </div>

      {/* Amount presets */}
      <fieldset className="mb-6">
        <legend className="mb-4 block text-caption font-semibold uppercase tracking-wider text-ink-500">
          {c.selectAmount} ({currency})
        </legend>
        <div className="grid grid-cols-4 gap-3">
          {presets.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => selectPreset(v)}
              aria-pressed={custom === "" && amount === v}
              className={cn(
                "rounded-[var(--radius-m)] border py-3 text-body-m font-bold transition-all",
                custom === "" && amount === v
                  ? "border-gold-600 bg-gold-600/10 text-ink-900"
                  : "border-ink-100 text-ink-700 hover:border-gold-600/50 hover:bg-gold-600/5",
              )}
            >
              {symbol}
              {v.toLocaleString("en-US")}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Custom amount + currency */}
      <div className="mb-8 flex items-end gap-3">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute bottom-3 start-0 font-bold text-ink-500">{symbol}</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={custom}
            onChange={(e) => onCustom(e.target.value)}
            placeholder={c.otherAmount}
            aria-label={c.otherAmount}
            className="w-full border-b border-ink-300 bg-transparent py-3 ps-6 text-body-l text-ink-900 transition-colors placeholder:text-ink-300 focus:border-gold-600 focus:outline-none"
          />
        </div>
        <div className="relative min-w-[120px]">
          <select
            value={currency}
            onChange={(e) => switchCurrency(e.target.value as Currency)}
            aria-label="Currency"
            className="w-full appearance-none rounded-[var(--radius-m)] border-none bg-paper-50 py-3.5 ps-4 pe-9 text-body-s font-semibold text-ink-900 focus:outline-none"
          >
            {(Object.keys(SYMBOL) as Currency[]).map((c) => (
              <option key={c} value={c}>
                {FLAG[c]} {c}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-ink-500">▾</span>
        </div>
      </div>

      {/* Receipt email */}
      <div className="mb-10">
        <label htmlFor="receipt-email" className="mb-2 block text-caption font-semibold uppercase tracking-wider text-ink-500">
          {c.receiptEmail}
        </label>
        <input
          id="receipt-email"
          type="email"
          placeholder="email@example.com"
          className="w-full border-b border-ink-300 bg-transparent py-3 text-body-m text-ink-900 transition-colors placeholder:text-ink-300 focus:border-gold-600 focus:outline-none"
        />
      </div>

      {/* CTA */}
      <Button type="submit" size="l" className="w-full">
        {c.continueSecurely}
        <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden />
      </Button>
      <p className="mt-6 text-center text-caption leading-relaxed text-ink-500">
        {c.termsPrefix}{" "}
        <a href="#" className="underline">
          {c.termsLink}
        </a>{" "}
        {c.termsSuffix}
      </p>
    </form>
  );
}

export default GivingCard;
