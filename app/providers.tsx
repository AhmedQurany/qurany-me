"use client";

import { LenisProvider } from "@/components/LenisProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransitionProvider } from "@/components/PageTransition";

export function ThemeProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <PageTransitionProvider>
        {children}
        <CustomCursor />
      </PageTransitionProvider>
    </LenisProvider>
  );
}
