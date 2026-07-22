"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionHeading } from "./Reveal";
import { asset } from "@/config/site";

const IMAGES = [
  { src: asset("/gallery/g1.jpg"), alt: "Close-up of an eyelash extension being applied" },
  { src: asset("/gallery/g2.jpg"), alt: "Lash artist working, black and white" },
  { src: asset("/gallery/g3.jpg"), alt: "Lash application with tweezers and gloves" },
  { src: asset("/gallery/g4.jpg"), alt: "Individual lash extension application close-up" },
  { src: asset("/gallery/g5.jpg"), alt: "Finished lash set and styled brow" },
  { src: asset("/gallery/g6.jpg"), alt: "Eye with long natural-look lashes" },
];

function Column({
  images,
  y,
  offsetClass = "",
}: {
  images: typeof IMAGES;
  y?: MotionValue<string>;
  offsetClass?: string;
}) {
  return (
    <motion.div style={y ? { y } : undefined} className={`flex flex-col gap-5 ${offsetClass}`}>
      {images.map((img) => (
        <div
          key={img.src}
          className="panel panel-hover group relative aspect-[3/4] overflow-hidden rounded-2xl"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60" />
        </div>
      ))}
    </motion.div>
  );
}

export default function Gallery() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Alternate columns drift at different speeds — the 3D-depth illusion
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["6%", "-12%"]);
  const yC = useTransform(scrollYProgress, [0, 1], ["2%", "-9%"]);

  return (
    <section id="gallery" ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="Gallery"
        title="The work"
        script="every lash, hand placed"
      />
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
        <Column images={[IMAGES[0], IMAGES[3]]} y={reduced ? undefined : yA} />
        <Column
          images={[IMAGES[1], IMAGES[4]]}
          y={reduced ? undefined : yB}
          offsetClass="mt-10 md:mt-16"
        />
        <Column
          images={[IMAGES[2], IMAGES[5]]}
          y={reduced ? undefined : yC}
          offsetClass="hidden md:flex md:mt-8"
        />
      </div>
    </section>
  );
}
