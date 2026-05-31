"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ARCHETYPES } from "@/lib/archetypes";

const AUTO_ROTATE_MS = 5000;

// 6 orbital card slots that arc around the silhouette.
const orbital: { pos: string; rot: number; floatDelay: number }[] = [
  {
    pos: "bottom-[25%] left-[4%] min-[900px]:bottom-[22%] min-[900px]:left-[12%]",
    rot: -18,
    floatDelay: 0,
  },
  {
    pos: "top-[32%] left-[8%] min-[900px]:top-[28%] min-[900px]:left-[18%]",
    rot: -12,
    floatDelay: 0.6,
  },
  {
    pos: "top-[10%] left-[24%] min-[900px]:top-[8%] min-[900px]:left-[30%]",
    rot: -6,
    floatDelay: 1.2,
  },
  {
    pos: "top-[10%] right-[24%] min-[900px]:top-[8%] min-[900px]:right-[30%]",
    rot: 6,
    floatDelay: 1.8,
  },
  {
    pos: "top-[32%] right-[8%] min-[900px]:top-[28%] min-[900px]:right-[18%]",
    rot: 12,
    floatDelay: 2.4,
  },
  {
    pos: "bottom-[25%] right-[4%] min-[900px]:bottom-[22%] min-[900px]:right-[12%]",
    rot: 18,
    floatDelay: 3.0,
  },
];

export function Hero() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const cardsLayerRef = useRef<HTMLDivElement>(null);
  const copyLayerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const active = ARCHETYPES[activeIdx];

  // Sync global archetype color across the app
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--archetype-color", active.color);
    root.style.setProperty("--archetype-color-rgb", active.colorRgb);
    root.style.setProperty("--accent", active.colorRgb);
  }, [active]);

  // Auto-rotate
  useEffect(() => {
    if (userInteracted || prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % ARCHETYPES.length);
    }, AUTO_ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userInteracted, prefersReducedMotion]);

  const select = useCallback((idx: number) => {
    setUserInteracted(true);
    setActiveIdx(idx);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Title/subtitle slide-fade transition.
  const titleVariants = {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
  };

  // Hero outro choreography. NO PIN. Each card-wrapper (GSAP-owned) animates
  // to its EXACT Section 2 dock target. The inner motion.button keeps Framer
  // for entrance/hover — wrapping isolates the conflicting transform domains.
  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const COUNT_LOCAL = ARCHETYPES.length;
      const DOCK_INACTIVE_W = 52;
      const DOCK_OVERLAP = 18;
      const DOCK_BOTTOM_PX = 56;
      const DOCK_FAN_DEG = 3;

      const computeDockTarget = (i: number) => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const totalWidth =
          COUNT_LOCAL * DOCK_INACTIVE_W - (COUNT_LOCAL - 1) * DOCK_OVERLAP;
        const dockStartX = (vw - totalWidth) / 2;
        const cardLeftX = dockStartX + i * (DOCK_INACTIVE_W - DOCK_OVERLAP);
        const cardHeight = DOCK_INACTIVE_W * (7 / 5);
        const cardTopY = vh - DOCK_BOTTOM_PX - cardHeight;
        const dockCenterX = cardLeftX + DOCK_INACTIVE_W / 2;
        const dockCenterY = cardTopY + cardHeight / 2;
        const rot = (i - (COUNT_LOCAL - 1) / 2) * DOCK_FAN_DEG;
        return { centerX: dockCenterX, centerY: dockCenterY, rot, width: DOCK_INACTIVE_W };
      };

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top top",
            end: "bottom top",
            scrub: 0.4,
          },
        });

        // Silhouette blurs as you scroll
        tl.to(
          imageLayerRef.current,
          { filter: "blur(28px)", ease: "none", duration: 1 },
          0
        );

        // Copy fades + lifts
        tl.to(
          copyLayerRef.current,
          { opacity: 0, y: -60, ease: "none", duration: 1 },
          0
        );

        // Per-card morph to dock target, using center coordinates for clean
        // rotation + scale composition (transform-origin: 50% 50%).
        cardRefs.current.forEach((wrapper, i) => {
          if (!wrapper) return;
          const cfg = orbital[i];
          const origW = wrapper.offsetWidth;
          const origH = wrapper.offsetHeight;
          const origCenterX = wrapper.offsetLeft + origW / 2;
          const origCenterY = wrapper.offsetTop + origH / 2;

          // Set static orbital rotation as starting state (Framer doesn't
          // animate rotation, so this is safe)
          gsap.set(wrapper, { rotate: cfg.rot, transformOrigin: "50% 50%" });

          const target = computeDockTarget(i);
          const scale = target.width / origW;
          const dx = target.centerX - origCenterX;
          const dy = target.centerY - origCenterY;

          tl.to(
            wrapper,
            {
              x: dx,
              y: dy,
              rotate: target.rot,
              scale,
              ease: "none",
              duration: 1,
            },
            0
          );
        });

        // Final fade-out so Section 2's own dock cards seamlessly take over
        tl.to(
          cardsLayerRef.current,
          { opacity: 0, ease: "none", duration: 0.08 },
          0.92
        );
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      data-hero-section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh" }}
      aria-label="Ultimate Designer — shapeshifting hero"
    >
      <div
        ref={stageRef}
        className="relative w-full"
        style={{ height: "100svh" }}
      >
      {/* Auto-rotate progress bar pinned to viewport top */}
      <AnimatePresence>
        {!userInteracted && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2px]"
            aria-hidden
          >
            <div
              key={activeIdx}
              className="h-full animate-progress"
              style={{ background: "var(--archetype-color)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-bleed image with blur-out / blur-in crossfade between archetypes */}
      <div ref={imageLayerRef} className="absolute inset-0 z-0 will-change-[opacity,transform]">
        <AnimatePresence>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, filter: "blur(28px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(28px)" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.75,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute inset-0"
            style={{ willChange: "filter, opacity" }}
          >
            <Image
              src={active.image}
              alt={`Ahmed Qurany — ${active.discipline}`}
              fill
              sizes="100vw"
              priority={activeIdx === 0}
              className="select-none object-cover object-center"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-bg via-bg/80 to-transparent"
        />
      </div>

      {/* Bottom fade-to-black overlay — last 20% of the hero section,
          transparent at top → fully opaque black at bottom. Sits above the
          image / gradients (z-10) but below the copy (z-20) and cards (z-60). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[20%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Orbital cards — stagger in on mount, then continuous float.
          FIXED positioning + high z-index so they ride above Section 2 as
          the page scrolls past the hero, until they fade out at the dock. */}
      <div ref={cardsLayerRef} className="pointer-events-none fixed inset-0 z-[60] will-change-[transform,opacity]">
        {ARCHETYPES.map((a, i) => {
          const cfg = orbital[i];
          const isActive = i === activeIdx;
          return (
            <div
              key={a.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-archetype-card={a.id}
              className={`absolute ${cfg.pos} block aspect-[5/7] w-[clamp(50px,14vw,80px)] min-[900px]:w-[clamp(80px,9vw,130px)]`}
              style={{ willChange: "transform" }}
            >
              <motion.button
                type="button"
                onClick={() => select(i)}
                aria-label={`Switch to ${a.discipline} archetype`}
                aria-current={isActive ? "true" : undefined}
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        opacity: {
                          duration: 0.7,
                          delay: 0.45 + i * 0.09,
                          ease: [0.32, 0.72, 0, 1],
                        },
                        scale: {
                          duration: 0.9,
                          delay: 0.45 + i * 0.09,
                          ease: [0.34, 1.56, 0.64, 1],
                        },
                      }
                }
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        transition: {
                          duration: 0.3,
                          ease: [0.34, 1.56, 0.64, 1],
                        },
                      }
                }
                whileTap={{ scale: 0.96 }}
                className="pointer-events-auto relative block h-full w-full cursor-pointer overflow-hidden rounded-[6px] border-0 bg-transparent p-0 outline-none transition-[filter] duration-300"
                style={{
                  minWidth: 44,
                  minHeight: 44,
                  filter: isActive
                    ? `drop-shadow(0 12px 32px ${a.color}cc)`
                    : `drop-shadow(0 8px 24px rgba(0,0,0,0.55))`,
                }}
              >
                <Image
                  src={a.card}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 900px) 80px, 130px"
                  className="select-none object-cover"
                  draggable={false}
                  priority={i < 3}
                />
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-25 hover:opacity-0"
                  }`}
                  style={{ background: "rgba(10,10,10,0.45)" }}
                />
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Copy block — sits below the silhouette's hands, ~70% down */}
      <div ref={copyLayerRef} className="pointer-events-none absolute inset-x-0 bottom-[16vh] z-20 will-change-[transform,opacity] min-[900px]:bottom-[18vh]">
        <div className="container-x">
          <div className="relative mx-auto flex max-w-[920px] flex-col items-center text-center">
            {/* Title — blur-out / blur-in crossfade.
                Both layers absolutely stacked so they overlap during transition. */}
            <div className="relative w-full">
              <AnimatePresence>
                <motion.h1
                  key={active.id}
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.55,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="absolute inset-x-0 font-display font-bold text-balance"
                  style={{
                    fontSize: "clamp(36px, 5.2vw, 76px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    margin: 0,
                    color: "var(--archetype-color)",
                    textShadow: "0 2px 24px rgba(0,0,0,0.55)",
                  }}
                >
                  {active.roleWord}
                </motion.h1>
              </AnimatePresence>
              {/* Spacer to hold the absolute h1's height */}
              <h1
                aria-hidden
                className="invisible font-display font-bold text-balance"
                style={{
                  fontSize: "clamp(36px, 5.2vw, 76px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                {active.roleWord}
              </h1>
            </div>

            <div className="relative mt-6 w-full max-w-[600px]">
              <AnimatePresence>
                <motion.p
                  key={`sub-${active.id}`}
                  variants={titleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    ease: [0.32, 0.72, 0, 1],
                    delay: prefersReducedMotion ? 0 : 0.08,
                  }}
                  className="absolute inset-x-0 text-[15px] leading-[1.6] text-white/80 md:text-[16px]"
                >
                  {active.subtitle}
                </motion.p>
              </AnimatePresence>
              <p
                aria-hidden
                className="invisible text-[15px] leading-[1.6] text-white/80 md:text-[16px]"
              >
                {active.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
