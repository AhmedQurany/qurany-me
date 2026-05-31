"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TransitionLink } from "@/components/TransitionLink";
import { Magnetic } from "@/components/Magnetic";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="relative flex min-h-[80vh] items-center">
        <div className="container-x py-24 md:py-32">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="font-mono text-[11px] uppercase tracking-mono-wider text-text-tertiary"
          >
            404 / OFF THE MAP
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.9,
              ease: [0.32, 0.72, 0, 1],
              delay: 0.1,
            }}
            className="mt-8 max-w-4xl font-display font-extrabold text-text-primary text-balance"
            style={{
              fontSize: "clamp(48px, 7vw, 112px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            This page is being{" "}
            <span style={{ color: "var(--archetype-color)" }}>designed</span>.
            Try the front door.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.35 }}
            className="mt-8 max-w-xl text-body-lg text-text-secondary"
          >
            Wrong turn. The path you wanted doesn&apos;t exist here. Head home,
            or send a quick note and I&apos;ll point you the right way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1], delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            <Magnetic>
              <TransitionLink href="/" className="btn-primary">
                Home <span aria-hidden>→</span>
              </TransitionLink>
            </Magnetic>
            <a
              href="mailto:hello@qurany.me"
              className="btn-ghost"
            >
              Email <span aria-hidden>↗</span>
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
