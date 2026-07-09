"use client";

import * as React from "react";
import * as RAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export function Accordion({
  items,
  className,
  type = "single",
}: {
  items: AccordionItemData[];
  className?: string;
  type?: "single" | "multiple";
}) {
  const rootProps =
    type === "single"
      ? ({ type: "single", collapsible: true } as const)
      : ({ type: "multiple" } as const);
  return (
    <RAccordion.Root {...rootProps} className={cn("divide-y divide-ink-100 border-y border-ink-100", className)}>
      {items.map((item) => (
        <RAccordion.Item key={item.id} value={item.id} id={item.id} className="scroll-mt-28">
          <RAccordion.Header>
            <RAccordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-start text-body-l font-semibold text-ink-900 hover:text-gold-hover">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-ink-500 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </RAccordion.Trigger>
          </RAccordion.Header>
          <RAccordion.Content className="overflow-hidden text-body-m text-ink-500 data-[state=closed]:animate-none">
            <div className="pb-5">{item.answer}</div>
          </RAccordion.Content>
        </RAccordion.Item>
      ))}
    </RAccordion.Root>
  );
}
