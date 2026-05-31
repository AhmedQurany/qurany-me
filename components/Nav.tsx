"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LocaleToggle } from "./LocaleToggle";
import { Magnetic } from "./Magnetic";
import { TransitionLink } from "./TransitionLink";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/work", key: "work" as const },
  { href: "/process", key: "process" as const },
  { href: "/manifesto", key: "manifesto" as const },
  { href: "/services", key: "about" as const },
];

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-[68px] items-center">
        {/* Left — logo */}
        <div className="flex flex-1 items-center">
          <TransitionLink
            href="/"
            className="font-mono text-[15px] font-semibold tracking-mono-wide text-text-primary"
            aria-label="Ahmed Qurany — home"
          >
            AQ.
          </TransitionLink>
        </div>

        {/* Centered menu cluster with archetype-color hairline */}
        <nav
          className="hidden flex-col items-center gap-1.5 md:flex"
          aria-label="Primary"
        >
          <div className="flex items-center gap-10">
            {links.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-mono-wider text-text-secondary transition-colors hover:text-text-primary"
              >
                {t(l.key)}
              </TransitionLink>
            ))}
          </div>
          <div
            aria-hidden
            className="h-px w-full transition-colors duration-500"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--archetype-color) 28%, var(--archetype-color) 72%, transparent)",
              opacity: 0.7,
            }}
          />
        </nav>

        {/* Right — utilities */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          <LocaleToggle />
          <Magnetic className="hidden md:inline-block">
            <a
              href="mailto:hello@qurany.me?subject=Booking%20a%20call"
              className="btn-primary inline-flex"
            >
              {t("bookCall")} <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-11 w-11 items-center justify-center border border-border md:hidden"
            aria-label={open ? t("menuClose") : t("menuOpen")}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
          <nav
            className="container-x flex flex-col gap-1 py-6"
            aria-label="Mobile"
          >
            {links.map((l) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-4 font-mono text-[12px] uppercase tracking-mono-wide text-text-secondary"
              >
                {t(l.key)}
              </TransitionLink>
            ))}
            <a
              href="mailto:hello@qurany.me?subject=Booking%20a%20call"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 self-start"
            >
              {t("bookCall")} <span aria-hidden>↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
