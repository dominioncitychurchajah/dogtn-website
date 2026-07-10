"use client";

import * as React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const TIERS = [
  { id: "ga", name: "General Access", desc: "Standard seating and event materials." },
  { id: "leader", name: "Institutional Leader", desc: "Reserved arrival support for senior leaders and guests." },
  { id: "group", name: "Group Delegates", desc: "Shared seating block for groups of 10 or more." },
];

export function ForumRegistration() {
  const [tierId, setTierId] = React.useState("ga");
  const [open, setOpen] = React.useState(false);

  const tier = TIERS.find((t) => t.id === tierId)!;

  return (
    <div className="lg:sticky lg:top-28">
      <div className="flex flex-col gap-8 rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-8 shadow-elev-3">
        <div className="flex items-center justify-between border-b border-ink-100 pb-6">
          <h3 className="text-heading-3 text-ink-900">Registration</h3>
          <span className="rounded-[var(--radius-s)] bg-verd-600/10 px-3 py-1 text-caption font-semibold uppercase tracking-wider text-verd-700">
            Free
          </span>
        </div>

        {/* Tiers */}
        <div className="flex flex-col gap-4">
          {TIERS.map((t) => {
            const active = t.id === tierId;
            return (
              <label
                key={t.id}
                className={cn(
                  "flex cursor-pointer items-center rounded-[var(--radius-m)] border p-4 transition-colors",
                  active ? "border-gold-600 bg-gold-600/5" : "border-ink-100 hover:border-gold-600/50",
                )}
              >
                <input
                  type="radio"
                  name="tier"
                  checked={active}
                  onChange={() => setTierId(t.id)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "me-4 flex h-5 w-5 items-center justify-center rounded-full border-2",
                    active ? "border-gold-600 bg-gold-600" : "border-ink-300",
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full bg-paper-0", active ? "opacity-100" : "opacity-0")} />
                </span>
                <span className="flex-1">
                  <span className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-ink-900">{t.name}</span>
                    <span className="font-display text-heading-3 text-ink-900">Free</span>
                  </span>
                  <span className="block text-body-s text-ink-500">{t.desc}</span>
                </span>
              </label>
            );
          })}
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-3 rounded-[var(--radius-m)] bg-paper-50 p-6">
          <div className="flex justify-between text-body-s text-ink-700">
            <span>Selected pass</span>
            <span>{tier.name}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-ink-100 pt-3 text-body-l font-bold text-ink-900">
            <span>Participant access</span>
            <span className="text-verd-700">Free</span>
          </div>
        </div>

        <Button onClick={() => setOpen(true)} size="l" className="w-full">
          Register Now
        </Button>
        <p className="text-center text-caption uppercase tracking-widest text-ink-500">
          Free institutional registration
        </p>
      </div>

      {/* Success modal */}
      <Modal open={open} onOpenChange={setOpen} title="Registration Confirmed" description="Your delegate itinerary is on its way.">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-verd-600/12 text-verd-600">
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </span>
          <p className="mt-4 max-w-sm text-body-m text-ink-500">
            Your transformation journey begins now. We&apos;ve sent your official delegate itinerary
            to your registered email.
          </p>

          <div className="mt-6 w-full rounded-[var(--radius-l)] border-2 border-dashed border-ink-100 bg-paper-50 p-6">
            <div className="mb-6 flex items-start justify-between">
              <div className="text-start">
                <span className="block text-caption uppercase tracking-widest text-ink-500">Pass Type</span>
                <span className="text-body-l font-semibold text-ink-900">{tier.name}</span>
              </div>
              <div className="text-end">
                <span className="block text-caption uppercase tracking-widest text-ink-500">Access</span>
                <span className="text-body-l font-semibold text-verd-700">Free</span>
              </div>
            </div>
            <div className="mx-auto grid h-32 w-32 grid-cols-6 grid-rows-6 gap-1 rounded-[var(--radius-s)] bg-paper-0 p-3 shadow-elev-1">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className={cn("rounded-[2px]", (i * 7 + 3) % 3 === 0 || i === 0 || i === 5 || i === 30 ? "bg-ink-900" : "bg-transparent")}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-ink-500">
              <Sparkles className="h-3.5 w-3.5 text-gold-hover" aria-hidden /> GLF-2026-X892-LQ
            </p>
          </div>

          <Button variant="secondary" className="mt-6 w-full" onClick={() => setOpen(false)}>
            Close Preview
          </Button>
        </div>
      </Modal>
    </div>
  );
}
