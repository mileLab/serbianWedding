"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type LenisRef = React.RefObject<Lenis | null>;

const LenisContext = createContext<LenisRef | null>(null);

/** Returns a stable ref object; read `.current` at call time (not reactive by design). */
export function useLenis(): LenisRef {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    throw new Error("useLenis must be used within SmoothScrollProvider");
  }
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenisRef.current = instance;

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}
