import { useTranslations } from "next-intl";
import { SplitReveal, FadeReveal } from "@/components/SplitReveal";

type Step = { number: string; title: string; body: string };

export function Method() {
  const t = useTranslations("method");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      className="section-y border-t border-border bg-surface/20"
      aria-labelledby="method-heading"
    >
      <div className="container-x">
        <FadeReveal y={12}>
          <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
            {t("eyebrow")}
          </p>
        </FadeReveal>
        <SplitReveal
          as="h2"
          splitBy="lines,words"
          className="mt-6 max-w-3xl font-display text-display-lg text-text-primary text-balance"
        >
          {t("headline")}
        </SplitReveal>

        <ol className="mt-16 grid gap-px border border-border bg-border md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeReveal key={step.number} delay={0.08 * i} y={32} as="li">
              <div className="group relative flex h-full flex-col bg-bg p-8 transition-colors duration-300 hover:bg-surface">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-mono-wider text-text-tertiary">
                    {step.number}
                  </span>
                  <span
                    className="block h-1.5 w-1.5 rounded-full opacity-50 transition-opacity group-hover:opacity-100"
                    style={{ background: "var(--archetype-color)" }}
                    aria-hidden
                  />
                </div>
                <p className="mt-12 font-display text-[28px] font-bold leading-tight tracking-tight text-text-primary md:text-[32px]">
                  {step.title}
                </p>
                <p className="mt-3 text-body-md text-text-secondary">
                  {step.body}
                </p>
              </div>
            </FadeReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
