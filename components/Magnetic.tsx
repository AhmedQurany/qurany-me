"use client";

import { useRef, useEffect, useState, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Wraps an inline element with magnetic-pull behavior — the wrapper
 * translates toward the cursor inside its hover zone, then springs back
 * with elastic on leave.
 *
 * Use around primary CTAs only — overuse kills the effect.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = "inline-block",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setCanHover(fineHover && !reduced);
  }, []);

  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (!canHover || !ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </span>
  );
}
