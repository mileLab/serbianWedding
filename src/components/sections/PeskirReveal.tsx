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
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { publicPath } from "@/lib/publicPath";

const PESKIR_VIDEO_SRC = publicPath("/videos/peskir-embroidery.mp4");
const PESKIR_VIDEO_POSTER = publicPath("/images/peskir/embroidery-07.jpg");

type UsageItem = { title: string; text: string };

export function PeskirReveal() {
  const t = useTranslations("peskir");
  const reducedMotion = useReducedMotion();
  const scrollToSection = useScrollToSection();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const detailHeaderRef = useRef<HTMLHeadingElement>(null);
  const finalCtaRef = useRef<HTMLDivElement>(null);
  const calloutRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const usageItems = t.raw("usageItems") as UsageItem[];

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) return;
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

      tl.to(introRef.current, { opacity: 0, y: -24, duration: 0.5 }, 0).to(
        detailHeaderRef.current,
        { opacity: 1, y: 0, duration: 0.4 },
        0.4
      );

      calloutRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.9 + i * 0.8;
        tl.to(el, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, start).to(
          el,
          { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" },
          start + 0.6
        );
      });

      tl.to(finalCtaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 3.3);
    }, wrapper);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });
    };
  }, [reducedMotion]);

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

  if (reducedMotion) {
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
    <div ref={wrapperRef} id="peskir" className="relative" style={{ height: "420vh" }}>
      <div ref={stageRef} className="relative flex h-screen w-full items-center overflow-hidden bg-ink-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,63,0.08),transparent_60%)]"
          aria-hidden="true"
        />

        <div className="absolute right-[-5%] top-1/2 h-[62vh] w-[72vw] -translate-y-1/2 overflow-hidden rounded-sm shadow-2xl shadow-black/50 md:right-[2%] md:w-[52vw]">
          {renderVideoLayer()}
        </div>

        <div className="section-container relative z-10">
          <div className="flex max-w-xl flex-col gap-6">
            <div ref={introRef} className="flex flex-col gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold-300">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-4xl leading-[1.1] text-cream-50 sm:text-5xl md:text-6xl">
                {t("title")}
              </h2>
              <GoldDivider className="justify-start" />
              <p className="text-base leading-relaxed text-cream-100/75 sm:text-lg">{t("intro")}</p>
            </div>

            <h3
              ref={detailHeaderRef}
              className="translate-y-4 font-display text-2xl text-cream-50 opacity-0 sm:text-3xl"
            >
              {t("usageTitle")}
            </h3>

            <div className="relative min-h-36 sm:min-h-28">
              {usageItems.map((item, i) => (
                <div
                  key={item.title}
                  ref={(el) => {
                    calloutRefs.current[i] = el;
                  }}
                  className="absolute inset-0 flex translate-y-3 flex-col gap-1.5 opacity-0"
                >
                  <span className="font-display text-xl text-gold-200">{item.title}</span>
                  <p className="text-sm leading-relaxed text-cream-100/70 sm:text-base">{item.text}</p>
                </div>
              ))}

              <div
                ref={finalCtaRef}
                className="absolute inset-0 flex translate-y-3 flex-col items-start gap-4 opacity-0"
              >
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
          </div>
        </div>
      </div>
    </div>
  );
}
