"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="hover"]';

export function CustomCursor() {
  const [canHover, setCanHover] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Only enable on devices with a fine pointer + hover capability
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!canHover) return;

    // Mark html so globals.css can hide the native cursor only when ours is live
    document.documentElement.classList.add("has-custom-cursor");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { opacity: 0, xPercent: -50, yPercent: -50 });

    // quickTo creates per-property setters that GSAP optimises for
    // high-frequency updates like mousemove.
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", {
      duration: prefersReduced ? 0 : 0.45,
      ease: "power3",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: prefersReduced ? 0 : 0.45,
      ease: "power3",
    });

    let shown = false;
    const reveal = () => {
      if (shown) return;
      shown = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    const onMove = (e: MouseEvent) => {
      reveal();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onLeaveDoc = () => {
      shown = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.4,
        opacity: 0.6,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.25 });
    };
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.25 });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.(INTERACTIVE)) onEnterInteractive();
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const related = e.relatedTarget as Element | null;
      const wasInter = target?.closest?.(INTERACTIVE);
      const isStill = related?.closest?.(INTERACTIVE);
      if (wasInter && !isStill) onLeaveInteractive();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveDoc);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveDoc);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [canHover]);

  if (!canHover) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 rounded-full"
        style={{
          borderWidth: 1.5,
          borderStyle: "solid",
          borderColor: "var(--archetype-color)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--archetype-color)" }}
      />
    </>
  );
}
