"use client";

import dynamic from "next/dynamic";

/** Scene3DCanvas relies on browser-only WebGL APIs — never render during SSR. */
export const LazyCanvas = dynamic(
  () => import("./Scene3DCanvas").then((mod) => mod.Scene3DCanvas),
  { ssr: false }
);
