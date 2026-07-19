"use client";

import * as React from "react";
import { DebbieFace } from "@/components/chat/DebbieFace";
import { Check } from "lucide-react";

interface ThinkingIndicatorProps {
  steps: string[];
}

const TOTAL_STEPS = 3;

export function ThinkingIndicator({ steps }: ThinkingIndicatorProps) {
  return (
    <div
      className="max-w-[85%] bg-[rgba(10,14,26,0.8)] backdrop-blur-[10px] border border-[rgba(201,168,76,0.2)] rounded-[12px] p-5 flex flex-col gap-4 shadow-lg"
      role="status"
      aria-live="polite"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .progress-bar-fill {
          animation: progressFill 2.6s linear forwards;
        }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .thinking-dot { animation: dotBounce 1.1s ease-in-out infinite; }
      `}} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gold-400 border border-white/5">
          <DebbieFace state="thinking" className="w-4 h-4" />
        </div>
        <span className="text-body-s font-semibold text-paper-0">Debbie is thinking</span>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="thinking-dot h-1 w-1 rounded-full bg-gold-400" style={{ animationDelay: "0ms" }} />
          <span className="thinking-dot h-1 w-1 rounded-full bg-gold-400" style={{ animationDelay: "150ms" }} />
          <span className="thinking-dot h-1 w-1 rounded-full bg-gold-400" style={{ animationDelay: "300ms" }} />
        </span>
      </div>

      {/* Steps list */}
      <div className="flex flex-col gap-2.5 pl-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, idx) => {
          const stepText = steps[idx];
          const isDone = idx < steps.length - 1;
          const isActive = idx === steps.length - 1;
          return (
            <div key={idx} className="flex items-center gap-3 text-body-s">
              {isDone && <Check className="w-4 h-4 text-gold-400 shrink-0" />}
              {isActive && (
                <span className="flex items-center gap-0.5 shrink-0" aria-hidden>
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-gold-400" style={{ animationDelay: "0ms" }} />
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-gold-400" style={{ animationDelay: "150ms" }} />
                  <span className="thinking-dot h-1.5 w-1.5 rounded-full bg-gold-400" style={{ animationDelay: "300ms" }} />
                </span>
              )}
              {!isDone && !isActive && (
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
              )}
              <span className={isDone || isActive ? "text-white/80" : "text-white/40"}>
                {stepText ?? DEFAULT_STEP_TEXT[idx]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-white/10 w-full rounded overflow-hidden mt-1">
        <div className="h-full bg-gold-600 rounded progress-bar-fill" />
      </div>
    </div>
  );
}

const DEFAULT_STEP_TEXT = [
  "Understanding your question...",
  "Finding the best path...",
  "Preparing your direction...",
];
