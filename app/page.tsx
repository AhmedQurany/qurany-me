import {
  Clients,
  Edge,
  Experience,
  FinalCta,
  Hero,
  Problem,
  Process,
  Udl,
  Work,
} from "@/components/sections";
import { SiteFooter, SiteHeader } from "@/components/ui";

// Section order follows the trust sequence: see → believe → be impressed → act.
export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:p-3 focus:text-paper">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Problem />
        <Process />
        <Edge />
        <Experience />
        <Work />
        <Udl />
        <Clients />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
