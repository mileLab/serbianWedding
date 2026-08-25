"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { NAV_SECTION_IDS } from "@/lib/constants";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsapClient";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_ITEMS = [
  { id: NAV_SECTION_IDS.candle, labelKey: "candle" },
  { id: NAV_SECTION_IDS.peskir, labelKey: "peskir" },
  { id: NAV_SECTION_IDS.products, labelKey: "products" },
  { id: NAV_SECTION_IDS.story, labelKey: "story" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const scrollToSection = useScrollToSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !menuOpen || !mobileNavRef.current) return;
    const targets = mobileNavRef.current.querySelectorAll("[data-reveal-item]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { x: -12, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.05, delay: 0.05 }
      );
    }, mobileNavRef);
    return () => ctx.revert();
  }, [reducedMotion, menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream-100/[0.06] bg-ink-950/70 backdrop-blur-md">
      <div className="section-container flex h-18 items-center justify-between py-3">
        <button
          onClick={() => scrollToSection("hero")}
          className="font-display text-lg tracking-wide text-cream-50"
        >
          Sveta Loza
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-sm tracking-wide text-cream-100/70 transition-colors hover:text-gold-300"
            >
              {t(item.labelKey)}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <button
            onClick={() => handleNavClick(NAV_SECTION_IDS.contact)}
            className="rounded-full bg-gold-400 px-5 py-2 text-sm font-medium text-ink-950 transition-colors hover:bg-gold-300"
          >
            {t("requestButton")}
          </button>
        </div>

        <button
          className="flex items-center justify-center rounded-full border border-cream-100/15 p-2.5 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
        >
          <span className="relative block h-3 w-4">
            <span
              className={clsx(
                "absolute inset-x-0 top-0 h-px bg-cream-50 transition-transform",
                menuOpen && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "absolute inset-x-0 bottom-0 h-px bg-cream-50 transition-transform",
                menuOpen && "-translate-y-[6px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      <div
        className={clsx(
          "grid overflow-hidden border-t border-cream-100/[0.06] bg-ink-950/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div ref={mobileNavRef} className="section-container flex flex-col gap-5 overflow-hidden py-6">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-reveal-item
              onClick={() => handleNavClick(item.id)}
              className="text-left text-base text-cream-100/80"
            >
              {t(item.labelKey)}
            </button>
          ))}
          <button
            data-reveal-item
            onClick={() => handleNavClick(NAV_SECTION_IDS.contact)}
            className="mt-2 rounded-full bg-gold-400 px-5 py-3 text-center text-sm font-medium text-ink-950"
          >
            {t("requestButton")}
          </button>
          <div data-reveal-item>
            <LanguageSwitcher className="self-start" />
          </div>
        </div>
      </div>
    </header>
  );
}
