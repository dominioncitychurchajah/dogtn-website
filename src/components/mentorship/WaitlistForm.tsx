"use client";

import * as React from "react";
import { CheckCircle2, Loader2, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REGISTRATION_ENDPOINT, CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/lib/registration";
import type { WaitlistCopy } from "@/i18n/pages/waitlist";

const field =
  "w-full rounded-xl border-[1.5px] border-[#E2E8F0] bg-white px-4 py-3.5 text-[15px] focus:border-[#C9A227] focus:outline-none focus:ring-[3px] focus:ring-[#C9A227]/12";
const label = "mb-2 block text-sm font-semibold text-[#0A192F]";
const errorText = "mt-1.5 text-sm text-[#B42318]";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({
  c,
  tracks,
  defaultTrack,
}: {
  c: WaitlistCopy;
  tracks: { slug: string; name: string }[];
  defaultTrack?: string;
}) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (data.website) return; // honeypot

    const found: Record<string, string> = {};
    if (!data.fullName.trim()) found.fullName = c.fullName;
    if (!EMAIL.test(data.email.trim())) found.email = c.email;
    if (!data.phone.trim()) found.phone = c.phone;
    if (!data.country.trim()) found.country = c.country;
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          type: "waitlist",
          trackName: tracks.find((t) => t.slug === data.track)?.name ?? c.trackNoPreference,
          submittedAt: new Date().toISOString(),
        }),
      });
      const out = await res.json().catch(() => ({ ok: res.ok }));
      if (!out.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#C9A227]/30 bg-[#C9A227]/10 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-[#C9A227]" />
        <h3 className="font-serif text-2xl leading-tight text-[#0A192F]">{c.successTitle}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4B5563]">{c.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0" />

      <div>
        <label className={label} htmlFor="wl-name">{c.fullName}</label>
        <input id="wl-name" name="fullName" className={field} autoComplete="name" aria-invalid={!!errors.fullName} />
        {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="wl-email">{c.email}</label>
          <input id="wl-email" name="email" type="email" className={field} autoComplete="email" aria-invalid={!!errors.email} />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="wl-phone">{c.phone}</label>
          <input id="wl-phone" name="phone" type="tel" className={field} autoComplete="tel" aria-invalid={!!errors.phone} />
          {errors.phone && <p className={errorText}>{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="wl-country">{c.country}</label>
          <input id="wl-country" name="country" className={field} autoComplete="country-name" aria-invalid={!!errors.country} />
          {errors.country && <p className={errorText}>{errors.country}</p>}
        </div>
        <div>
          <label className={label} htmlFor="wl-track">{c.track}</label>
          <select id="wl-track" name="track" defaultValue={defaultTrack ?? ""} className={field}>
            <option value="">{c.trackNoPreference}</option>
            {tracks.map((t) => (
              <option key={t.slug} value={t.slug}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="wl-role">
          {c.currentRole} <span className="font-normal text-[#6B7280]">({c.currentRoleOptional})</span>
        </label>
        <input id="wl-role" name="currentRole" className={field} />
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-[#FEF3F2] p-4 text-sm text-[#B42318]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {c.errorBody}{" "}
            <a href={`tel:${CONTACT_PHONE}`} className="font-semibold underline">{CONTACT_PHONE_DISPLAY}</a>
          </span>
        </p>
      )}

      <Button type="submit" size="l" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {c.submitting}</>
        ) : (
          c.submit
        )}
      </Button>

      <a href={`tel:${CONTACT_PHONE}`}
        className="flex items-center justify-center gap-2 text-[14px] font-semibold text-[#0A192F] hover:text-[#C9A227]">
        <Phone className="h-4 w-4" aria-hidden />
        {c.speakToSomeone}
      </a>

      <p className="text-center text-xs leading-relaxed text-[#6B7280]">{c.privacy}</p>
    </form>
  );
}
