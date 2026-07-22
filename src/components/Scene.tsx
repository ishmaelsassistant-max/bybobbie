"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ROSE_SHADES = ["#b76e79", "#e8b4a8", "#f4d7cf", "#d9958f", "#f6e3da"];

function makeSpriteTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,230,220,0.8)");
  g.addColorStop(1, "rgba(255,220,210,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Particles({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(makeSpriteTexture, []);

  const { positions, colors, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      c.set(ROSE_SHADES[i % ROSE_SHADES.length]);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, colors, seeds };
  }, [count]);

  useFrame((state) => {
    const p = points.current;
    if (!p) return;
    const t = state.clock.elapsedTime;

    // Gentle drift + pointer parallax + scroll-driven depth travel
    p.rotation.y = t * 0.018 + state.pointer.x * 0.14;
    p.rotation.x = Math.sin(t * 0.05) * 0.03 + state.pointer.y * 0.08;
    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    p.position.y = scroll * 0.0012;
    p.position.z = Math.min(scroll * 0.0006, 2.2);

    // Twinkle: modulate each particle's y very slightly
    const pos = p.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < seeds.length; i += 7) {
      arr[i * 3 + 1] += Math.sin(t * 0.8 + seeds[i]) * 0.0012;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        vertexColors
        transparent
        opacity={0.55}
        size={0.085}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
