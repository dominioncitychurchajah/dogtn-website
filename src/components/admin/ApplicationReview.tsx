"use client";

import * as React from "react";
import { Check, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const RUBRIC = [
  { key: "character", label: "Character & Integrity" },
  { key: "vision", label: "Vision & Purpose" },
  { key: "competence", label: "Competence & Capacity" },
  { key: "influence", label: "Influence & Relationships" },
  { key: "kingdom", label: "Kingdom Orientation" },
];

export function ApplicationReview({ id }: { id: string }) {
  const { toast } = useToast();
  const [scores, setScores] = React.useState<Record<string, number>>(
    () => Object.fromEntries(RUBRIC.map((r) => [r.key, 3])),
  );
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const pct = Math.round((total / (RUBRIC.length * 5)) * 100);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Applicant summary */}
      <div className="lg:col-span-1">
        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-600/15 text-heading-3 font-semibold text-gold-hover">
            CN
          </span>
          <h2 className="mt-4 text-heading-2 text-ink-900">Chidera Nwosu</h2>
          <p className="text-body-s text-ink-500">{id} · Ministry Leaders</p>
          <dl className="mt-5 space-y-3 border-t border-ink-100 pt-5 text-body-s">
            {[
              ["Email", "chidera.n@example.com"],
              ["Country", "Nigeria"],
              ["Current role", "Team Lead, Campus Fellowship"],
              ["Prior DLI", "DLI Basic alumnus"],
              ["Submitted", "2 July 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-ink-500">{k}</dt>
                <dd className="text-end font-medium text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scoring + decision */}
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-heading-3 text-ink-900">Scoring rubric</h3>
            <span className="rounded-full bg-ink-900 px-3 py-1 text-body-s font-semibold text-gold-400">{pct}%</span>
          </div>
          <div className="space-y-5">
            {RUBRIC.map((r) => (
              <div key={r.key}>
                <div className="mb-1 flex items-center justify-between text-body-s">
                  <label htmlFor={`rubric-${r.key}`} className="text-ink-700">{r.label}</label>
                  <span className="font-semibold text-ink-900">{scores[r.key]}/5</span>
                </div>
                <input
                  id={`rubric-${r.key}`}
                  type="range"
                  min={1}
                  max={5}
                  value={scores[r.key]}
                  onChange={(e) => setScores((s) => ({ ...s, [r.key]: Number(e.target.value) }))}
                  className="w-full accent-gold-600"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
          <Textarea label="Reviewer notes" name="notes" placeholder="Observations, references check, interview impressions…" />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast("Applicant accepted", "success")}>
            <Check className="h-4 w-4" /> Accept
          </Button>
          <Button variant="secondary" onClick={() => toast("Moved to waitlist", "info")}>
            <Clock className="h-4 w-4" /> Waitlist
          </Button>
          <Button variant="destructive" onClick={() => toast("Applicant declined", "error")}>
            <X className="h-4 w-4" /> Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
