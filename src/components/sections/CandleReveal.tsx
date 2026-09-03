"use client";

import { useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { RevealText } from "@/components/ui/RevealText";
import { RevealGroup } from "@/components/ui/RevealGroup";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gsap } from "@/lib/gsapClient";
import { publicPath } from "@/lib/publicPath";

const CALLOUT_KEYS = ["flame", "wick", "wax", "band"] as const;

const CANDLE_VIDEO_SRC = publicPath("/videos/cross.mp4");
const CANDLE_VIDEO_POSTER = publicPath("/images/candle/candle-start.jpg");

export function CandleReveal() {
  const t = useTranslations("candle");
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const simplified = reducedMotion || isMobile;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const callouts = useMemo(
    () =>
      CALLOUT_KEYS.map((key) => ({
        key,
        title: t(`parts.${key}.title`),
        text: t(`parts.${key}.text`),
      })),
    [t]
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
            if (video && Number.isFinite(video.duration)) {
              video.currentTime = self.progress * video.duration;
            }
          },
        },
      });

      const beats = calloutRefs.current;
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
      src={CANDLE_VIDEO_SRC}
      poster={CANDLE_VIDEO_POSTER}
      aria-label={t("title")}
      muted
      playsInline
      autoPlay={autoPlay}
      loop={autoPlay}
      preload="auto"
    />
  );

  if (simplified) {
    return (
      <section id="candle" className="relative overflow-hidden bg-grain py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.1),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="section-container relative z-10 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-sm shadow-2xl shadow-black/40 md:sticky md:top-28">
            {renderVideoLayer(true)}
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">{t("title")}</h2>
              <GoldDivider className="justify-start" />
              <RevealText as="p" className="block text-base leading-relaxed text-cream-100/70">
                {t("intro")}
              </RevealText>
            </div>

            <RevealGroup className="grid gap-6 sm:grid-cols-2">
              {callouts.map((c) => (
                <div key={c.key} data-reveal-item className="flex flex-col gap-1.5 border-l border-gold-300/30 pl-4">
                  <span className="font-display text-lg text-gold-200">{c.title}</span>
                  <p className="text-sm leading-relaxed text-cream-100/70">{c.text}</p>
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    );
  }

  return (
    // Trigger must stay a plain, non-overflow-hidden div — overflow-hidden here
    // can break GSAP's pin-spacer. Clipping lives on the pinned stage instead.
    <div ref={wrapperRef} id="candle" className="relative" style={{ height: "210vh" }}>
      <div ref={stageRef} className="relative flex h-screen w-full items-center overflow-hidden bg-grain">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.1),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="section-container relative z-10 grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative mx-auto aspect-square h-[62vh] w-auto max-w-full overflow-hidden rounded-sm shadow-2xl shadow-black/40 lg:h-[72vh]">
            {renderVideoLayer()}
          </div>

          <div className="flex max-w-xl flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-3xl text-cream-50 sm:text-4xl">{t("title")}</h2>
              <GoldDivider className="justify-start" />
              <RevealText as="p" className="block text-base leading-relaxed text-cream-100/70">
                {t("intro")}
              </RevealText>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {callouts.map((c, i) => (
                <div
                  key={c.key}
                  ref={(el) => {
                    calloutRefs.current[i] = el;
                  }}
                  className="flex translate-y-4 flex-col gap-1.5 border-l border-gold-300/30 pl-4 opacity-0"
                >
                  <span className="font-display text-lg text-gold-200">{c.title}</span>
                  <p className="text-sm leading-relaxed text-cream-100/70">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
