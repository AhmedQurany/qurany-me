"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { ARCHETYPES } from "@/lib/archetypes";

// Orbital positions as parseable percentages (mirrors Hero.tsx). Two sets:
// small-viewport (below 900px) and large-viewport (900px+).
type OrbitalCfg = {
  // Anchored edges as percentages from that edge.
  leftPct?: number;
  rightPct?: number;
  topPct?: number;
  bottomPct?: number;
  rot: number;
};

const orbitalSmall: OrbitalCfg[] = [
  { leftPct: 4, bottomPct: 25, rot: -18 },
  { leftPct: 8, topPct: 32, rot: -12 },
  { leftPct: 24, topPct: 10, rot: -6 },
  { rightPct: 24, topPct: 10, rot: 6 },
  { rightPct: 8, topPct: 32, rot: 12 },
  { rightPct: 4, bottomPct: 25, rot: 18 },
];

const orbitalLarge: OrbitalCfg[] = [
  { leftPct: 12, bottomPct: 22, rot: -18 },
  { leftPct: 18, topPct: 28, rot: -12 },
  { leftPct: 30, topPct: 8, rot: -6 },
  { rightPct: 30, topPct: 8, rot: 6 },
  { rightPct: 18, topPct: 28, rot: 12 },
  { rightPct: 12, bottomPct: 22, rot: 18 },
];

// Convert an orbital cfg to an (x, y) offset from the viewport center, given
// the current card size.
function orbitalToOffset(
  cfg: OrbitalCfg,
  vw: number,
  vh: number,
  cardW: number,
  cardH: number
) {
  let cardCx: number;
  let cardCy: number;
  if (cfg.leftPct !== undefined) {
    cardCx = (cfg.leftPct / 100) * vw + cardW / 2;
  } else {
    cardCx = vw - (cfg.rightPct! / 100) * vw - cardW / 2;
  }
  if (cfg.topPct !== undefined) {
    cardCy = (cfg.topPct / 100) * vh + cardH / 2;
  } else {
    cardCy = vh - (cfg.bottomPct! / 100) * vh - cardH / 2;
  }
  return {
    x: cardCx - vw / 2,
    y: cardCy - vh / 2,
    rot: cfg.rot,
  };
}

export function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      setMounted(false);
      return;
    }

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== ARCHETYPES.length) return;

    const root = document.documentElement;
    const prevHtmlOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    // Hide Hero's own orbital cards via CSS while the preloader is running.
    // Each Hero card is individually revealed (below) when its matching
    // preloader card lands in position.
    root.classList.add("preloading-active");

    const isLarge = window.innerWidth >= 900;
    const orbitalCfg = isLarge ? orbitalLarge : orbitalSmall;

    // Random-looking but deterministic stack rotations (avoid SSR hydration
    // drift and re-render flicker). Each card lands on the deck with its own
    // slight tilt so the stack feels hand-placed rather than mechanical.
    const stackRotations = [-12, 9, -5, 14, -8, 4];

    // Initial state: GSAP owns the transform now. xPercent/yPercent -50
    // recreates the CSS centering, then scale/rotate/opacity are applied
    // on top. The inline CSS translate(-50%, -50%) is just to keep the
    // very first paint visually identical before GSAP takes over.
    cards.forEach((el, i) => {
      gsap.set(el, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        scale: 1.6,
        rotate: stackRotations[i],
        opacity: 0,
        zIndex: 100 + i,
        transformOrigin: "50% 50%",
        filter: "drop-shadow(0 18px 40px rgba(0,0,0,0.85))",
        willChange: "transform, opacity",
      });
    });

    const cleanup = () => {
      root.style.overflow = prevHtmlOverflow;
      root.classList.remove("preloading-active");
      // Failsafe: ensure every Hero card is visible if cleanup fires mid-flight.
      document.querySelectorAll<HTMLElement>("[data-archetype-card]").forEach(
        (el) => {
          el.style.visibility = "";
        }
      );
    };

    const tl = gsap.timeline({
      onComplete: () => {
        cleanup();
        setMounted(false);
      },
    });

    // Phase 1 — cards appear one by one, stacked precisely at the center.
    cards.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        i * 0.18
      );
    });

    // Hold so the center deck reads.
    tl.to({}, { duration: 0.6 });

    // Phase 2 — the screen opens: only the black backdrop fades, leaving the
    // stacked cards visible above the now-revealed homepage.
    if (backdropRef.current) {
      tl.to(backdropRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });
    }

    // Phase 3 — cards fly from center to their orbital positions on the
    // now-visible page. Each card fades out as it arrives, so the Hero's
    // real card (already rendered underneath at the same spot) is revealed
    // at the very moment the preloader copy disappears.
    const phase3Start = tl.duration();
    const flyDuration = 1.05;
    cards.forEach((el, i) => {
      // offsetWidth/Height return the LAYOUT box (ignores transforms), so the
      // target is computed against the card's natural size, not its scaled
      // visual size. Without this the card lands offset from Hero's card.
      const cardW = el.offsetWidth;
      const cardH = el.offsetHeight;
      const target = orbitalToOffset(
        orbitalCfg[i],
        window.innerWidth,
        window.innerHeight,
        cardW,
        cardH
      );
      const cardStart = phase3Start + i * 0.06;
      tl.to(
        el,
        {
          x: target.x,
          y: target.y,
          rotate: target.rot,
          scale: 1,
          duration: flyDuration,
          ease: "power3.inOut",
        },
        cardStart
      );
      // Reveal the matching Hero card the instant the preloader card lands
      // on its position. Inline style overrides the CSS visibility:hidden
      // applied by html.preloading-active.
      const archetypeId = ARCHETYPES[i].id;
      tl.call(
        () => {
          const heroCard = document.querySelector<HTMLElement>(
            `[data-archetype-card="${archetypeId}"]`
          );
          if (heroCard) heroCard.style.visibility = "visible";
        },
        undefined,
        cardStart + flyDuration - 0.05
      );
      // Hide this card just as it arrives — the Hero card underneath shows
      // through at the same instant.
      tl.to(
        el,
        {
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
        },
        cardStart + flyDuration - 0.18
      );
    });

    return () => {
      tl.kill();
      cleanup();
    };
  }, [prefersReducedMotion]);

  if (!mounted) return null;

  return (
    <div ref={overlayRef} aria-hidden className="fixed inset-0 z-[9000]">
      {/* Black backdrop — fades independently when the screen "opens" */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black"
      />
      <div className="pointer-events-none fixed inset-0">
        {ARCHETYPES.map((a, i) => {
          return (
            <div
              key={a.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="block aspect-[5/7] w-[clamp(50px,14vw,80px)] min-[900px]:w-[clamp(80px,9vw,130px)]"
              // CSS-center the card at the viewport center on the very
              // first paint, before any JS runs. Cards START here.
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[6px]">
                <Image
                  src={a.card}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 80px, 130px"
                  className="select-none object-cover"
                  draggable={false}
                  priority
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
