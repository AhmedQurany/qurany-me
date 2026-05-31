"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DURATION_MS = 1500;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Parses the surface format into target + display rules.
// "11"   → { target: 11,  suffix: "", pad: false }
// "500+" → { target: 500, suffix: "+", pad: false }
// "06"   → { target: 6,   suffix: "", pad: true  }
// "01"   → { target: 1,   suffix: "", pad: true  }
function parse(value: string) {
  const suffix = value.endsWith("+") ? "+" : "";
  const numStr = value.replace(/[^0-9]/g, "");
  const target = parseInt(numStr || "0", 10);
  const pad = numStr.length === 2 && numStr.startsWith("0");
  return { target, suffix, pad };
}

function format(n: number, pad: boolean, suffix: string, complete: boolean) {
  const body = pad ? String(n).padStart(2, "0") : String(n);
  return complete ? `${body}${suffix}` : body;
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const { target, suffix, pad } = parse(value);
  const initial = prefersReducedMotion
    ? format(target, pad, suffix, true)
    : format(0, pad, "", false);
  const [display, setDisplay] = useState<string>(initial);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(format(target, pad, suffix, true));
      hasAnimated.current = true;
      return;
    }
    if (hasAnimated.current || !ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        const start = performance.now();
        let raf = 0;
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / DURATION_MS, 1);
          const eased = easeOutCubic(progress);
          const current = Math.round(target * eased);
          const complete = progress >= 1;
          setDisplay(format(complete ? target : current, pad, suffix, complete));
          if (!complete) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, suffix, pad, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}
