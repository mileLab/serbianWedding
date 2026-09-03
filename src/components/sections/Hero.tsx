"use client";

import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NAV_SECTION_IDS } from "@/lib/constants";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export function Hero() {
  const t = useTranslations("hero");
  const scrollToSection = useScrollToSection();

  return (
    <section id="hero" className="relative overflow-hidden bg-grain">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.12),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 flex min-h-dvh flex-col items-center justify-center py-28">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
            {t("eyebrow")}
          </span>
          <h1 className="font-display text-5xl leading-[1.05] text-cream-50 sm:text-7xl md:text-8xl">
            <RevealText as="span" className="block">
              {t("title1")}
            </RevealText>
            <RevealText as="span" className="block" wordClassName="text-gold-gradient" delay={0.15}>
              {t("title2")}
            </RevealText>
          </h1>
          <p className="max-w-xl text-balance text-base leading-relaxed text-cream-100/70 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(NAV_SECTION_IDS.contact);
              }}
            >
              {t("cta")}
            </ButtonLink>
            <ButtonLink
              variant="ghost"
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(NAV_SECTION_IDS.products);
              }}
            >
              {t("secondaryCta")}
            </ButtonLink>
          </div>
          <span className="mt-6 text-xs uppercase tracking-[0.3em] text-cream-100/40">
            {t("scrollHint")}
          </span>
        </div>
      </div>
    </section>
  );
}
