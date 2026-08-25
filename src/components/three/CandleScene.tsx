"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";
import { GoldDust } from "./Particles";

export type CandleParts = {
  root: THREE.Group | null;
  wax: THREE.Group | null;
  band: THREE.Group | null;
  wick: THREE.Group | null;
  flame: THREE.Group | null;
};

const goldMaterial = (
  <meshStandardMaterial color="#d4a83f" metalness={1} roughness={0.28} envMapIntensity={1.4} />
);

/**
 * Procedural fallback for the baptismal candle (Krstena Sveća).
 * Exposes named part groups (wax / band / wick / flame) via ref so the Hero
 * section can drive a scroll-scrubbed "disassembly" timeline with GSAP.
 * See modelConfig.ts — swap to a real .glb by flipping USE_GLTF_MODELS.candle.
 */
export const CandleScene = forwardRef<CandleParts, { onReady?: () => void }>(function CandleScene(
  { onReady },
  ref
) {
  const rootRef = useRef<THREE.Group>(null);
  const waxRef = useRef<THREE.Group>(null);
  const bandRef = useRef<THREE.Group>(null);
  const wickRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Group>(null);
  const flameMeshRef = useRef<THREE.Mesh>(null);
  const flameLightRef = useRef<THREE.PointLight>(null);

  // Teardrop silhouette revolved around the wick axis — a plain sphere reads
  // as a floating ball, so the outline is traced with a wide belly and a
  // drawn-out point the way a real candle flame tapers.
  const outerFlameGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.045, 0.02),
      new THREE.Vector2(0.1, 0.09),
      new THREE.Vector2(0.125, 0.17),
      new THREE.Vector2(0.105, 0.26),
      new THREE.Vector2(0.06, 0.35),
      new THREE.Vector2(0.02, 0.41),
      new THREE.Vector2(0, 0.44),
    ];
    return new THREE.LatheGeometry(points, 32);
  }, []);

  const innerFlameGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0.03),
      new THREE.Vector2(0.035, 0.06),
      new THREE.Vector2(0.055, 0.13),
      new THREE.Vector2(0.04, 0.21),
      new THREE.Vector2(0.015, 0.27),
      new THREE.Vector2(0, 0.3),
    ];
    return new THREE.LatheGeometry(points, 24);
  }, []);

  useImperativeHandle(ref, () => ({
    get root() {
      return rootRef.current;
    },
    get wax() {
      return waxRef.current;
    },
    get band() {
      return bandRef.current;
    },
    get wick() {
      return wickRef.current;
    },
    get flame() {
      return flameRef.current;
    },
  }));

  useEffect(() => {
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.12;
    }
    const t = state.clock.elapsedTime;
    const flicker = Math.sin(t * 9) * 0.06 + Math.sin(t * 3.3) * 0.04 + Math.sin(t * 17) * 0.02;
    if (flameMeshRef.current) {
      flameMeshRef.current.scale.set(1 - flicker * 0.3, 1 + flicker, 1 - flicker * 0.3);
    }
    if (flameLightRef.current) {
      flameLightRef.current.intensity = 3.2 + flicker * 6;
    }
  });

  return (
    <group ref={rootRef} position={[0, -0.2, 0]}>
      {/* Base plinth */}
      <mesh castShadow receiveShadow position={[0, -2.05, 0]}>
        <cylinderGeometry args={[0.62, 0.7, 0.16, 48]} />
        {goldMaterial}
      </mesh>

      {/* Wax body — layered, slightly tapering cylinders for a hand-poured silhouette.
          The two segments share an exact seam (bottom top-edge === top bottom-edge)
          so the body reads as one continuous candle rather than two floating pieces. */}
      <group ref={waxRef} position={[0, 0, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.56, 0.58, 1.3, 48]} />
          <meshPhysicalMaterial
            color="#f6ecd8"
            roughness={0.35}
            metalness={0}
            clearcoat={0.4}
            clearcoatRoughness={0.6}
            sheen={1}
            sheenColor="#f1d998"
          />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.53, 0.56, 1, 48]} />
          <meshPhysicalMaterial
            color="#f6ecd8"
            roughness={0.35}
            metalness={0}
            clearcoat={0.4}
            clearcoatRoughness={0.6}
            sheen={1}
            sheenColor="#f1d998"
          />
        </mesh>
      </group>

      {/* Gold band, wrapped around the wax at the upper third */}
      <group ref={bandRef} position={[0, 0.4, 0]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.545, 0.05, 16, 64]} />
          {goldMaterial}
        </mesh>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0.14, 0]}>
          <torusGeometry args={[0.535, 0.025, 16, 64]} />
          {goldMaterial}
        </mesh>
      </group>

      {/* Wick — planted in the candle's flat top at y=0.8 */}
      <group ref={wickRef} position={[0, 0.94, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.028, 0.28, 12]} />
          <meshStandardMaterial color="#2b1c12" roughness={0.8} />
        </mesh>
        {/* Charred, curled tip */}
        <mesh castShadow position={[0.008, 0.15, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.012, 0.02, 0.07, 8]} />
          <meshStandardMaterial color="#1a110a" roughness={0.9} />
        </mesh>
      </group>

      {/* Flame — a lathe-revolved teardrop instead of a bare sphere, so it
          actually reads as fire rather than a floating bead. */}
      <group ref={flameRef} position={[0, 1.08, 0]}>
        <mesh ref={flameMeshRef} geometry={outerFlameGeometry}>
          <meshStandardMaterial
            color="#ff8a3d"
            emissive="#ff9d4d"
            emissiveIntensity={2.2}
            roughness={0.3}
            transparent
            opacity={0.92}
          />
        </mesh>
        <mesh position={[0, 0.03, 0]} geometry={innerFlameGeometry}>
          <meshStandardMaterial
            color="#ffe3b0"
            emissive="#fff2d6"
            emissiveIntensity={3.4}
            roughness={0.2}
          />
        </mesh>
        <pointLight ref={flameLightRef} color="#ffb454" intensity={3.2} distance={4.5} decay={2} position={[0, 0.15, 0]} />
      </group>

      <GoldDust count={40} scale={4.5} size={2} position={[0, 0.5, 0]} />
      <ContactShadows
        position={[0, -2.14, 0]}
        opacity={0.55}
        scale={6}
        blur={2.4}
        far={3}
        color="#1b1512"
      />
    </group>
  );
});
