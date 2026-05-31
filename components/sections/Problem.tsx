import { useTranslations } from "next-intl";
import { SplitReveal, FadeReveal } from "@/components/SplitReveal";

type Column = { label: string; body: string };

const ANTI_ACCENTS = ["#FF3D33", "#FFB800", "#00F0FF"] as const;

export function Problem() {
  const t = useTranslations("problem");
  const columns = t.raw("columns") as Column[];

  return (
    <section className="section-y" aria-labelledby="problem-heading">
      <div className="container-x">
        <FadeReveal y={12}>
          <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
            {t("eyebrow")}
          </p>
        </FadeReveal>
        <SplitReveal
          as="h2"
          splitBy="lines,words"
          className="mt-6 max-w-4xl font-display text-display-lg text-text-primary text-balance"
        >
          {t("headline")}
        </SplitReveal>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-0 md:border md:border-border">
          {columns.map((col, i) => {
            const accent = ANTI_ACCENTS[i];
            return (
              <FadeReveal key={col.label} delay={0.08 * i} y={28}>
                <div
                  className={`card-surface md:border-0 ${
                    i > 0 ? "md:border-l md:border-border" : ""
                  }`}
                  style={{ borderTop: `2px solid ${accent}` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-mono-wider text-text-tertiary">
                      0{i + 1}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-border" />
                    <span
                      className="font-mono text-[10px] uppercase tracking-mono-wider"
                      style={{ color: accent }}
                    >
                      What they deliver
                    </span>
                  </div>
                  <p className="mt-6 font-display text-[22px] font-semibold leading-tight tracking-tight text-text-primary">
                    {col.label}
                  </p>
                  <p className="mt-4 text-body-md text-text-secondary">
                    {col.body}
                  </p>
                </div>
              </FadeReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
