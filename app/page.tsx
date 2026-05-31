import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { Problem } from "@/components/sections/Problem";
import { Method } from "@/components/sections/Method";
import { CinematicWork } from "@/components/sections/CinematicWork";
import { Numbers } from "@/components/sections/Numbers";
import { ManifestoTeaser } from "@/components/sections/ManifestoTeaser";
import { CtaSection } from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Nav />
      <main id="main">
        <Hero />
        <ServicesSection />
        <Problem />
        <Method />
        <Numbers />
        <CinematicWork />
        <ManifestoTeaser />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
