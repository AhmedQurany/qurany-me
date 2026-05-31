import { useTranslations } from "next-intl";

const social = [
  { key: "email" as const, href: "mailto:hello@qurany.me" },
  { key: "linkedin" as const, href: "https://www.linkedin.com/in/ahmedqurany" },
  { key: "behance" as const, href: "https://www.behance.net/ahmedqurany" },
  { key: "udl" as const, href: "https://udl.events" },
  { key: "instagram" as const, href: "https://www.instagram.com/ahmedqurany" },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative border-t border-border overflow-hidden">
      {/* Kinetic marquee — oversized brand statement that scrolls forever */}
      <div className="relative w-full overflow-hidden border-b border-border py-10 md:py-16">
        <div
          className="flex w-max gap-12 whitespace-nowrap will-change-transform"
          style={{
            animation: "marquee 55s linear infinite",
          }}
          aria-hidden
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-extrabold italic"
              style={{
                fontSize: "clamp(72px, 14vw, 220px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "var(--archetype-color)",
                WebkitTextStroke: "0",
                opacity: 0.85,
                textShadow: "0 6px 40px rgba(0,0,0,0.5)",
                transition: "color 0.6s ease-out",
              }}
            >
              ULTIMATE DESIGNER ·
            </span>
          ))}
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr] md:gap-24 md:py-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
            10 / OFFLINE
          </p>
          <p className="mt-6 max-w-md font-display text-[28px] font-semibold leading-[1.15] tracking-tight text-text-primary">
            {t("tagline")}
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
            Channels
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-2">
            {social.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target={s.key === "email" ? undefined : "_blank"}
                  rel={s.key === "email" ? undefined : "noopener noreferrer"}
                  className="group inline-flex items-baseline gap-2 font-mono text-[12px] uppercase tracking-mono-wide text-text-primary transition-colors hover:text-accent"
                >
                  {t(`links.${s.key}` as const)}
                  <span
                    aria-hidden
                    className="arrow-rtl transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-mono-wide text-text-tertiary">
            {t("copyright")}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-mono-wide text-text-tertiary">
            qurany.me / v1.0
          </p>
        </div>
      </div>
    </footer>
  );
}
