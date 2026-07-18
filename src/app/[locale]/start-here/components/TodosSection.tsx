"use client";

import * as React from "react";
import { ClipboardCheck, User, X, ArrowRight, ChevronDown } from "lucide-react";

interface TodosSectionProps {
  locale: string;
}

interface TodoItem {
  id: "assessment" | "mentorship";
  title: string;
  desc: string;
  icon: typeof ClipboardCheck;
  ctaText: string;
  url: string;
}

const defaultTodos = (locale: string): TodoItem[] => [
  {
    id: "assessment",
    title: "Take your 7-minute assessment",
    desc: "Discover your current leadership level and the best next step.",
    icon: ClipboardCheck,
    ctaText: "Start now",
    url: `/${locale}/leadership/assessment`,
  },
  {
    id: "mentorship",
    title: "Get matched with a mentor",
    desc: "Find a mentor who aligns with your calling and season.",
    icon: User,
    ctaText: "Get matched",
    url: `/${locale}/mentorship`,
  },
];

export function TodosSection({ locale }: TodosSectionProps) {
  const [activeTodos, setActiveTodos] = React.useState<TodoItem[]>(defaultTodos(locale));
  const [dismissingIds, setDismissingIds] = React.useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissingIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setTimeout(() => {
      setActiveTodos((prev) => prev.filter((t) => t.id !== id));
      setDismissingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  if (activeTodos.length === 0) return null;

  const renderCard = (todo: TodoItem) => {
    const Icon = todo.icon;
    const isDismissing = dismissingIds.has(todo.id);

    return (
      <div
        key={todo.id}
        className={`bg-white/5 border border-white/10 rounded-[12px] p-4 flex items-start gap-3 transition-all duration-300 hover:border-[rgba(201,168,76,0.3)] group ${
          isDismissing ? "opacity-0 translate-x-4" : ""
        }`}
      >
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-gold-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-body-s font-semibold text-paper-0 mb-0.5">{todo.title}</div>
          <div className="text-caption text-white/50 leading-relaxed">{todo.desc}</div>
          <a
            href={todo.url}
            className="inline-flex items-center gap-1 mt-2 text-caption font-semibold text-gold-400 hover:text-gold-hover transition-colors no-underline"
          >
            {todo.ctaText}
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        <button
          onClick={() => handleDismiss(todo.id)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white/30 hover:text-paper-0 hover:bg-white/10 transition-all cursor-pointer shrink-0 opacity-0 group-hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Desktop sidebar variant */}
      <div className="hidden lg:block sticky top-[100px]">
        <div className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.2em] mb-4">
          Your Next Steps
        </div>
        <div className="flex flex-col gap-3">
          {activeTodos.map(renderCard)}
        </div>
      </div>

      {/* Mobile accordion variant */}
      <div className="lg:hidden mt-6">
        <details className="group" open>
          <summary className="flex items-center justify-between cursor-pointer text-[11px] font-semibold text-white/60 uppercase tracking-[0.2em] py-3 border-t border-white/10 list-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center gap-2">
              Your Next Steps
              <span className="w-4 h-4 rounded-full bg-gold-600/20 text-gold-400 text-[10px] font-bold flex items-center justify-center">
                {activeTodos.length}
              </span>
            </span>
            <ChevronDown className="w-4 h-4 text-white/40 transition-transform group-open:rotate-180" />
          </summary>
          <div className="flex flex-col gap-3 pt-3 pb-2">
            {activeTodos.map(renderCard)}
          </div>
        </details>
      </div>
    </>
  );
}
