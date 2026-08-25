"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsapClient";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Wraps a group of block-level children (cards, columns, list items) and
 * staggers them in with a fade/rise the first time the group scrolls into
 * view. Mark each child that should animate with `data-reveal-item`.
 */
export function RevealGroup({
  children,
  className,
  itemSelector = "[data-reveal-item]",
  y = 32,
  stagger = 0.12,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const el = containerRef.current;
    const targets = el.querySelectorAll(itemSelector);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, itemSelector, y, stagger, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
