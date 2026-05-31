import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Ahmed Qurany — case studies of products, brands, and systems shipped in the last 11 years.",
};

export default function WorkPage() {
  const t = useTranslations("page.work");
  return (
    <PageShell eyebrow={t("eyebrow")} headline={t("headline")}>
      <p className="mt-10 max-w-2xl text-body-lg text-text-secondary">
        {t("body")}
      </p>
    </PageShell>
  );
}
