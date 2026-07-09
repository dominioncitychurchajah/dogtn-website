"use client";

import * as React from "react";
import * as RTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({
  items,
  defaultValue,
  className,
}: {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}) {
  return (
    <RTabs.Root defaultValue={defaultValue ?? items[0]?.value} className={className}>
      <RTabs.List className="flex gap-1 border-b border-ink-100">
        {items.map((t) => (
          <RTabs.Trigger
            key={t.value}
            value={t.value}
            className={cn(
              "-mb-px border-b-2 border-transparent px-4 py-3 text-body-m font-semibold text-ink-500 transition-colors",
              "hover:text-ink-900 data-[state=active]:border-gold-600 data-[state=active]:text-ink-900",
            )}
          >
            {t.label}
          </RTabs.Trigger>
        ))}
      </RTabs.List>
      {items.map((t) => (
        <RTabs.Content key={t.value} value={t.value} className="pt-6 focus:outline-none">
          {t.content}
        </RTabs.Content>
      ))}
    </RTabs.Root>
  );
}
