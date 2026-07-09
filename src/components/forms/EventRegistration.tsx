"use client";

import * as React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import type { EventItem } from "@/data/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";

/**
 * Registration modal for an event. Paid events show a tier select; free events
 * show an RSVP. On submit, renders a success state with a stylized QR block.
 */
export function EventRegistration({
  event,
  trigger,
}: {
  event: EventItem;
  trigger: React.ReactNode;
}) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [name, setName] = React.useState("");

  const isPaid = event.tiers.some((t) => t.price > 0);
  const confirmationId = React.useMemo(
    () => `${event.slug.slice(0, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 8999)}`,
    [event.slug],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    toast("You're registered!", "success");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Reset after the close animation so the form is fresh next time.
      setTimeout(() => setDone(false), 250);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      title={done ? "You're registered" : `Register — ${event.title}`}
      description={
        done ? undefined : isPaid ? "Choose your pass and enter your details." : "Reserve your free spot."
      }
    >
      {done ? (
        <div className="flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-verd-600/12 text-verd-600">
            <CheckCircle2 className="h-7 w-7" aria-hidden />
          </span>
          <p className="mt-4 max-w-sm text-body-m text-ink-500">
            Your spot for <span className="font-semibold text-ink-900">{event.title}</span> is
            confirmed{name ? `, ${name.split(" ")[0]}` : ""}. We&apos;ve sent the details to your
            email — bring this pass to check in.
          </p>

          {/* Fake QR block */}
          <div className="mt-6 w-full rounded-[var(--radius-l)] border-2 border-dashed border-ink-100 bg-paper-50 p-6">
            <div className="mx-auto grid h-40 w-40 grid-cols-6 grid-rows-6 gap-1 rounded-[var(--radius-s)] bg-paper-0 p-3 shadow-elev-1">
              {Array.from({ length: 36 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    "rounded-[2px] " +
                    // Deterministic pseudo-random pattern + fixed finder corners.
                    (i === 0 || i === 5 || i === 30 || (i * 7 + 3) % 3 === 0
                      ? "bg-ink-900"
                      : "bg-transparent")
                  }
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-[0.2em] text-ink-500">
              <Sparkles className="h-3.5 w-3.5 text-gold-hover" aria-hidden />
              {confirmationId}
            </p>
          </div>

          <Button
            type="button"
            variant="secondary"
            className="mt-6 w-full"
            onClick={() => handleOpenChange(false)}
          >
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Full name"
            name="reg-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <Input label="Email" name="reg-email" type="email" required autoComplete="email" />
          <Input label="Phone" name="reg-phone" type="tel" required autoComplete="tel" />
          <Input label="Country" name="reg-country" required autoComplete="country-name" />

          {isPaid && (
            <Select label="Select a pass" name="reg-tier" required defaultValue={event.tiers[0]?.name}>
              {event.tiers.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} — {t.price === 0 ? "Free" : formatCurrency(t.price, t.currency)}
                </option>
              ))}
            </Select>
          )}

          <Button type="submit" className="mt-2 w-full">
            {isPaid ? "Register" : "Confirm free RSVP"}
          </Button>
          <p className="text-center text-caption uppercase tracking-[0.2em] text-ink-500">
            Secure institutional registration
          </p>
        </form>
      )}
    </Modal>
  );
}
