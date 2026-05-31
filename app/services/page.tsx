import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";

type Tier = { name: string; duration: string; for: string; scope: string };

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three engagement tiers: Sprint, Partner, and Founder Designer. For founders who want a real partner, not a vendor.",
};

export default function ServicesPage() {
  const t = useTranslations("page.services");
  const tiers = t.raw("tiers") as Tier[];

  return (
    <PageShell eyebrow={t("eyebrow")} headline={t("headline")}>
      <div className="mt-16 grid gap-px border border-border bg-border md:mt-20 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <div key={tier.name} className="flex flex-col bg-bg p-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-mono-wider text-text-tertiary">
                0{i + 1}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-mono-wider text-text-tertiary">
                {tier.duration}
              </span>
            </div>
            <p className="mt-12 font-display text-[28px] font-bold leading-tight tracking-tight text-text-primary md:text-[32px]">
              {tier.name}
            </p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-mono-wider text-text-secondary">
              For
            </p>
            <p className="mt-2 text-body-md text-text-primary">{tier.for}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-mono-wider text-text-secondary">
              Scope
            </p>
            <p className="mt-2 text-body-md text-text-secondary">
              {tier.scope}
            </p>
            <a
              href="mailto:hello@qurany.me?subject=Booking%20a%20call"
              className="btn-ghost mt-auto self-start pt-0"
              style={{ marginTop: 48 }}
            >
              Inquire <span aria-hidden>↗</span>
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
