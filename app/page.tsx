import {
  Clients,
  Edge,
  Experience,
  Footer,
  Hero,
  Problem,
  ProcessPanels,
  Udl,
  Work,
} from "@/components/home";
import { TopBar } from "@/components/TopBar";

// Section order follows the "Qurany Glass website" Figma frame; Experience and
// the footer fill the space the frame leaves after the client logos.
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-maroon"
      >
        Skip to content
      </a>
      <TopBar />
      <main id="main">
        <Hero />
        <Problem />
        <ProcessPanels />
        <Edge />
        <Work />
        <Udl />
        <Clients />
        <Experience />
      </main>
      <Footer />
    </>
  );
}
