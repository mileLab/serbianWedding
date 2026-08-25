"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { ReactNode } from "react";

/**
 * One <Canvas> per 3D section. Simpler and far more robust than a single
 * shared canvas with drei's <View> portal system (which requires the tracked
 * DOM node's layout to be resolved in exact sync with the R3F render loop).
 * Always mounted via the ssr:false LazyCanvas wrapper (see LazyCanvas.tsx).
 *
 * `className` is applied to a plain wrapper div, not <Canvas> itself: R3F's
 * Canvas sets position/width/height via inline styles, which take priority
 * over (and would silently defeat) Tailwind classes passed straight to it.
 *
 * DPR is a static [min,max] clamp rather than drei's <PerformanceMonitor>-
 * driven adaptive DPR — the latter never let a first frame render reliably
 * in testing (a state update loop kept the renderer re-initializing).
 *
 * gl.powerPreference is deliberately omitted: requesting "high-performance"
 * explicitly caused WebGL context creation to silently fail (blank canvas,
 * no error) in testing — the browser/driver combination couldn't satisfy it.
 * Leaving it unset lets the browser choose and is the safer default.
 */
export function Scene3DCanvas({
  children,
  className,
  cameraFov = 32,
  cameraPosition = [0, 0, 12],
}: {
  children: ReactNode;
  className?: string;
  cameraFov?: number;
  cameraPosition?: [number, number, number];
}) {
  return (
    <div className={className} style={{ pointerEvents: "none" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: cameraFov, position: cameraPosition }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
