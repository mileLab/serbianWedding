"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NAV_SECTION_IDS } from "@/lib/constants";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap } from "@/lib/gsapClient";
import { publicPath } from "@/lib/publicPath";

const PESKIR_VIDEO_SRC = publicPath("/videos/peskir-embroidery.mp4");
const PESKIR_VIDEO_POSTER = publicPath("/images/peskir/embroidery-07.jpg");

type UsageItem = { title: string; text: string };

export function PeskirReveal() {
  const t = useTranslations("peskir");
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const simplified = reducedMotion || isMobile;
  const scrollToSection = useScrollToSection();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const usageItems = t.raw("usageItems") as UsageItem[];

  useIsomorphicLayoutEffect(() => {
    if (simplified) return;
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper) return;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.pause();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stageRef.current,
          onUpdate: (self) => {
            if (video && Number.isFinite(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        },
      });

      const beats = [...calloutRefs.current, finalRef.current];
      const segment = 1 / (beats.length + 1);
      beats.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { opacity: 1, y: 0, duration: segment * 0.6, ease: "power2.out" }, segment * (i + 1));
      });
    }, wrapper);

    return () => ctx.revert();
  }, [simplified]);

  const renderVideoLayer = (autoPlay = false) => (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={PESKIR_VIDEO_SRC}
      poster={PESKIR_VIDEO_POSTER}
      aria-label={t("imageAlt")}
      muted
      playsInline
      autoPlay={autoPlay}
      loop={autoPlay}
      preload="auto"
    />
  );

  if (simplified) {
    return (
      <section id="peskir" className="relative overflow-hidden bg-ink-950 py-24 md:py-32">
        <div className="section-container grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm shadow-2xl shadow-black/40 md:sticky md:top-28">
            {renderVideoLayer(true)}
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl md:text-6xl">
                {t("title")}
              </h2>
              <GoldDivider className="justify-start" />
              <RevealText as="p" className="block text-base leading-relaxed text-cream-100/75 sm:text-lg">
                {t("intro")}
              </RevealText>
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-display text-xl text-cream-50 sm:text-2xl">{t("usageTitle")}</h3>
              <RevealGroup className="flex flex-col gap-5">
                {usageItems.map((item, i) => (
                  <div key={i} data-reveal-item className="flex flex-col gap-1 border-l border-gold-300/30 pl-4">
                    <span className="text-sm font-medium text-gold-200 sm:text-base">{item.title}</span>
                    <span className="text-sm leading-relaxed text-cream-100/70 sm:text-base">{item.text}</span>
                  </div>
                ))}
              </RevealGroup>
            </div>

            <div className="flex flex-col gap-4 border-t border-cream-100/10 pt-8">
              <RevealText as="p" className="block text-base leading-relaxed text-cream-100/75 sm:text-lg">
                {t("closing")}
              </RevealText>
              <ButtonLink
                href="#contact"
                className="self-start"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(NAV_SECTION_IDS.contact);
                }}
              >
                {t("cta")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    // Trigger must stay a plain, non-overflow-hidden div — overflow-hidden here
    // can break GSAP's pin-spacer. Clipping lives on the pinned stage instead.
    <div ref={wrapperRef} id="peskir" className="relative" style={{ height: "210vh" }}>
      <div ref={stageRef} className="relative flex h-screen w-full items-center overflow-hidden bg-ink-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.08),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="section-container relative z-10 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="flex max-w-xl flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl md:text-6xl">
                {t("title")}
              </h2>
              <GoldDivider className="justify-start" />
              <RevealText as="p" className="block text-base leading-relaxed text-cream-100/75 sm:text-lg">
                {t("intro")}
              </RevealText>
            </div>

            <h3 className="font-display text-2xl text-cream-50 sm:text-3xl">{t("usageTitle")}</h3>

            <div className="flex flex-col gap-5">
              {usageItems.map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    calloutRefs.current[i] = el;
                  }}
                  className="flex translate-y-3 flex-col gap-1.5 opacity-0"
                >
                  <span className="font-display text-xl text-gold-200">{item.title}</span>
                  <p className="text-sm leading-relaxed text-cream-100/70 sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>

            <div ref={finalRef} className="flex translate-y-3 flex-col items-start gap-4 opacity-0">
              <p className="text-sm leading-relaxed text-cream-100/70 sm:text-base">{t("closing")}</p>
              <ButtonLink
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(NAV_SECTION_IDS.contact);
                }}
              >
                {t("cta")}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] h-[64vh] w-auto max-w-full overflow-hidden rounded-sm shadow-2xl shadow-black/50 lg:h-[74vh]">
            {renderVideoLayer()}
          </div>
        </div>
      </div>
    </div>
  );
}
