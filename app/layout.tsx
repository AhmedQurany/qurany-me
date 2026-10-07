import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import { contact, experience, socials } from "@/content/profile";
import { hasPublic } from "@/lib/assets";
import "./globals.css";

// Lufga (the Figma typeface) is a licensed font. Drop Lufga-Regular.woff2 and
// Lufga-Medium.woff2 into public/fonts and it is picked up; until then Outfit,
// the closest free geometric sans, stands in.
const fallback = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fallback",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-syne",
  display: "swap",
});

const lufgaFaces = [
  { file: "/fonts/Lufga-Regular.woff2", weight: 400 },
  { file: "/fonts/Lufga-Medium.woff2", weight: 500 },
]
  .filter((f) => hasPublic(f.file))
  .map(
    (f) =>
      `@font-face{font-family:"Lufga";src:url("${f.file}") format("woff2");font-weight:${f.weight};font-style:normal;font-display:swap}`,
  )
  .join("");

const title = "Ahmed Qurany — Creative Experience Architect";
const description =
  "One designer who sees the whole system — strategy, interface, and build. 11+ years, 500+ projects across brand, product, and design systems. Based in Cairo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://qurany.me"),
  title: { default: title, template: "%s · Ahmed Qurany" },
  description,
  authors: [{ name: "Ahmed Qurany" }],
  creator: "Ahmed Qurany",
  keywords: [
    "Ahmed Qurany",
    "Creative Experience Architect",
    "Design Systems",
    "Product Designer",
    "Brand Strategy",
    "UX/UI",
    "Cairo",
  ],
  openGraph: {
    type: "website",
    url: "https://qurany.me",
    siteName: "qurany.me",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3A1015",
};

const current = experience.find((r) => r.end === "Present" && r.company !== "Qurany Studio");

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmed Qurany",
  url: "https://qurany.me",
  jobTitle: current?.role,
  worksFor: current ? { "@type": "Organization", name: current.company } : undefined,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  email: `mailto:${contact.email}`,
  sameAs: socials.map((s) => s.href),
  alumniOf: { "@type": "CollegeOrUniversity", name: "New Cairo Academy" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fallback.variable} ${syne.variable}`}>
      <head>{lufgaFaces ? <style dangerouslySetInnerHTML={{ __html: lufgaFaces }} /> : null}</head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
