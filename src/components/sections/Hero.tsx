"use client";

import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NAV_SECTION_IDS } from "@/lib/constants";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { publicPath } from "@/lib/publicPath";

const CALLOUT_KEYS = ["flame", "wick", "wax", "band"] as const;
const CALLOUT_POSITION = [
  "left-[6%] top-[22%] items-start text-left",
  "right-[6%] top-[38%] items-end text-right",
  "left-[8%] bottom-[26%] items-start text-left",
  "right-[8%] bottom-[16%] items-end text-right",
];

const CANDLE_VIDEO_SRC = publicPath("/videos/cross.mp4");
const CANDLE_VIDEO_POSTER = publicPath("/images/candle/candle-start.jpg");

export function Hero() {
  const t = useTranslations("hero");
  const tCandle = useTranslations("candle");
  const scrollToSection = useScrollToSection();
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const simplified = reducedMotion || isMobile;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const detailHeaderRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const callouts = useMemo(
    () =>
      CALLOUT_KEYS.map((key) => ({
        key,
        title: tCandle(`parts.${key}.title`),
        text: tCandle(`parts.${key}.text`),
      })),
    [tCandle]
  );

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
            if (video && video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        },
      });

      tl.to(heroTextRef.current, { opacity: 0, y: -40, duration: 0.5 }, 0)
        .to(detailHeaderRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.35)
        .to(detailHeaderRef.current, { opacity: 0, duration: 0.3 }, 3.6);

      calloutRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.9 + i * 0.8;
        tl.to(el, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, start)
          .to(el, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" }, start + 0.6);
      });
    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });
    };
  }, [simplified]);

  const heroText = (
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
    </div>
  );

  if (simplified) {
    return (
      <section id="hero" className="relative overflow-hidden bg-grain">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.12),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="section-container relative z-10 flex min-h-[100dvh] flex-col items-center justify-center py-28">
          {heroText}
        </div>

        <div className="section-container relative z-10 grid gap-10 pb-24 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-sm shadow-2xl shadow-black/40">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={CANDLE_VIDEO_SRC}
              poster={CANDLE_VIDEO_POSTER}
              aria-label={tCandle("title")}
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {tCandle("eyebrow")}
              </span>
              <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">{tCandle("title")}</h2>
              <p className="text-base leading-relaxed text-cream-100/70">{tCandle("intro")}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {callouts.map((c) => (
                <div key={c.key} className="flex flex-col gap-1.5 border-l border-gold-300/30 pl-4">
                  <span className="font-display text-lg text-gold-200">{c.title}</span>
                  <p className="text-sm leading-relaxed text-cream-100/70">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={wrapperRef} id="hero" className="relative" style={{ height: "500vh" }}>
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-grain">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.12),transparent_60%)]" />

        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 h-[70vh] w-[70vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 object-contain"
          src={CANDLE_VIDEO_SRC}
          poster={CANDLE_VIDEO_POSTER}
          aria-label={tCandle("title")}
          muted
          playsInline
          preload="auto"
        />

        <div className="section-container relative z-10 flex h-full flex-col items-center justify-center">
          <div ref={heroTextRef}>{heroText}</div>

          <div
            ref={detailHeaderRef}
            className="pointer-events-none absolute top-[14%] flex translate-y-6 flex-col items-center gap-2 text-center opacity-0"
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
              {tCandle("eyebrow")}
            </span>
            <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">{tCandle("title")}</h2>
            <p className="max-w-md text-sm text-cream-100/60">{tCandle("intro")}</p>
          </div>

          {callouts.map((c, i) => (
            <div
              key={c.key}
              ref={(el) => {
                calloutRefs.current[i] = el;
              }}
              className={`pointer-events-none absolute flex w-64 translate-y-4 flex-col gap-1.5 opacity-0 ${CALLOUT_POSITION[i]}`}
            >
              <span className="font-display text-xl text-gold-200">{c.title}</span>
              <p className="text-sm leading-relaxed text-cream-100/70">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-cream-100/40">
          {t("scrollHint")}
        </div>
      </div>
    </div>
  );
}
