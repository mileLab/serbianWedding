"use client";

import { useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    // Media query state is unknowable during SSR; syncing in a layout effect
    // (not a plain effect) resolves the real value before paint, so it lands
    // in the same pre-paint commit as consumers' own layout effects and
    // avoids a flash of the wrong (desktop) branch on mobile.
    setIsMobile(query.matches);
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
