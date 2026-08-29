"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Media query state is unknowable during SSR; syncing in a layout effect
    // (not a plain effect) resolves the real value before paint, so it lands
    // in the same pre-paint commit as consumers' own layout effects and
    // avoids a flash of the wrong (desktop) branch on mobile.
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
