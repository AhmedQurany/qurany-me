"use client";

import { useEffect, useRef, useState } from "react";
import { contact, menu } from "@/content/profile";

function cairoTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: contact.timeZone,
  }).format(new Date());
}

// Square message + sliders glyph standing in for the Figma "SDS filter-setting" icon.
function MoreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="15" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 21l2.5-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 8.5h10M7 12.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="8.5" r="1.6" fill="currentColor" />
      <circle cx="14" cy="12.5" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function TopBar() {
  const [time, setTime] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTime(cairoTime());
    const id = setInterval(() => setTime(cairoTime()), 15_000);
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter] duration-300 ${
        solid ? "bg-maroon/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="flex h-14 items-center justify-between px-5 md:px-8">
        <a href="#top" className="text-base">
          Qurany
        </a>
        <p className="text-base tabular-nums" aria-label="Local time in Cairo" title="Local time in Cairo">
          {time ?? "Cairo"}
        </p>
        <div ref={panelRef} className="relative">
          <button
            type="button"
            className="flex items-center gap-1 text-base"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            More <MoreIcon />
          </button>
          <nav
            id="site-menu"
            aria-label="Site"
            hidden={!open}
            className="absolute right-0 top-10 w-60 overflow-hidden rounded-3xl border border-white/25 bg-maroon/80 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <ul>
              {menu.map((m) => {
                const external = m.href.startsWith("http");
                return (
                  <li key={m.href}>
                    <a
                      href={m.href}
                      onClick={() => setOpen(false)}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="block rounded-2xl px-4 py-3 text-lead transition-colors hover:bg-white/10"
                    >
                      {m.label}
                      {external && <span aria-hidden> ↗</span>}
                    </a>
                  </li>
                );
              })}
              <li className="p-1 pt-2">
                <a href={contact.cta} className="glass w-full !py-3">
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
