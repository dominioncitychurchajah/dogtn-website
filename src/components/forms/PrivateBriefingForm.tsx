"use client";

import * as React from "react";
import { Lock } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

/** Concierge inquiry form for private foundations / family offices. */
export function PrivateBriefingForm() {
  const { toast } = useToast();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    toast("Request received — our stewardship concierge will be in touch.");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="border-b border-ink-100 py-2">
          <label htmlFor="pb-name" className="mb-1 block text-caption font-semibold uppercase tracking-wider text-ink-500">
            Name
          </label>
          <input
            id="pb-name"
            type="text"
            placeholder="John Doe"
            autoComplete="name"
            className="w-full bg-transparent p-0 text-body-m text-ink-900 outline-none placeholder:text-ink-300"
          />
        </div>
        <div className="border-b border-ink-100 py-2">
          <label htmlFor="pb-org" className="mb-1 block text-caption font-semibold uppercase tracking-wider text-ink-500">
            Organization
          </label>
          <input
            id="pb-org"
            type="text"
            placeholder="The Doe Family Office"
            autoComplete="organization"
            className="w-full bg-transparent p-0 text-body-m text-ink-900 outline-none placeholder:text-ink-300"
          />
        </div>
      </div>
      <div className="border-b border-ink-100 py-2">
        <label htmlFor="pb-context" className="mb-1 block text-caption font-semibold uppercase tracking-wider text-ink-500">
          Inquiry Context
        </label>
        <textarea
          id="pb-context"
          rows={2}
          placeholder="Briefly describe your stewardship vision…"
          className="w-full resize-none bg-transparent p-0 text-body-m text-ink-900 outline-none placeholder:text-ink-300"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-[var(--radius-m)] bg-ink-900 px-10 py-4 text-caption font-semibold uppercase tracking-widest text-paper-0 transition-opacity hover:opacity-90"
      >
        Request Private Briefing
        <Lock className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );
}
