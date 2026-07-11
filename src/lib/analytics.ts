type EventPayload = Record<string, unknown>;

/** Pushes a canonical event to window.dataLayer (GTM/GA4/PostHog-compatible). No-op if absent. */
export function trackEvent(name: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: EventPayload[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: name, ...payload });
}
