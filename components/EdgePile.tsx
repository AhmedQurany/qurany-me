"use client";

import { useEffect, useRef, useState } from "react";

// Pill positions taken from the Figma frame (1920 × 1057 section): horizontal
// centre as % of width, distance of the centre from the section bottom in vw,
// and rotation. Phones get a wrapped pile instead.
const LAYOUT = [
  { x: 23.37, b: 6.99, r: 45, rm: -8 },
  { x: 40.96, b: 8.6, r: 10.82, rm: 6 },
  { x: 54.09, b: 10.05, r: 0, rm: -3 },
  { x: 63.83, b: 6.04, r: 0, rm: 9 },
  { x: 75.94, b: 5.52, r: 26.18, rm: -6 },
  { x: 34.87, b: 4.44, r: -15, rm: 4 },
  { x: 45.6, b: 4.44, r: -15, rm: -10 },
  { x: 55.67, b: 2.81, r: 0, rm: 7 },
  { x: 68.72, b: 2.81, r: 0, rm: -4 },
];

// Problems drop into a pile, then get solved one by one as the visitor keeps
// scrolling — the mess turning into handled work right before Selected Work.
export function EdgePile({ problems }: { problems: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dropped, setDropped] = useState(true);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Only hold the pills back if the pile starts off-screen.
    if (el.getBoundingClientRect().top > window.innerHeight) setDropped(false);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDropped(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    const onScroll = () => {
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - top) / (vh * 0.45)));
      setSolved(Math.round(p * problems.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [problems.length]);

  return (
    <div ref={ref} className="edge-pile" aria-label="Problems I take off your plate" role="list">
      {problems.map((p, i) => {
        const l = LAYOUT[i % LAYOUT.length];
        const isSolved = i < solved;
        return (
          <span
            key={p}
            role="listitem"
            className={`edge-pill ${isSolved ? "is-solved" : ""}`}
            style={
              {
                "--x": `${l.x}%`,
                "--b": `${l.b}vw`,
                "--r": `${l.r}deg`,
                "--rm": `${l.rm}deg`,
                "--dy": dropped ? "0px" : "-120vh",
                transitionDelay: dropped && !isSolved ? `${i * 90}ms` : "0ms",
              } as React.CSSProperties
            }
          >
            <span className="edge-check" aria-hidden>
              ✓
            </span>
            {p}
            {isSolved && <span className="sr-only"> (solved)</span>}
          </span>
        );
      })}
    </div>
  );
}
