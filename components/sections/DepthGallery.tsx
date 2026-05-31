"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICES } from "@/lib/services";
import { ARCHETYPE_BY_ID } from "@/lib/archetypes";

const COUNT = SERVICES.length;

// Minimal type shape we touch on the ported Engine. The Engine is plain JS, so
// we declare only the bits we read/write here.
type DepthGalleryEngine = {
  init: () => Promise<void>;
  dispose: () => void;
  scroll: {
    scrollTarget: number;
    getScrollBounds: () => { min: number; max: number };
    unbindEvents: () => void;
  };
  experience: {
    gallery: {
      getPlaneBlendData: (
        cameraZ: number
      ) => { currentPlaneIndex: number; nextPlaneIndex: number; blend: number } | null;
    };
  };
  camera: { position: { z: number } };
};

type EngineConstructor = new (canvas: HTMLCanvasElement) => DepthGalleryEngine;

export default function DepthGallery() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cardRowRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<DepthGalleryEngine | null>(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [engineReady, setEngineReady] = useState(false);

  // Mount the Codrops engine once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let engineInstance: DepthGalleryEngine | null = null;

    (async () => {
      const { Engine } = (await import("@/lib/depth-gallery/Experience/Engine")) as {
        Engine: EngineConstructor;
      };

      if (cancelled) return;

      engineInstance = new Engine(canvas);
      engineRef.current = engineInstance;

      try {
        await engineInstance.init();
        // Hand scroll control off to ScrollTrigger — the engine no longer
        // captures wheel/touch on its own.
        engineInstance.scroll.unbindEvents();
        if (!cancelled) setEngineReady(true);
      } catch (error) {
        console.error("DepthGallery engine init failed", error);
      }
    })();

    return () => {
      cancelled = true;
      try {
        engineInstance?.dispose();
      } catch (error) {
        console.warn("DepthGallery engine dispose failed", error);
      }
      engineRef.current = null;
    };
  }, []);

  // ScrollTrigger pins the stage and drives engine + active-idx + card row
  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current || !engineReady) return;

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${sectionRef.current!.offsetHeight - window.innerHeight}`,
        pin: stageRef.current!,
        pinSpacing: false,
        scrub: prefersReducedMotion ? false : 0.4,
        onUpdate: (self) => {
          const progress = self.progress;

          // 1. Drive the engine's camera through the depth gallery
          const engine = engineRef.current;
          if (engine) {
            const bounds = engine.scroll.getScrollBounds();
            engine.scroll.scrollTarget = bounds.min + progress * (bounds.max - bounds.min);
          }

          // 2. Compute active idx from the engine's current plane (after lerp)
          let idx = Math.min(COUNT - 1, Math.max(0, Math.floor(progress * COUNT)));
          if (engine) {
            const blend = engine.experience.gallery.getPlaneBlendData(engine.camera.position.z);
            if (blend) {
              idx = blend.blend >= 0.5 ? blend.nextPlaneIndex : blend.currentPlaneIndex;
            }
          }
          if (idx !== activeIdxRef.current) {
            activeIdxRef.current = idx;
            setActiveIdx(idx);
          }

          // 3. Card row travels from top (8%) to bottom (78%) of the viewport
          if (cardRowRef.current) {
            const startTop = 0.08;
            const endTop = 0.78;
            const ratio = startTop + progress * (endTop - startTop);
            cardRowRef.current.style.top = `${ratio * 100}%`;
          }
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [engineReady, prefersReducedMotion] }
  );

  const currentService = SERVICES[activeIdx];
  const currentArchetype = ARCHETYPE_BY_ID[currentService.id];

  return (
    <section
      ref={sectionRef}
      aria-label="Services — six disciplines"
      className="relative w-full bg-black text-white"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        {/* Codrops WebGL canvas — black background, depth gallery in 3D */}
        <canvas
          ref={canvasRef}
          className="webgl absolute inset-0 block h-full w-full"
          aria-hidden
        />

        {/* Center highlight ring + soft glow over the active slide */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[48vh] w-[36vh] -translate-x-1/2 -translate-y-1/2 rounded-[4px]"
          style={{
            boxShadow: `inset 0 0 0 1px ${currentArchetype.color}33, 0 0 80px 8px ${currentArchetype.color}1f`,
            transition: "box-shadow 0.6s ease-out",
          }}
        />

        {/* Section label */}
        <div className="pointer-events-none absolute left-1/2 top-10 z-[5] -translate-x-1/2">
          <p
            className="font-mono text-[11px] uppercase text-white/55"
            style={{ letterSpacing: "0.3em" }}
          >
            02 / SERVICES
          </p>
        </div>

        {/* Text overlay — bottom-center, shows active service */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[12vh] z-[4] flex justify-center px-6">
          <div className="mx-auto max-w-[820px] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-${activeIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <div className="inline-flex items-center gap-2.5">
                  <span
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{
                      background: currentArchetype.color,
                      boxShadow: `0 0 12px ${currentArchetype.color}`,
                    }}
                    aria-hidden
                  />
                  <p
                    className="font-mono text-[11px] uppercase text-white/70"
                    style={{ letterSpacing: "0.28em" }}
                  >
                    {currentService.index} / {currentService.discipline}
                  </p>
                </div>

                <h2
                  className="mt-6 font-display font-bold text-balance"
                  style={{
                    fontSize: "clamp(28px, 4vw, 56px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.03em",
                    color: currentArchetype.color,
                    textShadow: "0 4px 32px rgba(0,0,0,0.7)",
                  }}
                >
                  {currentService.headline}
                </h2>

                <p className="mx-auto mt-4 max-w-[600px] text-[13px] leading-[1.6] text-white/70 md:text-[15px]">
                  {currentService.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Card row — starts near top, travels to bottom as section scrolls */}
        <div
          ref={cardRowRef}
          className="pointer-events-auto absolute inset-x-0 z-[6] flex -translate-y-1/2 justify-center will-change-[top]"
          style={{ top: "8%" }}
          aria-label="Service cards"
        >
          <div className="flex items-end gap-3 px-6 md:gap-4 lg:gap-5">
            {SERVICES.map((service, i) => {
              const archetype = ARCHETYPE_BY_ID[service.id];
              const isActive = i === activeIdx;
              const delta = Math.abs(i - activeIdx);
              const rotation = (i - (COUNT - 1) / 2) * 2.5;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    if (!sectionRef.current) return;
                    const sectionTop = sectionRef.current.offsetTop;
                    const sectionH = sectionRef.current.offsetHeight;
                    const scrollable = sectionH - window.innerHeight;
                    const targetY = sectionTop + (scrollable * (i + 0.5)) / COUNT;
                    window.scrollTo({ top: targetY, behavior: "smooth" });
                  }}
                  aria-label={`Go to ${service.discipline}`}
                  aria-current={isActive ? "true" : undefined}
                  className="relative block aspect-[5/7] cursor-pointer overflow-hidden rounded-[6px] border-0 bg-transparent p-0 outline-none transition-[width,filter,transform,opacity] duration-[400ms] will-change-transform"
                  style={{
                    width: isActive ? 108 : 60,
                    transform: `rotate(${rotation}deg) translateY(${isActive ? -14 : 0}px)`,
                    transformOrigin: "bottom center",
                    opacity: isActive ? 1 : Math.max(0.32, 1 - delta * 0.18),
                    filter: isActive
                      ? `drop-shadow(0 18px 36px ${archetype.color}dd) saturate(1.25)`
                      : `drop-shadow(0 8px 18px rgba(0,0,0,0.5)) saturate(0.6) brightness(0.75)`,
                    zIndex: isActive ? 10 : 5 - delta,
                  }}
                >
                  <Image
                    src={archetype.card}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 768px) 80px, 108px"
                    className="select-none object-cover"
                    draggable={false}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[5] flex justify-center">
          <div className="flex items-center gap-3">
            <p
              className="font-mono text-[10px] uppercase text-white/40"
              style={{ letterSpacing: "0.3em" }}
            >
              {String(activeIdx + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
            </p>
            <div className="h-px w-24 bg-white/15">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${((activeIdx + 1) / COUNT) * 100}%`,
                  background: currentArchetype.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
