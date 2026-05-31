import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, isLocale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const stored = cookieStore.get("locale")?.value;
  const locale = isLocale(stored) ? stored : DEFAULT_LOCALE;

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
