"use client";

import { BookOpen, ShoppingCart } from "lucide-react";
import type { Book } from "@/data/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { formatCurrency } from "@/lib/utils";

export function BookActions({ book }: { book: Book }) {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => toast("Redirecting to secure checkout…")}>
        <ShoppingCart className="h-4 w-4" /> Buy — {formatCurrency(book.price.amount, book.price.currency)}
      </Button>
      <Modal
        title={`Sample — ${book.title}`}
        description="A short excerpt from the opening pages."
        trigger={
          <Button variant="secondary">
            <BookOpen className="h-4 w-4" /> Read Sample
          </Button>
        }
      >
        <div className="max-h-[55dvh] overflow-y-auto">
          <p className="measure whitespace-pre-line text-body-m leading-relaxed text-ink-700">{book.sample}</p>
        </div>
      </Modal>
    </div>
  );
}
