"use client";

import * as React from "react";
import { DebbieFace } from "@/components/chat/DebbieFace";
import { Check, Loader2 } from "lucide-react";

interface ThinkingIndicatorProps {
  steps: string[];
}

export function ThinkingIndicator({ steps }: ThinkingIndicatorProps) {
  // Define the 3 steps we want to show
  const allSteps = [
    "Understanding your question...",
    "Finding the best path for you...",
    "Preparing your direction..."
  ];

  // We determine the status of each step based on the current steps in the hook
  //useAIChat appends steps over time (understanding -> finding -> preparing)
  const getStepStatus = (index: number) => {
    const currentStepCount = steps.length;
    if (index < currentStepCount - 1) {
      return "done";
    } else if (index === currentStepCount - 1) {
      return "active";
    } else {
      return "pending";
    }
  };

  return (
    <div className="max-w-[85%] bg-[rgba(10,14,26,0.8)] backdrop-blur-[10px] border border-[rgba(201,168,76,0.2)] rounded-[12px] p-5 flex flex-col gap-4 shadow-lg">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .progress-bar-fill {
          animation: progressFill 2.6s linear forwards;
        }
      `}} />

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gold-400 border border-white/5">
          <DebbieFace state="thinking" className="w-4 h-4" />
        </div>
        <span className="text-body-s font-semibold text-paper-0">Debbie is thinking...</span>
      </div>

      {/* Steps list */}
      <div className="flex flex-col gap-2.5 pl-10">
        {allSteps.map((stepText, idx) => {
          const status = getStepStatus(idx);
          return (
            <div key={idx} className="flex items-center gap-3 text-body-s">
              {status === "done" && (
                <Check className="w-4 h-4 text-gold-400 shrink-0" />
              )}
              {status === "active" && (
                <Loader2 className="w-4 h-4 text-gold-400 animate-spin shrink-0" />
              )}
              {status === "pending" && (
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                </div>
              )}
              <span className={status === "pending" ? "text-white/40" : "text-white/80"}>
                {stepText}
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
