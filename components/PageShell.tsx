import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function PageShell({
  eyebrow,
  headline,
  children,
}: {
  eyebrow: string;
  headline: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="section-y" aria-labelledby="page-heading">
          <div className="container-x">
            <p className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary">
              {eyebrow}
            </p>
            <h1
              id="page-heading"
              className="mt-8 max-w-5xl font-display text-display-xl text-text-primary text-balance"
            >
              {headline}
            </h1>
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
