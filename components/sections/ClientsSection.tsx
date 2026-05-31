"use client";

import { useEffect, useId, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FoldedDom } from "@/lib/folding-dom/folded-dom";

/**
 * Anemolo/FoldingDOM demo 1, ported into a Next.js section.
 *
 * - HTML structure mirrors index.html exactly: a hidden `#base-content`
 *   template, then a `.screen > .wrapper-3d > .fold.fold-before / fold-center
 *   / fold-after` skeleton that the `FoldedDom` class fills by cloning the
 *   base content into each fold.
 * - CSS rules from base.css + typo.css are pasted verbatim in globals.css
 *   under a `.fd-stage` selector so class names (`fold`, `content__line`,
 *   `type type--N`, …) work like the repo without colliding globally.
 * - Scroll source is decoupled from `document.body.style.height` (which
 *   would break the rest of our page) and instead driven by a section-pinned
 *   ScrollTrigger — same translateY result, no global side effects.
 */

// Identical line shape to index.html (each line = multiple `.type type--N`
// spans). Names swapped for real qurany.me clients.
const LINES: Array<Array<{ text: string; n: number }>> = [
  [
    { text: "IT-RANKS", n: 1 },
    { text: "Barcelona", n: 2 },
    { text: "IT-RANKS", n: 1 },
    { text: "Barcelona", n: 2 },
  ],
  [
    { text: "Solean", n: 3 },
    { text: "Budapest", n: 4 },
    { text: "Solean", n: 3 },
    { text: "Budapest", n: 4 },
  ],
  [
    { text: "Galaxy Racer", n: 6 },
    { text: "Berlin", n: 1 },
    { text: "Galaxy Racer", n: 6 },
  ],
  [
    { text: "Goshen", n: 5 },
    { text: "Sajilni", n: 2 },
    { text: "Goshen", n: 5 },
  ],
  [
    { text: "UDL", n: 1 },
    { text: "Appetito", n: 7 },
    { text: "UDL", n: 1 },
    { text: "Appetito", n: 7 },
  ],
  [
    { text: "Solean", n: 3 },
    { text: "Eventafy", n: 4 },
    { text: "Solean", n: 3 },
    { text: "Eventafy", n: 4 },
    { text: "Solean", n: 3 },
    { text: "Eventafy", n: 4 },
  ],
  [
    { text: "Galaxy Racer", n: 6 },
    { text: "IT-RANKS", n: 1 },
    { text: "Galaxy Racer", n: 6 },
    { text: "IT-RANKS", n: 1 },
    { text: "Galaxy Racer", n: 6 },
    { text: "IT-RANKS", n: 1 },
  ],
  [
    { text: "Goshen", n: 5 },
    { text: "Sajilni", n: 2 },
    { text: "Goshen", n: 5 },
    { text: "Sajilni", n: 2 },
    { text: "Goshen", n: 5 },
    { text: "Sajilni", n: 2 },
  ],
  [
    { text: "UDL", n: 1 },
    { text: "Appetito", n: 2 },
    { text: "UDL", n: 1 },
    { text: "Appetito", n: 2 },
  ],
  [
    { text: "Eventafy", n: 3 },
    { text: "Budapest", n: 4 },
    { text: "Eventafy", n: 3 },
    { text: "Budapest", n: 4 },
    { text: "Eventafy", n: 3 },
    { text: "Budapest", n: 4 },
  ],
];

export function ClientsSection() {
  const prefersReducedMotion = useReducedMotion();
  const reactId = useId().replace(/:/g, "");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const baseContentRef = useRef<HTMLDivElement>(null);
  const foldRefs = useRef<(HTMLDivElement | null)[]>([]);
  const foldedRef = useRef<FoldedDom | null>(null);

  // Step 1 — once on mount, instantiate FoldedDom and clone content into
  // each fold (this is the exact JS the demo runs, minus the body height
  // and RAF loop).
  useEffect(() => {
    if (!stageRef.current || !baseContentRef.current) return;
    const folds = foldRefs.current.filter(
      (el): el is HTMLDivElement => Boolean(el)
    );
    if (folds.length !== 3) return;

    const folded = new FoldedDom(stageRef.current, folds);
    folded.setContent(baseContentRef.current);
    foldedRef.current = folded;

    // Initial offset = 0
    folded.updateStyles(0);

    return () => {
      // Remove the cloned content on unmount
      folds.forEach((f) => {
        while (f.firstChild) f.removeChild(f.firstChild);
      });
      foldedRef.current = null;
    };
  }, []);

  // Step 2 — section-scoped scroll. Pin the stage and feed the folded
  // content's `updateStyles(scroll)` with a value that goes 0 → -travel
  // as ScrollTrigger progress goes 0 → 1.
  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current) return;

      const computeTravel = () => {
        const contentH = foldedRef.current?.getContentHeight() ?? 0;
        const centerH = window.innerHeight * 0.8; // .fold has height 80vh
        return Math.max(0, contentH - centerH);
      };

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top top",
          end: () => `+=${computeTravel()}`,
          pin: stageRef.current!,
          pinSpacing: true,
          scrub: prefersReducedMotion ? false : 0.4,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const folded = foldedRef.current;
            if (!folded) return;
            const travel = computeTravel();
            folded.updateStyles(-self.progress * travel);
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Clients"
      className="fd-stage relative w-full"
    >
      {/* base-content — hidden template that FoldedDom clones into each fold.
          Identical structure to index.html: fold-content > content__line >
          type spans. Force-hidden inline because React's useId varies per
          render and our scoped CSS can't target a stable ID. */}
      <div
        ref={baseContentRef}
        className="fold-content"
        id={`base-${reactId}`}
        style={{ display: "none" }}
        aria-hidden
      >
        {LINES.map((line, i) => (
          <div key={i} className="content__line">
            {line.map((tok, j) => (
              <span key={j} className={`type type--${tok.n}`}>
                {tok.text}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* The pinned visible stage. Mirrors `.screen > .wrapper-3d > .fold …`
          from index.html. JS injects the cloned content into each `.fold`. */}
      <div
        ref={stageRef}
        className="screen relative h-screen w-full overflow-hidden"
        id={`fold-effect-${reactId}`}
      >
        <div className="wrapper-3d">
          <div
            ref={(el) => {
              foldRefs.current[0] = el;
            }}
            className="fold fold-before"
            aria-hidden
          />
          <div
            ref={(el) => {
              foldRefs.current[1] = el;
            }}
            className="fold fold-center"
          />
          <div
            ref={(el) => {
              foldRefs.current[2] = el;
            }}
            className="fold fold-after"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
