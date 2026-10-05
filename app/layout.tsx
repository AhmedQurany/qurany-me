import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter_Tight } from "next/font/google";
import { contact, experience, socials } from "@/content/profile";
import "./globals.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F4EF" },
    { media: "(prefers-color-scheme: dark)", color: "#12100E" },
  ],
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
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
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
