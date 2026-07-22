"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/**
 * Mounts the 3D particle canvas only when it will actually be enjoyed:
 * WebGL available, no reduced-motion preference, and after first paint so
 * the canvas never competes with the hero for startup bandwidth.
 */
export default function SceneGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      const canvas = document.createElement("canvas");
      if (!canvas.getContext("webgl2") && !canvas.getContext("webgl")) return;
    } catch {
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return ready ? <Scene /> : null;
}
