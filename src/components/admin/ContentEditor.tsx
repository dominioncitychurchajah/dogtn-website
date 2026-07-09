"use client";

import * as React from "react";
import { UploadCloud, Monitor, Tablet, Smartphone, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const TAXONOMY = ["Leadership", "Discipleship", "Wisdom & Wealth", "Proper Speech", "Kingdom Governance", "Purpose"];
const BREAKPOINTS = [
  { key: "desktop", label: "Desktop", icon: Monitor, width: "100%" },
  { key: "tablet", label: "Tablet", icon: Tablet, width: "768px" },
  { key: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
];

export function ContentEditor() {
  const { toast } = useToast();
  const [tags, setTags] = React.useState<string[]>(["leadership"]);
  const [tagInput, setTagInput] = React.useState("");
  const [checked, setChecked] = React.useState<string[]>(["Leadership"]);
  const [bp, setBp] = React.useState("desktop");
  const [title, setTitle] = React.useState("");

  const activeWidth = BREAKPOINTS.find((b) => b.key === bp)?.width ?? "100%";

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags((t) => Array.from(new Set([...t, tagInput.trim().toLowerCase()])));
      setTagInput("");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
      {/* Editor */}
      <div className="xl:col-span-2 space-y-6">
        {/* Upload */}
        <div className="flex flex-col items-center justify-center rounded-[var(--radius-l)] border-2 border-dashed border-ink-100 bg-paper-0 p-10 text-center">
          <UploadCloud className="h-8 w-8 text-ink-300" />
          <p className="mt-3 text-body-m font-semibold text-ink-900">Drop media here</p>
          <p className="text-body-s text-ink-500">MP4, MP3, or article draft · up to 2GB</p>
          <Button variant="secondary" size="s" className="mt-4" onClick={() => toast("Upload dialog (mock)", "info")}>
            Browse files
          </Button>
        </div>

        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6 space-y-4">
          <Input label="Title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. The Laws of Kingdom Governance" />
          <Textarea label="Description" name="desc" placeholder="Short summary shown on cards and detail pages." />
          <Select label="Format" name="format">
            <option>Video</option>
            <option>Audio</option>
            <option>Article</option>
          </Select>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="mb-1.5 block text-body-s font-semibold text-ink-700">Tags</label>
            <div className="flex flex-wrap gap-2 rounded-[var(--radius-m)] border border-ink-100 p-2">
              {tags.map((t) => (
                <span key={t} className="rounded-full bg-gold-600/12 px-2.5 py-1 text-caption font-semibold text-gold-hover">
                  #{t}
                </span>
              ))}
              <input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add tag + Enter"
                className="flex-1 bg-transparent px-2 text-body-s focus:outline-none"
              />
            </div>
          </div>

          <Input label="Publish date" name="schedule" type="date" />
        </div>
      </div>

      {/* Taxonomy + preview */}
      <div className="space-y-6">
        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-6">
          <h3 className="mb-3 text-body-m font-semibold text-ink-900">Taxonomy</h3>
          <ul className="space-y-2">
            {TAXONOMY.map((t) => (
              <li key={t}>
                <label className="flex items-center gap-2.5 text-body-s text-ink-700">
                  <input
                    type="checkbox"
                    checked={checked.includes(t)}
                    onChange={(e) =>
                      setChecked((c) => (e.target.checked ? [...c, t] : c.filter((x) => x !== t)))
                    }
                    className="h-4 w-4 accent-gold-600"
                  />
                  {t}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius-l)] border border-ink-100 bg-paper-0 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-body-m font-semibold text-ink-900">Preview</h3>
            <div className="flex gap-1">
              {BREAKPOINTS.map((b) => {
                const Icon = b.icon;
                return (
                  <button
                    key={b.key}
                    onClick={() => setBp(b.key)}
                    aria-label={b.label}
                    className={cn(
                      "rounded-[var(--radius-s)] p-1.5",
                      bp === b.key ? "bg-ink-900 text-paper-0" : "text-ink-500 hover:bg-paper-50",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-m)] bg-paper-50 p-3">
            <div className="mx-auto rounded-[var(--radius-s)] bg-paper-0 p-4 shadow-elev-1 transition-all" style={{ maxWidth: activeWidth }}>
              <div className="aspect-video rounded bg-ink-100" />
              <p className="mt-3 text-body-s font-semibold text-ink-900">{title || "Untitled content"}</p>
              <p className="text-caption text-ink-500">{checked.join(" · ") || "No taxonomy"}</p>
            </div>
          </div>
        </div>

        <Button className="w-full" onClick={() => toast("Content saved as draft")}>
          <Save className="h-4 w-4" /> Save draft
        </Button>
      </div>
    </div>
  );
}
