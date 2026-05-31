"use client";

import { useTranslations } from "next-intl";

export function ProofStrip() {
  const t = useTranslations("proof");
  const clients = t("clients");

  return (
    <section
      aria-label="Trusted clients"
      className="group relative border-y border-border bg-surface/40 py-7 overflow-hidden"
    >
      <p className="container-x mb-5 font-mono text-[10px] uppercase tracking-mono-wider text-text-tertiary">
        — {t("label")}
      </p>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max gap-12 whitespace-nowrap will-change-transform"
          style={{
            animation: "marquee 38s linear infinite",
            animationPlayState: "running",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationDuration = "120s";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.animationDuration = "38s";
          }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[14px] uppercase tracking-mono-wide text-text-secondary transition-colors duration-500 group-hover:text-text-primary"
              aria-hidden={i === 1 ? true : undefined}
            >
              {clients}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
