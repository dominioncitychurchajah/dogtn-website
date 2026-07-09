"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mobile-first bottom sheet (filter sheets, module drawers). Slides up. */
export function BottomSheet({
  open,
  onOpenChange,
  trigger,
  title,
  children,
  footer,
  className,
}: {
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-ink-900/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-[101] max-h-[85dvh] overflow-y-auto rounded-t-[var(--radius-xl)] bg-paper-0 p-5 shadow-elev-4 focus:outline-none",
            "sm:inset-x-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-[380px] sm:rounded-none sm:rounded-l-[var(--radius-l)]",
            className,
          )}
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink-100 sm:hidden" />
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-heading-3 text-ink-900">{title}</Dialog.Title>
            <Dialog.Close aria-label="Close" className="rounded-full p-1.5 text-ink-500 hover:bg-paper-50">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <div className="pb-2">{children}</div>
          {footer && <div className="sticky bottom-0 -mx-5 mt-4 border-t border-ink-100 bg-paper-0 px-5 pt-4">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
