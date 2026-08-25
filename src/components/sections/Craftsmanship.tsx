"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsapClient";

export function Craftsmanship() {
  const t = useTranslations("craftsmanship");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const paragraphs = t.raw("paragraphs") as string[];
  const stats = t.raw("stats") as Array<{ value: string; label: string }>;

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !glowRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="story" ref={sectionRef} className="relative overflow-hidden bg-ink-900 py-24 md:py-32">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/[0.06] blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-container relative flex flex-col items-center gap-14">
        <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl md:text-6xl">
            {t("title")}
          </h2>
          <GoldDivider />
        </div>

        <div className="flex max-w-2xl flex-col gap-6">
          {paragraphs.map((p, i) => (
            <RevealText key={i} as="p" className="block text-base leading-relaxed text-cream-100/70 sm:text-lg">
              {p}
            </RevealText>
          ))}
        </div>

        <div className="grid w-full max-w-3xl grid-cols-1 gap-8 border-t border-cream-100/10 pt-12 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <span className="font-display text-4xl text-gold-gradient sm:text-5xl">{stat.value}</span>
              <span className="text-sm text-cream-100/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
