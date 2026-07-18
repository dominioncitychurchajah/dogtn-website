"use client";

import * as React from "react";
import Link from "next/link";
import { Routing } from "../types";
import { BookOpen, X } from "lucide-react";

interface RoutingCardProps {
  routing: Routing;
  enableCountdown?: boolean;
}

export function RoutingCard({ routing, enableCountdown = true }: RoutingCardProps) {
  const [countdown, setCountdown] = React.useState(enableCountdown ? 5 : -1);
  const [cancelled, setCancelled] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const isExternal = routing.url.startsWith("http") || routing.url.startsWith("mailto:");

  React.useEffect(() => {
    if (!enableCountdown || cancelled) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          // Fade out page and redirect
          document.body.style.transition = "opacity 300ms ease-out";
          document.body.style.opacity = "0";
          setTimeout(() => {
            window.location.href = routing.url;
          }, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enableCountdown, cancelled, routing.url]);

  const handleCancel = () => {
    setCancelled(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCountdown(-1);
  };

  const LinkOrA = ({ children, className }: { children: React.ReactNode; className: string }) => {
    if (isExternal) {
      return <a href={routing.url} className={className}>{children}</a>;
    }
    return <Link href={routing.url} className={className}>{children}</Link>;
  };

  return (
    <div className="mt-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] border-l-[3px] border-l-[#c5a059] rounded-[12px] p-5 animate-[messageAppear_400ms_cubic-bezier(0.16,1,0.3,1)_both]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes countdownPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}} />

      {/* Card header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-[8px] bg-gold-600/15 flex items-center justify-center shrink-0">
          <BookOpen className="w-4 h-4 text-gold-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-body-m font-semibold text-paper-0">{routing.title}</div>
          <div className="text-body-s text-white/60 mt-0.5 leading-relaxed">{routing.description}</div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-2 flex-wrap mt-4">
        <LinkOrA className="px-5 py-2 bg-gold-600 hover:bg-gold-hover text-ink-900 font-semibold text-body-s rounded-[8px] transition-all no-underline inline-block hover:-translate-y-0.5 active:translate-y-0">
          {routing.cta}
        </LinkOrA>
        {routing.secondaryCta && (
          <LinkOrA className="px-5 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-paper-0 border border-white/10 font-semibold text-body-s rounded-[8px] transition-all no-underline inline-block hover:-translate-y-0.5">
            {routing.secondaryCta}
          </LinkOrA>
        )}
      </div>

      {/* Countdown */}
      {enableCountdown && !cancelled && countdown > 0 && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-body-s text-white/40">
            Auto-redirecting in{" "}
            <span
              className="text-gold-400 font-bold inline-block"
              style={{ animation: "countdownPulse 600ms ease-in-out" }}
              key={countdown}
            >
              {countdown}
            </span>
            ...
          </span>
          <button
            onClick={handleCancel}
            className="text-body-s text-white/40 hover:text-gold-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Cancel
          </button>
        </div>
      )}

      {/* Cancelled state */}
      {cancelled && (
        <div className="mt-3 pt-3 border-t border-white/5">
          <span className="text-body-s text-white/40">
            Not quite right?{" "}
            <LinkOrA className="text-gold-400 hover:text-gold-hover underline transition-colors">
              Try a different path
            </LinkOrA>
          </span>
        </div>
      )}
    </div>
  );
}
