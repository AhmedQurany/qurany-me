"use client";

import { useRef } from "react";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { useTranslations } from "next-intl";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ARCHETYPE_BY_ID } from "@/lib/archetypes";
import { WORK_VISUALS, NOISE_DATA_URI } from "@/lib/work";

type WorkItem = { client: string; title: string; tag: string };

export function FeaturedWork() {
  const t = useTranslations("work");
  const items = t.raw("items") as WorkItem[];
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll choreography per project moment
  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const moments = containerRef.current.querySelectorAll(
        "[data-moment]"
      ) as NodeListOf<HTMLElement>;

      moments.forEach((moment) => {
        const bg = moment.querySelector("[data-bg]") as HTMLElement;
        const stage = moment.querySelector("[data-stage]") as HTMLElement;
        const lines = moment.querySelectorAll(
          "[data-reveal]"
        ) as NodeListOf<HTMLElement>;

        // Reveal animation when moment enters the viewport
        gsap.from(lines, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: moment,
            start: "top 70%",
            once: true,
          },
        });

        // Subtle bg parallax — bg moves slower than content
        if (bg) {
          gsap.fromTo(
            bg,
            { yPercent: -8, scale: 1.05 },
            {
              yPercent: 8,
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: moment,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // Centerpiece scales slightly as it enters and exits
        if (stage) {
          gsap.fromTo(
            stage,
            { scale: 0.92, opacity: 0.85 },
            {
              scale: 1,
              opacity: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: moment,
                start: "top 80%",
                end: "top 40%",
                scrub: 0.6,
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative w-full"
    >
      {/* Intro / section label */}
      <div className="container-x pb-16 pt-24 md:pb-24 md:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
          {t("eyebrow")}
        </p>
        <h2
          id="work-heading"
          className="mt-6 max-w-3xl font-display text-display-lg text-text-primary text-balance"
        >
          {t("headline")}
        </h2>
      </div>

      {/* Stacked cinematic moments */}
      <div ref={containerRef} className="relative w-full">
        {items.map((it, i) => {
          const visual = WORK_VISUALS[i];
          const archA = ARCHETYPE_BY_ID[visual.archetypes[0]];
          const archB = ARCHETYPE_BY_ID[visual.archetypes[1]];
          return (
            <article
              key={it.client}
              data-moment
              className="relative flex w-full items-center justify-center overflow-hidden"
              style={{ minHeight: "100vh" }}
            >
              {/* Parallax background */}
              <div
                data-bg
                aria-hidden
                className="absolute inset-0 will-change-transform"
                style={{ background: visual.gradient }}
              />
              {/* Noise overlay */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-50"
                style={{ backgroundImage: NOISE_DATA_URI }}
              />
              {/* Vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
                }}
              />

              {/* Centerpiece content */}
              <div
                data-stage
                className="container-x relative z-10 grid items-center gap-12 py-16 md:grid-cols-[1fr_1.2fr] md:py-24"
              >
                {/* Left — copy */}
                <div className="flex flex-col items-start text-left">
                  <p
                    data-reveal
                    className="font-mono text-[11px] uppercase text-white/65"
                    style={{ letterSpacing: "0.3em" }}
                  >
                    0{i + 1} / {it.tag}
                  </p>

                  <p
                    data-reveal
                    className="mt-8 font-mono text-[13px] uppercase tracking-mono-wider text-white/80"
                  >
                    {it.client}
                  </p>

                  <h3
                    data-reveal
                    className="mt-4 font-display font-bold text-white text-balance"
                    style={{
                      fontSize: "clamp(28px, 3.6vw, 56px)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {it.title}
                  </h3>

                  {/* Archetype tags */}
                  <div data-reveal className="mt-8 flex flex-wrap gap-2">
                    {[archA, archB].map((a) => (
                      <span
                        key={a.id}
                        className="inline-flex items-center font-mono text-[10px] uppercase"
                        style={{
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: a.color,
                          color: a.color,
                          padding: "5px 9px",
                          letterSpacing: "0.18em",
                        }}
                      >
                        {a.id}
                      </span>
                    ))}
                  </div>

                  <div data-reveal className="mt-10">
                    <span
                      className="inline-flex items-center gap-2 border-b border-white/40 pb-1 font-mono text-[11px] uppercase tracking-mono-wider text-white/85"
                      aria-disabled="true"
                    >
                      Read case study
                      <span aria-hidden className="arrow-rtl">
                        ↗
                      </span>
                    </span>
                  </div>
                </div>

                {/* Right — placeholder visual (will be replaced by real shot) */}
                <div
                  data-reveal
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: visual.gradient,
                      filter: "saturate(1.3) contrast(1.05)",
                    }}
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay opacity-70"
                    style={{ backgroundImage: NOISE_DATA_URI }}
                  />
                  <div
                    className="absolute inset-0 border border-white/15"
                    style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)" }}
                  />
                  <div className="absolute left-4 top-4">
                    <span
                      className="font-mono text-[10px] uppercase text-white/65"
                      style={{ letterSpacing: "0.25em" }}
                    >
                      Placeholder
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* View all */}
      <div className="container-x pb-24 pt-16 md:pb-32 md:pt-24">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 border-b border-text-primary pb-1 font-mono text-[11px] uppercase tracking-mono-wider text-text-primary"
        >
          {t("viewAll")}{" "}
          <span aria-hidden className="arrow-rtl">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
