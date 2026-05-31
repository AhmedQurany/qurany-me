"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, SplitText } from "@/lib/gsap";

/**
 * Per-character blur reveal on scroll, ported from Codrops
 * "On-Scroll Blur Reveal — Demo 3" (https://github.com/codrops/ScrollBlurTypography).
 * Each char animates from scaleY 0.1 / scaleX 1.8 / blur(10px) brightness(50%)
 * back to identity, scrubbed against the section scroll position.
 *
 * Backward-compat props (splitBy, duration, yPercent, delay) are accepted but
 * ignored — the scrub-driven animation owns its own timing.
 */
export function SplitReveal({
  children,
  className,
  as: Tag = "h2",
  start = "top bottom-=15%",
  end = "bottom center+=15%",
  stagger = 0.05,
  // accepted for backward compatibility with existing call sites
  splitBy: _splitBy,
  duration: _duration,
  yPercent: _yPercent,
  delay: _delay,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  start?: string;
  end?: string;
  stagger?: number;
  splitBy?: "lines" | "words" | "chars" | "lines,words" | "words,chars";
  duration?: number;
  yPercent?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      // Wait for fonts so character metrics — and therefore SplitText output —
      // match what the user sees in production.
      const run = () => {
        if (!ref.current) return;

        const split = new SplitText(ref.current, { type: "words,chars" });

        const tween = gsap.fromTo(
          split.chars,
          {
            scaleY: 0.1,
            scaleX: 1.8,
            filter: "blur(10px) brightness(50%)",
            willChange: "filter, transform",
          },
          {
            ease: "none",
            scaleY: 1,
            scaleX: 1,
            filter: "blur(0px) brightness(100%)",
            stagger,
            scrollTrigger: {
              trigger: ref.current,
              start,
              end,
              scrub: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          split.revert();
        };
      };

      if (document.fonts && document.fonts.status !== "loaded") {
        let cleanup: undefined | (() => void);
        document.fonts.ready.then(() => {
          cleanup = run() as undefined | (() => void);
        });
        return () => cleanup?.();
      }
      return run() as undefined | (() => void);
    },
    {
      scope: ref,
      dependencies: [prefersReducedMotion, start, end, stagger],
    }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Simple scroll-triggered fade+slide for blocks that don't need character
 * splitting (eyebrows, button wrappers, list items with mixed content).
 */
export function FadeReveal({
  children,
  className,
  delay = 0,
  y = 20,
  duration = 0.7,
  start = "top 85%",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [prefersReducedMotion, y, duration, delay, start] }
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
