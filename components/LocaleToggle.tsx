"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";

export function LocaleToggle() {
  const t = useTranslations("nav");
  const current = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setLocale = (next: Locale) => {
    if (next === current) return;
    document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    try {
      localStorage.setItem("qurany-locale", next);
    } catch {
      /* localStorage may be unavailable */
    }
    startTransition(() => router.refresh());
  };

  const safeCurrent: Locale = isLocale(current) ? current : "en";

  return (
    <div
      role="group"
      aria-label={t("localeToggleLabel")}
      className="lg-glass inline-flex h-11 items-stretch overflow-hidden rounded-full p-1"
    >
      {(["en", "ar"] as Locale[]).map((loc) => {
        const active = safeCurrent === loc;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => setLocale(loc)}
            disabled={isPending}
            aria-pressed={active}
            className={`flex w-10 items-center justify-center rounded-full font-mono text-[11px] uppercase tracking-mono-wide transition-all ${
              active
                ? "bg-white/85 text-bg shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
