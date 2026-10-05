"use client";

import { useEffect, useRef, useState } from "react";

// Scattered problems fall into a messy pile, then get solved one at a time and
// settle into an ordered grid — the mess becoming one system. Paced slowly on
// purpose so the problems don't read as trivial.
const SCATTER = [
  { x: 4, y: 8, r: -9 },
  { x: 44, y: 2, r: 7 },
  { x: 18, y: 30, r: 4 },
  { x: 52, y: 28, r: -12 },
  { x: 2, y: 54, r: 11 },
  { x: 40, y: 56, r: -5 },
  { x: 14, y: 78, r: -3 },
  { x: 50, y: 80, r: 9 },
];

const STEP_MS = 520;

export function ProblemPile({ problems }: { problems: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [solved, setSolved] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [cols, setCols] = useState(2);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setCols(mq.matches ? 2 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDropped(true);
      setSolved(problems.length);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDropped(true);
        problems.forEach((_, i) => {
          timers.push(setTimeout(() => setSolved(i + 1), 1400 + i * STEP_MS));
        });
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [problems]);

  const allSolved = solved === problems.length;

  return (
    <div>
      <div
        ref={ref}
        className="relative h-[440px] overflow-hidden border border-line bg-sheet sm:h-[400px]"
        role="img"
        aria-label={`Problems I take off your plate: ${problems.join(", ")}.`}
      >
        {problems.map((p, i) => {
          const s = SCATTER[i % SCATTER.length];
          const isSolved = i < solved;
          // Ordered state: a grid centred in the box — two columns on wider
          // screens, one on phones so labels never truncate.
          const rowH = cols === 2 ? 60 : 48;
          const rows = Math.ceil(problems.length / cols);
          const col = i % cols;
          const row = Math.floor(i / cols);
          const pos = isSolved
            ? {
                left: `calc(${(col * 100) / cols}% + 16px)`,
                top: `calc(50% - ${(rows * rowH) / 2 + 8}px + ${row * rowH}px)`,
                rotate: 0,
              }
            : { left: `${s.x}%`, top: dropped ? `${s.y}%` : "-20%", rotate: s.r };
          return (
            <span
              key={p}
              aria-hidden
              className={`absolute inline-flex items-center gap-2 whitespace-nowrap border px-3 py-2 text-[13px] font-medium transition-all duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] sm:px-4 sm:text-sm ${
                isSolved
                  ? "border-clay bg-clay text-paper"
                  : "border-ink/25 bg-paper text-ink"
              }`}
              style={{
                maxWidth: `calc(${100 / cols}% - 24px)`,
                left: pos.left,
                top: pos.top,
                transform: `rotate(${pos.rotate}deg)`,
                transitionDelay: !isSolved && dropped ? `${i * 70}ms` : "0ms",
              }}
            >
              <span
                className={`inline-block overflow-hidden transition-all duration-500 ${
                  isSolved ? "w-3.5 opacity-100" : "w-0 opacity-0"
                }`}
              >
                ✓
              </span>
              <span className="truncate">{p}</span>
            </span>
          );
        })}
        <p
          aria-hidden
          className={`label absolute bottom-4 left-4 transition-opacity duration-700 ${
            allSolved ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-clay">●</span>&nbsp; One system
        </p>
      </div>
    </div>
  );
}
