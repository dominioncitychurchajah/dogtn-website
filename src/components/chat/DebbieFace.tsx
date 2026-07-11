import { cn } from "@/lib/utils";

export type DebbieFaceState = "idle" | "thinking" | "active";

const MOUTH_PATHS: Record<DebbieFaceState, string> = {
  idle: "M11 20Q16 23 21 20",
  thinking: "M12 21Q16 21.6 20 21",
  active: "M10 19.2Q16 25 22 19.2",
};

/**
 * Minimalist line-art face — idle/thinking/active expressions.
 * `animated` adds the ambient blink + head-tilt loop (FAB only; the header
 * copy inside the open window stays static per the avatar spec).
 */
export function DebbieFace({
  state = "idle",
  animated = true,
  className,
}: {
  state?: DebbieFaceState;
  animated?: boolean;
  className?: string;
}) {
  const eyeShiftX = state === "thinking" ? 1.4 : 0;
  const eyeRy = state === "active" ? "2.3" : "2";

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <g className={cn(animated && "debbie-idle-tilt")} style={{ transformOrigin: "16px 30px" }}>
        <g
          className={cn(animated && "debbie-blink")}
          style={{ transformOrigin: "16px 14px", transition: "transform 300ms ease" }}
        >
          <ellipse
            cx={11 + eyeShiftX}
            cy="14"
            rx="1.7"
            ry={eyeRy}
            fill="currentColor"
            style={{ transition: "cx 300ms ease, ry 300ms ease" }}
          />
          <ellipse
            cx={21 + eyeShiftX}
            cy="14"
            rx="1.7"
            ry={eyeRy}
            fill="currentColor"
            style={{ transition: "cx 300ms ease, ry 300ms ease" }}
          />
        </g>
        <path
          d={MOUTH_PATHS[state]}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
