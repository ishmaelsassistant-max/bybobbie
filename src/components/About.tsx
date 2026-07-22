"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { asset } from "@/config/site";

const POINTS = [
  {
    title: "I come to you",
    body: "No salon trips, no parking, no waiting rooms. Your lashes are done in the comfort of your own home — you just relax.",
  },
  {
    title: "Individual lashes only",
    body: "Every lash is hand-placed, one extension to one natural lash. Bespoke mapping for your eye shape — never a one-size strip.",
  },
  {
    title: "Private & personal",
    body: "One client at a time, always. New clients receive a patch test at least 24 hours before their first appointment.",
  },
];

export default function About() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="about" ref={ref} className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="The Artist"
        title="A lash studio that travels"
        script="your home, your rules"
      />

      <div className="grid items-center gap-14 md:grid-cols-2">
        <div className="space-y-10">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div className="flex gap-5">
                <span className="font-display rose-text mt-1 text-3xl font-medium leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-normal text-cream">
                    {p.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-cream/60">{p.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="flex justify-center">
          <motion.div
            style={reduced ? undefined : { y: phoneY }}
            className="panel relative w-64 overflow-hidden rounded-[2.2rem] p-2 md:w-72"
          >
            <video
              className="aspect-[9/16] w-full rounded-[1.8rem] object-cover"
              src={asset("/video/about.mp4")}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              aria-label="Close-up of individual eyelash extensions being applied"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-rose-light/20" />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
