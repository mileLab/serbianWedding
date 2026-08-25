"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";
import type { ProductCategoryKey } from "@/lib/constants";

const gold = (
  <meshStandardMaterial color="#d4a83f" metalness={1} roughness={0.3} envMapIntensity={1.2} />
);
const wax = <meshPhysicalMaterial color="#f6ecd8" roughness={0.4} clearcoat={0.3} />;
const wine = <meshStandardMaterial color="#6b1b2b" roughness={0.5} metalness={0.1} />;
const cream = <meshStandardMaterial color="#efe6d2" roughness={0.6} />;

function MiniFlame({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const f = Math.sin(state.clock.elapsedTime * 8 + position[0] * 10) * 0.08;
    ref.current.scale.set(1 - f * 0.3, 1 + f, 1 - f * 0.3);
  });
  return (
    <group position={position}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color="#ff8a3d"
          emissive="#ffb454"
          emissiveIntensity={2.2}
        />
      </mesh>
      <pointLight color="#ffb454" intensity={0.8} distance={1.4} decay={2} />
    </group>
  );
}

function BaptismCandles() {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[0.11, 0.12, 0.85, 24]} />
        {wax}
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.115, 0.014, 12, 32]} />
        {gold}
      </mesh>
      <MiniFlame position={[0, 0.48, 0]} />
    </group>
  );
}

function WeddingCandles() {
  return (
    <group>
      {[-0.22, 0.22].map((x) => (
        <group key={x} position={[x, 0, 0]} rotation={[0, 0, x > 0 ? -0.05 : 0.05]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.11, 0.95, 24]} />
            {wax}
          </mesh>
          <MiniFlame position={[0, 0.53, 0]} />
        </group>
      ))}
      <mesh position={[0, 0.1, 0.12]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.24, 0.02, 8, 32, Math.PI]} />
        {gold}
      </mesh>
    </group>
  );
}

function WeddingTowel() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
  });
  return (
    <mesh ref={ref} rotation={[-0.3, 0, 0]} castShadow>
      <planeGeometry args={[0.85, 0.5, 12, 8]} />
      <meshStandardMaterial color="#f7f1e6" roughness={0.7} side={THREE.DoubleSide} />
    </mesh>
  );
}

function BaptismAccessories() {
  return (
    <group>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.09, 0.5, 0.06]} />
        {gold}
      </mesh>
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.32, 0.09, 0.06]} />
        {gold}
      </mesh>
    </group>
  );
}

function SlavaDecor() {
  return (
    <group>
      <mesh castShadow position={[0, -0.05, 0]}>
        <torusGeometry args={[0.32, 0.11, 16, 32]} />
        {cream}
      </mesh>
      <mesh castShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
        {cream}
      </mesh>
      <group position={[0, 0.2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.4, 16]} />
          {wax}
        </mesh>
        <MiniFlame position={[0, 0.24, 0]} />
      </group>
    </group>
  );
}

function Giftware() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.55, 0.4, 0.4]} />
        {wine}
      </mesh>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.58, 0.06, 0.43]} />
        {gold}
      </mesh>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.43, 0.58]} />
        {gold}
      </mesh>
      <mesh castShadow position={[0, 0.24, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.08, 0.03, 8, 16]} />
        {gold}
      </mesh>
    </group>
  );
}

const VARIANTS: Record<ProductCategoryKey, () => React.ReactElement> = {
  baptismCandles: BaptismCandles,
  weddingCandles: WeddingCandles,
  weddingTowels: WeddingTowel,
  baptismAccessories: BaptismAccessories,
  slavaDecor: SlavaDecor,
  giftware: Giftware,
};

export function ProductPlatform({
  variant,
  phase = 0,
}: {
  variant: ProductCategoryKey;
  phase?: number;
}) {
  const floatRef = useRef<THREE.Group>(null);
  const Variant = VARIANTS[variant];

  useFrame((state) => {
    if (!floatRef.current) return;
    const t = state.clock.elapsedTime + phase * 10;
    floatRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    floatRef.current.rotation.y = Math.sin(t * 0.25) * 0.25 + phase;
  });

  return (
    <group>
      <mesh position={[0, -0.62, 0]} receiveShadow>
        <cylinderGeometry args={[0.9, 0.95, 0.06, 48]} />
        <meshStandardMaterial
          color="#1b1512"
          metalness={0.6}
          roughness={0.35}
          emissive="#3a2a1a"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, -0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.78, 0.9, 48]} />
        <meshStandardMaterial color="#d4a83f" metalness={1} roughness={0.3} />
      </mesh>
      <group ref={floatRef} position={[0, 0, 0]}>
        <Variant />
      </group>
      <ContactShadows position={[0, -0.63, 0]} opacity={0.5} scale={2.4} blur={2} far={1.2} />
    </group>
  );
}
