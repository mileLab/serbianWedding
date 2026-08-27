"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** Scene3DCanvas relies on browser-only WebGL APIs — never render during SSR. */
const Scene3DCanvasImpl = dynamic(
  () => import("./Scene3DCanvas").then((mod) => mod.Scene3DCanvas),
  { ssr: false }
);

/**
 * Defers mounting the WebGL canvas (and its continuous render loop) until
 * the section scrolls near the viewport. Several sections on this page
 * render one `<Canvas>` each — mounting all of them upfront is a real
 * mobile perf/battery cost, especially off-screen ones that never stop
 * rendering. Stays mounted once visible; these scenes are cheap to keep
 * alive but expensive to keep re-creating.
 */
export function LazyCanvas({
  children,
  className,
  cameraFov,
  cameraPosition,
}: {
  children: ReactNode;
  className?: string;
  cameraFov?: number;
  cameraPosition?: [number, number, number];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={wrapperRef} className={className}>
      {visible && (
        <Scene3DCanvasImpl className="h-full w-full" cameraFov={cameraFov} cameraPosition={cameraPosition}>
          {children}
        </Scene3DCanvasImpl>
      )}
    </div>
  );
}
