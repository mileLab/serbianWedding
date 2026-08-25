"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createEmbroideryTexture } from "./embroideryTexture";
import { createClothMaterial } from "./ClothMaterial";
import { GoldDust } from "./Particles";

export function PeskirScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  const texture = useMemo(() => createEmbroideryTexture(), []);
  const material = useMemo(() => createClothMaterial(texture), [texture]);
  const geometry = useMemo(() => new THREE.PlaneGeometry(4.4, 2.4, 90, 50), []);

  // R3F's useFrame mutates imperatively every tick — routing the mutable
  // three.js object through a ref (rather than the useMemo binding directly)
  // keeps that mutation outside the render phase.
  const materialRef = useRef(material);
  useEffect(() => {
    materialRef.current = material;
  }, [material]);

  useFrame((state) => {
    const mat = materialRef.current;
    const target = progressRef.current;
    const current = mat.uniforms.uProgress.value as number;
    mat.uniforms.uProgress.value = THREE.MathUtils.lerp(current, target, 0.08);
    mat.uniforms.uTime.value = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.12, 0, 0]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      <GoldDust count={70} scale={5.5} size={2.2} opacity={0.4} position={[0, 0, 0.6]} />
    </group>
  );
}
