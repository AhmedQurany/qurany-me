import { TransitionLink as Link } from "@/components/TransitionLink";
import { useTranslations } from "next-intl";
import { SplitReveal, FadeReveal } from "@/components/SplitReveal";

export function ManifestoTeaser() {
  const t = useTranslations("manifestoTeaser");

  return (
    <section className="section-y" aria-labelledby="manifesto-teaser-heading">
      <div className="container-x">
        <FadeReveal y={12}>
          <p
            id="manifesto-teaser-heading"
            className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary"
          >
            {t("eyebrow")}
          </p>
        </FadeReveal>

        <SplitReveal
          as="blockquote"
          splitBy="lines,words"
          stagger={0.05}
          className="mt-10 max-w-5xl font-display text-[clamp(32px,4.4vw,64px)] font-bold leading-[1.05] tracking-tight text-text-primary text-balance"
        >
          {t("quote")}
        </SplitReveal>

        <FadeReveal delay={0.2} y={16}>
          <Link
            href="/manifesto"
            className="mt-12 inline-flex items-center gap-2 border-b border-text-primary pb-1 font-mono text-[11px] uppercase tracking-mono-wider text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            {t("cta")}
            <span aria-hidden className="arrow-rtl">
              →
            </span>
          </Link>
        </FadeReveal>
      </div>
    </section>
  );
}
