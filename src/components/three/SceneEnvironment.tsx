"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * Fully procedural warm-gold studio lighting — no external HDRI download,
 * built entirely from drei's <Lightformer> primitives so it's self-contained
 * and fast to first paint.
 */
export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#0a0806"]} />
      <fog attach="fog" args={["#0a0806", 10, 26]} />
      <ambientLight intensity={0.15} color="#3a2a1a" />

      <Environment resolution={256} frames={1}>
        <group rotation={[0, Math.PI / 3, 0]}>
          {/* Key light: warm gold, camera-left */}
          <Lightformer
            form="rect"
            intensity={4}
            color="#f2c874"
            position={[-4, 3, 2]}
            scale={[4, 6, 1]}
            target={[0, 0, 0]}
          />
          {/* Rim light: cooler amber, behind subject for cinematic edge */}
          <Lightformer
            form="rect"
            intensity={3}
            color="#ffdca0"
            position={[3, 2, -4]}
            scale={[3, 5, 1]}
            target={[0, 0, 0]}
          />
          {/* Soft fill from below-front */}
          <Lightformer
            form="ring"
            intensity={1.2}
            color="#a97a16"
            position={[0, -3, 4]}
            scale={5}
            target={[0, 0, 0]}
          />
          {/* Broad soft top fill */}
          <Lightformer
            form="circle"
            intensity={1.5}
            color="#fff2d6"
            position={[0, 6, 0]}
            scale={8}
            target={[0, 0, 0]}
          />
        </group>
      </Environment>

      <pointLight
        position={[0, 1.2, 1.8]}
        intensity={2.2}
        color="#ffb454"
        distance={8}
        decay={2}
      />
    </>
  );
}

/** Lighter-weight lighting for repeated small scenes (e.g. product cards). */
export function CompactSceneLighting() {
  return (
    <>
      <ambientLight intensity={0.25} color="#3a2a1a" />
      <Environment resolution={96} frames={1}>
        <Lightformer form="rect" intensity={3} color="#f2c874" position={[-2, 2, 2]} scale={[3, 3, 1]} />
        <Lightformer form="ring" intensity={1.4} color="#fff2d6" position={[0, 3, 1]} scale={4} />
      </Environment>
      <pointLight position={[0, 0.8, 1.2]} intensity={1.4} color="#ffb454" distance={4} decay={2} />
    </>
  );
}
