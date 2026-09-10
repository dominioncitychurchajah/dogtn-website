"use client";

import * as React from "react";

/**
 * Progress for a request whose duration we cannot know.
 *
 * The Apps Script endpoint has been measured between 2s and 35s for identical
 * payloads, so a spinner leaves people staring at nothing and re-clicking.
 * This eases toward 95% and waits there: it never claims to be finished, and
 * it never stalls at a number that looks stuck.
 */
export function useSubmitProgress(active: boolean, done: boolean) {
  const [pct, setPct] = React.useState(0);

  React.useEffect(() => {
    if (done) {
      setPct(100);
      return;
    }
    if (!active) {
      setPct(0);
      return;
    }
    setPct(4);
    const id = window.setInterval(() => {
      // Asymptotic: big steps early, ever smaller ones as it approaches 95.
      setPct((p) => (p >= 95 ? 95 : p + Math.max(0.35, (95 - p) * 0.035)));
    }, 180);
    return () => window.clearInterval(id);
  }, [active, done]);

  return Math.round(pct);
}
