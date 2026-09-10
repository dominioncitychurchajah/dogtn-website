"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REGISTRATION_ENDPOINT } from "@/lib/registration";
import type { EventItem } from "@/data/types";
import { useSubmitProgress } from "@/components/forms/useSubmitProgress";
import { SubmitProgress } from "@/components/forms/SubmitProgress";

const field =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12";
const label = "mb-2 block text-sm font-semibold text-[#0A192F]";
const errorText = "mt-1.5 text-sm text-[#B42318]";

type Status = "idle" | "submitting" | "success" | "error" | "unconfirmed";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ponytail: English-only copy for v1, matching the DLI page's precedent. The
// form is reachable from every locale; translate when a translator is available.
export function EventRegistrationForm({ event }: { event: EventItem }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [message, setMessage] = React.useState("");
  const pct = useSubmitProgress(status === "submitting", status === "success");

  function validate(data: Record<string, string>) {
    const e: Record<string, string> = {};
    if (!data.fullName.trim()) e.fullName = "Please enter your name.";
    if (!EMAIL.test(data.email.trim())) e.email = "Please enter a valid email address.";
    if (!data.phone.trim()) e.phone = "Please enter a phone number so we can reach you.";
    if (!data.country.trim()) e.country = "Please enter your country.";
    const seats = Number(data.seats);
    if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
      e.seats = "Enter a number of seats between 1 and 20.";
    }
    return e;
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Honeypot: real people leave this hidden field empty.
    if (data.website) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    if (!REGISTRATION_ENDPOINT) {
      setStatus("error");
      setMessage("Registration is not connected yet. Please try again shortly.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        // text/plain avoids a CORS preflight, which Apps Script does not answer.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          seats: Number(data.seats),
          eventSlug: event.slug,
          eventTitle: event.title,
          submittedAt: new Date().toISOString(),
        }),
      });
      const out = await res.json().catch(() => ({ ok: res.ok }));
      if (out.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage("We could not complete your registration. Please try again, or call +234 803 550 8230.");
      }
    } catch {
      // The row is written and the mail sent before the response returns, so a
      // response we cannot read is not a registration that failed. Saying
      // "error" here would invite a duplicate booking.
      setStatus("unconfirmed");
      setMessage(
        "Your details were sent, but we did not get a confirmation back. Check your email before trying again, so you are not registered twice.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#C9A227]/30 bg-[#C9A227]/10 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#C9A227]" />
        <h3 className="font-serif text-2xl leading-tight text-[#0A192F]">
          You&rsquo;re registered
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">
          A confirmation is on its way to your inbox. We look forward to seeing you at{" "}
          {event.title}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div>
        <label className={label} htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" className={field} autoComplete="name"
          aria-invalid={!!errors.fullName} />
        {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={field} autoComplete="email"
            aria-invalid={!!errors.email} />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone (WhatsApp if possible)</label>
          <input id="phone" name="phone" type="tel" className={field} autoComplete="tel"
            aria-invalid={!!errors.phone} />
          {errors.phone && <p className={errorText}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="country">Country</label>
          <input id="country" name="country" className={field} autoComplete="country-name"
            aria-invalid={!!errors.country} />
          {errors.country && <p className={errorText}>{errors.country}</p>}
        </div>
        <div>
          <label className={label} htmlFor="seats">How many seats?</label>
          <input id="seats" name="seats" type="number" min={1} max={20} defaultValue={1}
            className={field} aria-invalid={!!errors.seats} />
          {errors.seats && <p className={errorText}>{errors.seats}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={label}>
          Would you like to serve on the workforce at this event?
        </legend>
        <div className="flex flex-wrap gap-4">
          {([
            ["yes", "Yes, count me in"],
            ["maybe", "Maybe, tell me more"],
            ["no", "Not this time"],
          ] as const).map(([value, text], i) => (
            <label key={value} className="flex items-center gap-2 text-[15px] text-[#4B5563]">
              <input type="radio" name="volunteer" value={value} defaultChecked={i === 2}
                className="h-4 w-4 accent-[#C9A227]" />
              {text}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={label} htmlFor="volunteerAreas">
          Where would you like to serve? <span className="font-normal text-[#6B7280]">(optional)</span>
        </label>
        <input id="volunteerAreas" name="volunteerAreas" className={field}
          placeholder="Ushering, media, protocol, choir, logistics…" />
      </div>

      {(status === "error" || status === "unconfirmed") && (
        <p
          role="alert"
          className={`flex items-start gap-2 rounded-xl p-4 text-sm ${
            status === "unconfirmed"
              ? "bg-[#FFFAEB] text-[#B54708]"
              : "bg-[#FEF3F2] text-[#B42318]"
          }`}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {message}
        </p>
      )}

      {status === "submitting" ? (
        <SubmitProgress pct={pct} label="Registering…" />
      ) : (
        <Button type="submit" size="l" className="w-full">
          Register for this event
        </Button>
      )}

      <p className="text-center text-xs leading-relaxed text-[#6B7280]">
        We use your details only to contact you about {event.title}.
      </p>
    </form>
  );
}
