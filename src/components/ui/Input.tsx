"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 px-4 py-3 text-body-m text-ink-900 placeholder:text-ink-300 transition-colors focus:border-gold-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 disabled:opacity-50";

function Label({ htmlFor, children, required }: { htmlFor?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-body-s font-semibold text-ink-700">
      {children}
      {required && <span className="text-flame-600"> *</span>}
    </label>
  );
}

interface FieldWrap {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  FieldWrap & React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ label, hint, error, required, id, className, ...props }, ref) {
  const fid = id ?? props.name;
  return (
    <div>
      {label && <Label htmlFor={fid} required={required}>{label}</Label>}
      <input
        id={fid}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${fid}-err` : hint ? `${fid}-hint` : undefined}
        className={cn(fieldBase, error && "border-error-600", className)}
        {...props}
      />
      {hint && !error && <p id={`${fid}-hint`} className="mt-1 text-caption text-ink-500">{hint}</p>}
      {error && <p id={`${fid}-err`} className="mt-1 text-caption text-error-600">{error}</p>}
    </div>
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  FieldWrap & React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, hint, error, required, id, className, ...props }, ref) {
  const fid = id ?? props.name;
  return (
    <div>
      {label && <Label htmlFor={fid} required={required}>{label}</Label>}
      <textarea
        id={fid}
        ref={ref}
        aria-invalid={!!error}
        className={cn(fieldBase, "min-h-28 resize-y", error && "border-error-600", className)}
        {...props}
      />
      {hint && !error && <p className="mt-1 text-caption text-ink-500">{hint}</p>}
      {error && <p className="mt-1 text-caption text-error-600">{error}</p>}
    </div>
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  FieldWrap & React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ label, hint, error, required, id, className, children, ...props }, ref) {
  const fid = id ?? props.name;
  return (
    <div>
      {label && <Label htmlFor={fid} required={required}>{label}</Label>}
      <select
        id={fid}
        ref={ref}
        aria-invalid={!!error}
        className={cn(fieldBase, "appearance-none bg-[length:16px] pr-10", error && "border-error-600", className)}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234A5872' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
        }}
        {...props}
      >
        {children}
      </select>
      {hint && !error && <p className="mt-1 text-caption text-ink-500">{hint}</p>}
      {error && <p className="mt-1 text-caption text-error-600">{error}</p>}
    </div>
  );
});
