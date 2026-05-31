import { useTranslations } from "next-intl";
import { SplitReveal, FadeReveal } from "@/components/SplitReveal";
import { Magnetic } from "@/components/Magnetic";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section
      className="section-y border-t border-border"
      aria-labelledby="cta-heading"
    >
      <div className="container-x">
        <FadeReveal y={12}>
          <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
            {t("eyebrow")}
          </p>
        </FadeReveal>
        <div className="mt-10 grid items-end gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <SplitReveal
            as="h2"
            splitBy="lines,words"
            className="font-display text-display-lg text-text-primary text-balance"
          >
            {t("headline")}
          </SplitReveal>
          <FadeReveal delay={0.15} y={20}>
            <p className="text-body-lg text-text-secondary">{t("body")}</p>
            <Magnetic className="mt-8 inline-block">
              <a
                href="mailto:hello@qurany.me?subject=Booking%20a%20call"
                className="btn-primary inline-flex"
              >
                {t("button")} <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
}
