"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap } from "@/lib/gsapClient";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealTag = "p" | "span" | "h1" | "h2" | "h3" | "div";

/** Splits text into words and reveals them with a staggered fade/rise on scroll. */
export function RevealText({
  as = "p",
  children,
  className,
  wordClassName,
  delay = 0,
}: {
  as?: RevealTag;
  children: string;
  className?: string;
  /** Applied to each word span directly — use for effects like background-clip
   *  text gradients that don't paint through an ancestor's inline-block boxes. */
  wordClassName?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const words = children.split(" ");
  const Tag = as;

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    const el = containerRef.current;
    const targets = el.querySelectorAll("[data-reveal-word]");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.025,
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, delay]);

  return (
    <Tag ref={containerRef as React.Ref<HTMLDivElement>} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <span
              data-reveal-word
              className={clsx("inline-block will-change-transform", wordClassName)}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
