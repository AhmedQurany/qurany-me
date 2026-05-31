import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Ten principles for designers who refuse to be replaced. The Ultimate Designer manifesto by Ahmed Qurany.",
};

export default function ManifestoPage() {
  const t = useTranslations("page.manifesto");
  const principles = t.raw("principles") as string[];

  return (
    <PageShell eyebrow={t("eyebrow")} headline={t("headline")}>
      <ol className="mt-16 border-t border-border">
        {principles.map((p, i) => (
          <li
            key={i}
            className="grid grid-cols-[60px_1fr] gap-6 border-b border-border py-8 md:grid-cols-[80px_1fr] md:gap-10 md:py-10"
          >
            <span className="font-mono text-[14px] tracking-mono-wider text-text-tertiary md:text-[16px]">
              0{i + 1}
            </span>
            <p className="font-display text-[22px] font-semibold leading-tight tracking-tight text-text-primary md:text-[28px]">
              {p}
            </p>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
