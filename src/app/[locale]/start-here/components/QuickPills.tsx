"use client";

import * as React from "react";
import { Compass, Star, Users, User, ClipboardCheck, BookOpen } from "lucide-react";

interface PillConfig {
  intent: string;
  label: string;
  question: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pills: PillConfig[] = [
  {
    intent: "discover-purpose",
    label: "Discover Purpose",
    question: "I want to discover my purpose and calling. Where should I start?",
    icon: Compass,
  },
  {
    intent: "deepen-faith",
    label: "Deepen Faith",
    question: "I want to deepen my faith and grow spiritually. What do you recommend?",
    icon: Star,
  },
  {
    intent: "build-leadership",
    label: "Build Leadership",
    question: "I want to build my leadership skills. What programs do you have?",
    icon: Users,
  },
  {
    intent: "find-mentor",
    label: "Find a Mentor",
    question: "I want to find a mentor. How does the mentorship program work?",
    icon: User,
  },
  {
    intent: "join-community",
    label: "Join Community",
    question: "I want to join a community. What groups are available?",
    icon: Users,
  },
  {
    intent: "take-assessment",
    label: "Take Assessment",
    question: "I am not sure where I fit. Can I take an assessment?",
    icon: ClipboardCheck,
  },
  {
    intent: "explore-teachings",
    label: "Explore Teachings",
    question: "I want to explore teachings and sermons. Where can I find them?",
    icon: BookOpen,
  },
];

interface QuickPillsProps {
  onPillClick: (question: string, intent: string) => void;
  disabled?: boolean;
}

export function QuickPills({ onPillClick, disabled }: QuickPillsProps) {
  const [clickedId, setClickedId] = React.useState<string | null>(null);

  const handleClick = (pill: PillConfig) => {
    if (disabled) return;
    setClickedId(pill.intent);
    // Brief tactile scale feedback then fire the callback
    setTimeout(() => {
      onPillClick(pill.question, pill.intent);
      setClickedId(null);
    }, 120);
  };

  return (
    <div
      className={`flex flex-nowrap lg:flex-wrap lg:justify-center gap-3 mt-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none pb-2 lg:pb-0 scrollbar-none ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pillFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
      {pills.map((pill, idx) => {
        const Icon = pill.icon;
        const isClicked = clickedId === pill.intent;
        return (
          <button
            key={pill.intent}
            onClick={() => handleClick(pill)}
            disabled={disabled}
            className="group snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-gold-400/50 text-paper-0 rounded-full cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-95"
            style={{
              animation: `pillFadeIn 400ms cubic-bezier(0.16,1,0.3,1) ${idx * 50}ms both`,
              transform: isClicked ? "scale(0.95)" : undefined,
            }}
          >
            <Icon className="w-4 h-4 text-gold-400 transition-colors" />
            <span className="uppercase tracking-[0.1em] text-[11px] font-semibold whitespace-nowrap">
              {pill.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
