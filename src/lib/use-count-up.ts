"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/** Animates a number counting up from 0 to `target` once it scrolls into view. */
export function useCountUp(target: number, { duration = 2 }: { duration?: number } = {}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (inView) motionValue.set(target);
  }, [inView, motionValue, target]);

  React.useEffect(() => {
    const unsubscribe = spring.on("change", (value) => setDisplay(Math.round(value)));
    return unsubscribe;
  }, [spring]);

  return { ref, value: display };
}
