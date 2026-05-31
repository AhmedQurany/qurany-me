import type { Metadata, Viewport } from "next";
import {
  Archivo,
  JetBrains_Mono,
  Noto_Kufi_Arabic,
  Cormorant_Garamond,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { dirOf, isLocale, DEFAULT_LOCALE } from "@/i18n/config";
import { ThemeProviderClient } from "./providers";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-noto-kufi-arabic",
  display: "swap",
});

// Serif for the Numbers section editorial overlay
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://qurany.me"),
  title: {
    default:
      "Ahmed Qurany — Ultimate Designer | Senior Product Designer & Brand Strategist",
    template: "%s · Ahmed Qurany",
  },
  description:
    "Senior Product Designer & Brand Strategist. 11 years. 500+ projects. For founders who refuse to settle for execution-only design.",
  applicationName: "qurany.me",
  authors: [{ name: "Ahmed Qurany" }],
  creator: "Ahmed Qurany",
  keywords: [
    "Ahmed Qurany",
    "Ultimate Designer",
    "Product Designer",
    "Brand Strategist",
    "Design Systems",
    "UX Designer",
    "Cairo Designer",
    "Founder Designer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qurany.me",
    title:
      "Ahmed Qurany — Ultimate Designer | Senior Product Designer & Brand Strategist",
    description:
      "Senior Product Designer & Brand Strategist. 11 years. 500+ projects.",
    siteName: "qurany.me",
    images: [
      {
        url: "/images/archetype-magician.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Qurany — Ultimate Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Qurany — Ultimate Designer",
    description:
      "Senior Product Designer & Brand Strategist. 11 years. 500+ projects.",
    images: ["/images/archetype-magician.png"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rawLocale = await getLocale();
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const messages = await getMessages();
  const dir = dirOf(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${archivo.variable} ${jetbrainsMono.variable} ${notoKufi.variable} ${cormorant.variable}`}
    >
      <head>
        {/* Adobe Fonts (Typekit) — macula-line for the Clients title */}
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://use.typekit.net/yxf3ioc.css" />
      </head>
      <body className={locale === "ar" ? "font-arabic" : "font-sans"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProviderClient>{children}</ThemeProviderClient>
        </NextIntlClientProvider>

        {/* Schema.org Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ahmed Qurany",
              jobTitle: "Senior Product Designer & Brand Strategist",
              description:
                "Ultimate Designer. 11 years, 500+ projects shipped.",
              url: "https://qurany.me",
              sameAs: [
                "https://www.linkedin.com/in/ahmedqurany",
                "https://www.behance.net/ahmedqurany",
                "https://www.instagram.com/ahmedqurany",
              ],
              address: { "@type": "PostalAddress", addressLocality: "Cairo" },
            }),
          }}
        />
      </body>
    </html>
  );
}
