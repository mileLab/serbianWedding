"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsapClient";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const t = useTranslations("preloader");
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lenisRef = useLenis();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();

    if (reducedMotion) {
      document.body.style.overflow = "";
      // Reduced-motion preference can only be known client-side; this one-time
      // sync render is unavoidable (no server-rendered equivalent exists).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    const path = pathRef.current;
    const length = path?.getTotalLength() ?? 0;
    if (path) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        document.body.style.overflow = "";
        lenisRef.current?.start();
        setVisible(false);
      },
    });

    tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
      .to(
        "[data-preloader-line]",
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" },
        "-=0.5"
      )
      .to({}, { duration: 0.5 })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink-950"
      role="status"
      aria-label="Seite lädt"
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path
          ref={pathRef}
          d="M36 6 V66 M18 22 H54 M12 34 H60"
          stroke="#d4a83f"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col items-center gap-1 text-center">
        <p
          data-preloader-line
          className="translate-y-2 font-display text-lg text-cream-50 opacity-0"
        >
          {t("line1")}
        </p>
        <p
          data-preloader-line
          className="translate-y-2 text-xs uppercase tracking-[0.3em] text-gold-300 opacity-0"
        >
          {t("line2")}
        </p>
      </div>
    </div>
  );
}
