import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The four-move method behind every Ahmed Qurany engagement: See, Solve, Systemize, Scale.",
};

export default function ProcessPage() {
  const t = useTranslations("page.process");
  return (
    <PageShell eyebrow={t("eyebrow")} headline={t("headline")}>
      <p className="mt-10 max-w-2xl text-body-lg text-text-secondary">
        {t("body")}
      </p>
    </PageShell>
  );
}
