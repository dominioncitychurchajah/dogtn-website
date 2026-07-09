"use client";

import Link from "next/link";
import { GripVertical } from "lucide-react";

interface Applicant {
  id: string;
  name: string;
  track: string;
  country: string;
  score?: number;
}

const COLUMNS: { key: string; label: string; tone: string }[] = [
  { key: "submitted", label: "Submitted", tone: "bg-info-600" },
  { key: "review", label: "In Review", tone: "bg-gold-600" },
  { key: "interview", label: "Interview", tone: "bg-flame-600" },
  { key: "accepted", label: "Accepted", tone: "bg-verd-600" },
  { key: "waitlist", label: "Waitlist", tone: "bg-ink-300" },
  { key: "declined", label: "Declined", tone: "bg-error-600" },
];

const APPLICANTS: Record<string, Applicant[]> = {
  submitted: [
    { id: "APP-1042", name: "Chidera Nwosu", track: "Emerging Leaders", country: "Nigeria" },
    { id: "APP-1043", name: "Grace Mensah", track: "Young Professionals", country: "Ghana" },
    { id: "APP-1044", name: "Samuel Kimani", track: "Ministry Leaders", country: "Kenya" },
  ],
  review: [
    { id: "APP-1039", name: "Tunde Bakare", track: "Ministry Leaders", country: "Nigeria", score: 82 },
    { id: "APP-1040", name: "Amara Okafor", track: "Nation Builders", country: "UK", score: 74 },
  ],
  interview: [
    { id: "APP-1035", name: "David Adeyemi", track: "Nation Builders", country: "Nigeria", score: 91 },
  ],
  accepted: [
    { id: "APP-1030", name: "Ruth Eze", track: "Emerging Leaders", country: "Nigeria", score: 88 },
    { id: "APP-1031", name: "Peter Mwangi", track: "Young Professionals", country: "Kenya", score: 85 },
  ],
  waitlist: [{ id: "APP-1028", name: "Joy Bello", track: "Emerging Leaders", country: "Nigeria", score: 63 }],
  declined: [{ id: "APP-1021", name: "Anon Applicant", track: "Ministry Leaders", country: "USA", score: 41 }],
};

export function KanbanBoard({ locale }: { locale: string }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((col) => {
        const cards = APPLICANTS[col.key] ?? [];
        return (
          <div key={col.key} className="flex w-72 shrink-0 flex-col rounded-[var(--radius-l)] bg-paper-50 p-3">
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className={`h-2.5 w-2.5 rounded-full ${col.tone}`} />
              <h3 className="text-body-s font-semibold text-ink-900">{col.label}</h3>
              <span className="ms-auto rounded-full bg-ink-100 px-2 py-0.5 text-caption font-semibold text-ink-500">
                {cards.length}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {cards.map((a) => (
                <Link
                  key={a.id}
                  href={`/${locale}/admin/applications/${a.id}`}
                  className="card-lift group block rounded-[var(--radius-m)] border border-ink-100 bg-paper-0 p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-body-s font-semibold text-ink-900 group-hover:text-gold-hover">{a.name}</span>
                    <GripVertical className="h-4 w-4 shrink-0 text-ink-300" />
                  </div>
                  <p className="mt-0.5 text-caption text-ink-500">{a.track}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-caption text-ink-300">{a.country}</span>
                    {a.score !== undefined && (
                      <span className="rounded-full bg-gold-600/12 px-2 py-0.5 text-caption font-semibold text-gold-hover">
                        {a.score}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 block text-caption text-ink-300">{a.id}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
