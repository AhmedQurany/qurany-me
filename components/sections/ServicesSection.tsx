"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SERVICES } from "@/lib/services";
import { ARCHETYPE_BY_ID } from "@/lib/archetypes";

const COUNT = SERVICES.length;
const SLIDE_VH = 100;

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

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<DepthGalleryEngine | null>(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [engineReady, setEngineReady] = useState(false);

  // Mount the Codrops engine once. The canvas wrap is its parent → the Label
  // overlay (the codrops repo's own text system) gets appended as a sibling.
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
        // Page scroll drives the engine — disable its own wheel/touch.
        engineInstance.scroll.unbindEvents();
        if (!cancelled) setEngineReady(true);
      } catch (error) {
        console.error("Codrops engine init failed", error);
      }
    })();

    return () => {
      cancelled = true;
      try {
        engineInstance?.dispose();
      } catch (error) {
        console.warn("Codrops engine dispose failed", error);
      }
      engineRef.current = null;
    };
  }, []);

  // ScrollTrigger pins the stage, drives engine camera + active idx for dock sync.
  useGSAP(
    () => {
      if (!sectionRef.current || !stageRef.current || !engineReady) return;

      // Hide section content initially. It will fade in as the hero cards land.
      if (canvasWrapRef.current) gsap.set(canvasWrapRef.current, { opacity: 0 });
      if (dockRef.current) gsap.set(dockRef.current, { opacity: 0 });

      // Fade-in trigger — runs while the user is scrolling the LAST ~20% of
      // the hero (when hero cards are landing into the dock formation).
      // Uses section 2's own top relative to viewport: starts when section 2's
      // top is 20% down the viewport and ends when it reaches the very top.
      const fadeTargets = [canvasWrapRef.current, dockRef.current].filter(
        (el): el is HTMLDivElement => Boolean(el)
      );
      const fadeTrigger = gsap.to(fadeTargets, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 22%",
          end: "top top",
          scrub: prefersReducedMotion ? false : 0.3,
        },
      });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () =>
          `+=${sectionRef.current!.offsetHeight - window.innerHeight}`,
        pin: stageRef.current!,
        pinSpacing: false,
        scrub: prefersReducedMotion ? false : 0.4,
        onUpdate: (self) => {
          const progress = self.progress;
          const engine = engineRef.current;
          if (!engine) return;

          const bounds = engine.scroll.getScrollBounds();
          engine.scroll.scrollTarget = bounds.min + progress * (bounds.max - bounds.min);

          const blend = engine.experience.gallery.getPlaneBlendData(
            engine.camera.position.z
          );
          let idx = Math.min(
            COUNT - 1,
            Math.max(0, Math.floor(progress * COUNT))
          );
          if (blend) {
            idx = blend.blend >= 0.5 ? blend.nextPlaneIndex : blend.currentPlaneIndex;
          }
          if (idx !== activeIdxRef.current) {
            activeIdxRef.current = idx;
            setActiveIdx(idx);
          }
        },
      });
      return () => {
        trigger.kill();
        fadeTrigger.scrollTrigger?.kill();
      };
    },
    { scope: sectionRef, dependencies: [engineReady, prefersReducedMotion] }
  );

  const currentArchetype = ARCHETYPE_BY_ID[SERVICES[activeIdx].id];

  return (
    <section
      ref={sectionRef}
      data-services-section
      aria-label="Services — six disciplines"
      className="relative w-full bg-black text-white"
      style={{ height: `${COUNT * SLIDE_VH}vh` }}
    >
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-black"
        style={{ height: "100vh" }}
      >
        {/* Subtle radial glow from active archetype color */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-700"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 85%, ${currentArchetype.color}26, transparent 60%), #000`,
          }}
        />

        {/* Codrops canvas + Label overlay (the actual repo effect, full viewport) */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 z-[2]"
        >
          <canvas
            ref={canvasRef}
            className="webgl absolute inset-0 block h-full w-full"
            aria-hidden
          />
          {/* The depth-gallery Label class appends its overlay here as a
              sibling of the canvas. CSS class .plane-label-overlay styles it. */}
        </div>

        {/* Bottom fanned dock */}
        <div
          ref={dockRef}
          className="pointer-events-auto absolute inset-x-0 bottom-12 z-[7] flex justify-center md:bottom-14"
        >
          <div className="flex items-end justify-center">
            {SERVICES.map((service, i) => {
              const archetype = ARCHETYPE_BY_ID[service.id];
              const isActive = i === activeIdx;
              const delta = Math.abs(i - activeIdx);
              const rotation = (i - (COUNT - 1) / 2) * 3;
              const overlap = i === 0 ? 0 : -18;
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
                  className="relative block aspect-[5/7] cursor-pointer overflow-visible rounded-[4px] border-0 bg-transparent p-0 outline-none transition-[width,filter,transform,opacity,margin-left] duration-[400ms]"
                  style={{
                    width: isActive ? 84 : 52,
                    marginLeft: `${overlap}px`,
                    transform: `rotate(${rotation}deg) translateY(${isActive ? -18 : 0}px)`,
                    transformOrigin: "bottom center",
                    opacity: isActive ? 1 : Math.max(0.45, 1 - delta * 0.12),
                    filter: isActive
                      ? `drop-shadow(0 16px 36px ${archetype.color}ee) saturate(1.2)`
                      : `drop-shadow(0 6px 14px rgba(0,0,0,0.6)) saturate(0.7) brightness(0.85)`,
                    zIndex: isActive ? 20 : 10 - delta,
                  }}
                >
                  <div className="relative aspect-[5/7] w-full overflow-hidden rounded-[4px]">
                    <Image
                      src={archetype.card}
                      alt=""
                      aria-hidden
                      fill
                      sizes="80px"
                      className="select-none object-cover"
                      draggable={false}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
