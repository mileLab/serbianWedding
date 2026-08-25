"use client";

import { Sparkles } from "@react-three/drei";

export function GoldDust({
  count = 60,
  scale = 6,
  size = 2.5,
  speed = 0.15,
  opacity = 0.55,
  position = [0, 0, 0] as [number, number, number],
}) {
  return (
    <Sparkles
      count={count}
      scale={scale}
      size={size}
      speed={speed}
      opacity={opacity}
      color="#e6c471"
      position={position}
      noise={1}
    />
  );
}
