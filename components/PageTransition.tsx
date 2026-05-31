"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

type TransitionAPI = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionAPI>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

const ANIM_MS = 500;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // On pathname change, animate the overlay back out (uncover).
  useEffect(() => {
    if (!overlayRef.current) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(overlayRef.current, { scaleY: 0 });
      isAnimatingRef.current = false;
      return;
    }

    gsap.to(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top",
      duration: ANIM_MS / 1000,
      ease: "power4.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (isAnimatingRef.current) return;
      if (!overlayRef.current) {
        router.push(href);
        return;
      }
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        router.push(href);
        return;
      }

      isAnimatingRef.current = true;
      gsap.to(overlayRef.current, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: ANIM_MS / 1000,
        ease: "power4.inOut",
        onComplete: () => {
          // Navigate after the overlay covers the screen
          router.push(href);
          // Scroll to top so the next page starts clean
          window.scrollTo(0, 0);
        },
      });
    },
    [router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background: "var(--archetype-color)",
          transform: "scaleY(0)",
          transformOrigin: "top",
          willChange: "transform",
        }}
        aria-hidden
      />
    </TransitionContext.Provider>
  );
}
