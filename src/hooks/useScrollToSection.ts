"use client";

import { useCallback } from "react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

export function useScrollToSection() {
  const lenisRef = useLenis();

  return useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenisRef]
  );
}
