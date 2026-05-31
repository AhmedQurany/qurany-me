"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Ported Codrops Scroll3DGrid utility: groups items into rows by their
// vertical position, optionally filtering even/odd.
// Source: https://github.com/codrops/Scroll3DGrid/blob/main/js/utils.js
function getRowsHelper(elements: HTMLElement[]) {
  let bounds = elements.map((el) => el.getBoundingClientRect());
  const rows = (alternating?: "even" | "odd", merge?: boolean) => {
    const subsets: Record<number, HTMLElement[]> = {};
    bounds.forEach((b, i) => {
      const position = Math.round(b.top + b.height / 2);
      if (!subsets[position]) subsets[position] = [];
      subsets[position].push(elements[i]);
    });
    let groups = Object.values(subsets);
    if (alternating) {
      const onlyEven = alternating === "even";
      groups = groups.filter((_, i) => !(i % 2) === onlyEven);
    }
    if (merge) return groups.flat();
    return groups;
  };
  const refresh = () => {
    bounds = elements.map((el) => el.getBoundingClientRect());
  };
  return { rows, refresh };
}

// 48 demo images via picsum — replace with real work shots when ready.
const IMAGE_COUNT = 48;

export function Numbers() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const images = useMemo(
    () =>
      Array.from(
        { length: IMAGE_COUNT },
        (_, i) => `https://picsum.photos/seed/qurany-grid-${i + 1}/700/1050`
      ),
    []
  );

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const grid = sectionRef.current.querySelector(".s3g-grid") as HTMLElement;
      if (!grid) return;
      const gridWrap = grid.querySelector(".s3g-grid-wrap") as HTMLElement;
      const gridItems = Array.from(
        grid.querySelectorAll(".s3g-grid__item")
      ) as HTMLElement[];
      if (!gridWrap || gridItems.length === 0) return;

      // type5 specific overrides (the brick-staggered animation)
      grid.style.setProperty("--s3g-grid-width", "120%");
      grid.style.setProperty("--s3g-grid-columns", "8");
      grid.style.setProperty("--s3g-grid-gap", "0");

      if (prefersReducedMotion) {
        // Static layout — flat, no animation
        gsap.set(gridWrap, { rotationX: 0 });
        gsap.set(gridItems, { filter: "brightness(70%)" });
        return;
      }

      const gridObj = getRowsHelper(gridItems);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: gridWrap,
            start: "top bottom+=5%",
            end: "bottom top-=5%",
            scrub: true,
          },
        });

        // Stagger each item by a tiny translateZ to defeat z-fighting when
        // items overlap after the row shuffle / random yPercent. Without this,
        // Chrome's 3D compositor flips which item is on top frame-to-frame,
        // producing a flicker. Pairs with backface-visibility:hidden in CSS.
        tl.set(gridItems, {
          z: (i: number) => i * 0.5,
          force3D: true,
        })
          .set(gridWrap, { rotationX: 50 })
          .to(gridWrap, { rotationX: 30 })
          .fromTo(
            gridItems,
            { filter: "brightness(0%)" },
            { filter: "brightness(100%)" },
            0
          )
          .to(
            gridObj.rows("even"),
            { xPercent: -100, ease: "power1" },
            0
          )
          .to(
            gridObj.rows("odd"),
            { xPercent: 100, ease: "power1" },
            0
          )
          .addLabel("rowsEnd", ">-=0.15")
          .to(
            gridItems,
            {
              ease: "power1",
              yPercent: () => gsap.utils.random(-100, 200),
            },
            "rowsEnd"
          );

        // Recompute bounds on resize so the row grouping stays correct
        const onResize = () => gridObj.refresh();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="numbers-heading"
      className="s3g relative w-full overflow-hidden bg-black"
    >
      <div className="s3g-content">
        <div className="s3g-grid">
          <div className="s3g-grid-wrap">
            {images.map((src, i) => (
              <div key={i} className="s3g-grid__item" aria-hidden>
                <div
                  className="s3g-grid__item-inner"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            ))}
          </div>
        </div>
        <h2 id="numbers-heading" className="s3g-content__title">
          Eleven years.
          <br />
          500+ projects unfolding.
        </h2>
      </div>
    </section>
  );
}
