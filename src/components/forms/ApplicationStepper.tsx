"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CloudUpload, Send } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  storyResponsibility: string;
  storyMotivation: string;
  storyFormation: string;
  ref1Name: string;
  ref1Email: string;
  ref2Name: string;
  ref2Email: string;
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  storyResponsibility: "",
  storyMotivation: "",
  storyFormation: "",
  ref1Name: "",
  ref1Email: "",
  ref2Name: "",
  ref2Email: "",
};

const STEP_LABELS = ["Profile", "Story", "References", "Review"];

const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldKey = keyof FormState;

export function ApplicationStepper({
  slug,
  trackName,
  locale,
}: {
  slug: string;
  trackName: string;
  locale: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const storageKey = `dogtn-application-${slug}`;

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<FormState>(EMPTY);
  const [errors, setErrors] = React.useState<Partial<Record<FieldKey, string>>>({});
  const [saved, setSaved] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  // Load persisted state on mount.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setForm({ ...EMPTY, ...(JSON.parse(raw) as Partial<FormState>) });
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, [storageKey]);

  // Autosave (mock) — persist to localStorage after hydration.
  React.useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    setSaved(false);
    const id = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(form));
        setSaved(true);
      } catch {
        /* storage unavailable */
      }
    }, 600);
    return () => window.clearTimeout(id);
  }, [form, hydrated, storageKey]);

  function update(key: FieldKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function validateStep(current: number): Partial<Record<FieldKey, string>> {
    const e: Partial<Record<FieldKey, string>> = {};
    if (current === 0) {
      if (!form.fullName.trim()) e.fullName = "Full name is required.";
      if (!form.email.trim()) e.email = "Email is required.";
      else if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
      if (!form.phone.trim()) e.phone = "Phone number is required.";
      if (!form.country.trim()) e.country = "Select your country.";
    } else if (current === 1) {
      if (!form.storyResponsibility.trim()) e.storyResponsibility = "Please share your leadership responsibility.";
      if (!form.storyMotivation.trim()) e.storyMotivation = "Please tell us why you are applying.";
    } else if (current === 2) {
      if (!form.ref1Name.trim()) e.ref1Name = "Reference name is required.";
      if (!form.ref1Email.trim()) e.ref1Email = "Reference email is required.";
      else if (!EMAIL_RE.test(form.ref1Email)) e.ref1Email = "Enter a valid email address.";
      if (!form.ref2Name.trim()) e.ref2Name = "Reference name is required.";
      if (!form.ref2Email.trim()) e.ref2Email = "Reference email is required.";
      else if (!EMAIL_RE.test(form.ref2Email)) e.ref2Email = "Enter a valid email address.";
    }
    return e;
  }

  function focusFirstError(e: Partial<Record<FieldKey, string>>) {
    const first = Object.keys(e)[0];
    if (first && typeof document !== "undefined") {
      const el = document.getElementById(first) as HTMLElement | null;
      el?.focus();
    }
  }

  function goNext() {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      focusFirstError(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 3));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit() {
    // Validate all input steps before submit.
    for (const s of [0, 1, 2]) {
      const e = validateStep(s);
      if (Object.keys(e).length > 0) {
        setErrors(e);
        setStep(s);
        setTimeout(() => focusFirstError(e), 50);
        return;
      }
    }
    toast("Application submitted");
    router.push(`/${locale}/mentorship/${slug}/status`);
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Autosave badge */}
      <div className="mb-6 flex items-center justify-end">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-semibold",
            saved
              ? "border-verd-600/25 bg-verd-600/12 text-verd-600"
              : "border-ink-100 bg-paper-50 text-ink-500",
          )}
          aria-live="polite"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              saved ? "bg-verd-600" : "bg-ink-300 pulse-live",
            )}
            aria-hidden
          />
          {saved ? "Saved" : "Autosaving"}
        </span>
      </div>

      {/* Step indicator */}
      <ol className="mb-10 grid grid-cols-4 gap-2">
        {STEP_LABELS.map((label, i) => {
          const state = i < step ? "done" : i === step ? "active" : "todo";
          return (
            <li key={label} className="flex flex-col items-center gap-2 text-center">
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-body-m font-semibold transition-colors",
                  state === "done" && "border-gold-600 bg-gold-600 text-ink-900",
                  state === "active" && "border-gold-600 bg-gold-600 text-ink-900",
                  state === "todo" && "border-ink-100 bg-paper-0 text-ink-500",
                )}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "done" ? <Check className="h-5 w-5" aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-body-s font-medium",
                  state === "todo" ? "text-ink-500" : "text-ink-900",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Content card */}
      <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 shadow-elev-1 lg:p-10">
        {/* STEP 1: PROFILE */}
        {step === 0 && (
          <section>
            <div className="mb-8 border-b border-ink-100 pb-4">
              <h2 className="text-heading-3 text-ink-900">Personal foundations</h2>
              <p className="mt-1 text-body-m text-ink-500">
                Applying to the {trackName} track. Tell us how to reach you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                id="fullName"
                name="fullName"
                label="Full name"
                required
                autoComplete="name"
                value={form.fullName}
                error={errors.fullName}
                onChange={(e) => update("fullName", e.target.value)}
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="Email address"
                required
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={(e) => update("email", e.target.value)}
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                label="Phone number"
                required
                autoComplete="tel"
                value={form.phone}
                error={errors.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              <Select
                id="country"
                name="country"
                label="Country of residence"
                required
                value={form.country}
                error={errors.country}
                onChange={(e) => update("country", e.target.value)}
              >
                <option value="">Select a country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
          </section>
        )}

        {/* STEP 2: STORY */}
        {step === 1 && (
          <section>
            <div className="mb-8 border-b border-ink-100 pb-4">
              <h2 className="text-heading-3 text-ink-900">Leadership narrative</h2>
              <p className="mt-1 text-body-m text-ink-500">
                Your story defines your potential for mentorship alignment.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <Textarea
                id="storyResponsibility"
                name="storyResponsibility"
                label="Tell us about your current leadership responsibility"
                required
                rows={4}
                value={form.storyResponsibility}
                error={errors.storyResponsibility}
                onChange={(e) => update("storyResponsibility", e.target.value)}
              />
              <Textarea
                id="storyMotivation"
                name="storyMotivation"
                label="Why are you applying for this cohort?"
                required
                rows={4}
                value={form.storyMotivation}
                error={errors.storyMotivation}
                onChange={(e) => update("storyMotivation", e.target.value)}
              />
              <Textarea
                id="storyFormation"
                name="storyFormation"
                label="What specific area needs formation? (optional)"
                hint="Identify your growth edges — where do you most want to be stretched?"
                rows={4}
                value={form.storyFormation}
                error={errors.storyFormation}
                onChange={(e) => update("storyFormation", e.target.value)}
              />
            </div>
          </section>
        )}

        {/* STEP 3: REFERENCES */}
        {step === 2 && (
          <section>
            <div className="mb-8 border-b border-ink-100 pb-4">
              <h2 className="text-heading-3 text-ink-900">Institutional validation</h2>
              <p className="mt-1 text-body-m text-ink-500">
                Provide two references who can attest to your character and leadership.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <legend className="mb-3 text-body-s font-semibold uppercase tracking-wide text-ink-500">
                  Reference one
                </legend>
                <Input
                  id="ref1Name"
                  name="ref1Name"
                  label="Reference name"
                  required
                  value={form.ref1Name}
                  error={errors.ref1Name}
                  onChange={(e) => update("ref1Name", e.target.value)}
                />
                <Input
                  id="ref1Email"
                  name="ref1Email"
                  type="email"
                  label="Reference email"
                  required
                  value={form.ref1Email}
                  error={errors.ref1Email}
                  onChange={(e) => update("ref1Email", e.target.value)}
                />
              </fieldset>
              <fieldset className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <legend className="mb-3 text-body-s font-semibold uppercase tracking-wide text-ink-500">
                  Reference two
                </legend>
                <Input
                  id="ref2Name"
                  name="ref2Name"
                  label="Reference name"
                  required
                  value={form.ref2Name}
                  error={errors.ref2Name}
                  onChange={(e) => update("ref2Name", e.target.value)}
                />
                <Input
                  id="ref2Email"
                  name="ref2Email"
                  type="email"
                  label="Reference email"
                  required
                  value={form.ref2Email}
                  error={errors.ref2Email}
                  onChange={(e) => update("ref2Email", e.target.value)}
                />
              </fieldset>
              <div className="flex items-center gap-4 rounded-[var(--radius-m)] border border-dashed border-ink-100 bg-paper-50 p-6 text-body-s text-ink-500">
                <CloudUpload className="h-6 w-6 shrink-0 text-ink-300" aria-hidden />
                Recommendation letters may be requested later in the process. No upload is required now.
              </div>
            </div>
          </section>
        )}

        {/* STEP 4: REVIEW */}
        {step === 3 && (
          <section>
            <div className="mb-8 border-b border-ink-100 pb-4">
              <h2 className="text-heading-3 text-ink-900">Review &amp; submit</h2>
              <p className="mt-1 text-body-m text-ink-500">
                Confirm your details before submitting your {trackName} application.
              </p>
            </div>
            <div className="space-y-8">
              <ReviewGroup title="Profile">
                <ReviewRow label="Full name" value={form.fullName} />
                <ReviewRow label="Email" value={form.email} />
                <ReviewRow label="Phone" value={form.phone} />
                <ReviewRow label="Country" value={form.country} />
              </ReviewGroup>
              <ReviewGroup title="Story">
                <ReviewRow label="Leadership responsibility" value={form.storyResponsibility} />
                <ReviewRow label="Motivation" value={form.storyMotivation} />
                <ReviewRow label="Area for formation" value={form.storyFormation} />
              </ReviewGroup>
              <ReviewGroup title="References">
                <ReviewRow label="Reference one" value={`${form.ref1Name} · ${form.ref1Email}`} />
                <ReviewRow label="Reference two" value={`${form.ref2Name} · ${form.ref2Email}`} />
              </ReviewGroup>
            </div>
          </section>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        {step > 0 ? (
          <Button variant="secondary" onClick={goPrev}>
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <Button onClick={goNext} className="ms-auto">
            Continue
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="ms-auto">
            Submit application
            <Send className="h-4 w-4" aria-hidden />
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-body-s font-semibold uppercase tracking-wide text-gold-hover">{title}</h3>
      <dl className="divide-y divide-ink-100 rounded-[var(--radius-m)] border border-ink-100">
        {children}
      </dl>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-4 sm:flex-row sm:gap-6">
      <dt className="w-full text-body-s font-semibold text-ink-500 sm:w-1/3">{label}</dt>
      <dd className="w-full text-body-m text-ink-900 sm:w-2/3">
        {value.trim() ? value : <span className="text-ink-300">—</span>}
      </dd>
    </div>
  );
}
