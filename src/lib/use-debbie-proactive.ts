"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useChatStore } from "@/lib/chat-store";
import { useQuizStore } from "@/lib/quiz-store";
import { questions } from "@/data/assessment";
import { DEBBIE_NODES, ROOT_ID } from "@/data/debbie-flows";

const HIGH_INTENT_MESSAGES: Record<string, string> = {
  "/give": "Would you like to set up a monthly partnership? It takes 60 seconds.",
  "/partnership": "Would you like to set up a monthly partnership? It takes 60 seconds.",
  "/start-here": "Still deciding where to begin? I can help you find your first step.",
};

const LAST_VISIT_KEY = "debbie-last-visit";
const RETURN_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** Mirrors the homepage countdown's own "Sunday 08:00 local time" assumption, so this
 *  trigger fires in step with what the site already tells visitors, not a stricter
 *  GMT+1 conversion that would disagree with it. */
function isLiveServiceWindow() {
  const now = new Date();
  if (now.getDay() !== 0) return false;
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  return minutesSinceMidnight >= 8 * 60 && minutesSinceMidnight <= 9 * 60 + 30;
}

/** Proactive re-engagement triggers for Debbie's bell badge. Fires at most once per
 *  session per trigger; never interrupts an already-open chat. */
export function useDebbieProactiveTriggers(locale: string) {
  const pathname = usePathname();
  const isOpen = useChatStore((s) => s.isOpen);
  const triggerProactive = useChatStore((s) => s.triggerProactive);
  const answers = useQuizStore((s) => s.answers);
  const firedRef = React.useRef(new Set<string>());
  const path = (pathname ?? "").replace(new RegExp(`^/${locale}`), "") || "/";

  React.useEffect(() => {
    const message = HIGH_INTENT_MESSAGES[path];
    if (!message || isOpen || firedRef.current.has(`idle:${path}`)) return;
    const timer = setTimeout(() => {
      firedRef.current.add(`idle:${path}`);
      triggerProactive(message, DEBBIE_NODES.giving.chips);
    }, 60_000);
    return () => clearTimeout(timer);
  }, [path, isOpen, triggerProactive]);

  React.useEffect(() => {
    if (firedRef.current.has("return")) return;
    firedRef.current.add("return");
    const last = window.localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();
    if (last && now - Number(last) >= RETURN_WINDOW_MS) {
      triggerProactive(
        "Welcome back. It's good to see you again — would you like to continue where you left off?",
      );
    }
    window.localStorage.setItem(LAST_VISIT_KEY, String(now));
  }, [triggerProactive]);

  React.useEffect(() => {
    if (path === "/leadership/assessment" || firedRef.current.has("assessment")) return;
    const answered = Object.keys(answers).length;
    if (answered === 0 || answered >= questions.length) return;
    const timer = setTimeout(() => {
      firedRef.current.add("assessment");
      triggerProactive(
        "You're almost there on your Leadership Assessment — want to pick back up where you left off?",
        [
          {
            kind: "link",
            label: "Resume assessment",
            href: "/leadership/assessment",
            confirm: "Opening your assessment.",
          },
          { kind: "advance", label: "Not right now", to: ROOT_ID },
        ],
      );
    }, 5_000);
    return () => clearTimeout(timer);
  }, [path, answers, triggerProactive]);

  React.useEffect(() => {
    if (firedRef.current.has("live") || !isLiveServiceWindow()) return;
    firedRef.current.add("live");
    triggerProactive("Service is live now. Watch or listen?", [
      { kind: "link", label: "Watch Online", href: "/live", confirm: "Opening the live stream." },
      { kind: "advance", label: "Maybe later", to: ROOT_ID },
    ]);
  }, [triggerProactive]);
}
