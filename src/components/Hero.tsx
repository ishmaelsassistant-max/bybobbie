"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Monogram } from "./Logo";
import { scrollToAnchor } from "@/lib/lenis";
import { site, asset } from "@/config/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Depth layers: video recedes slowest, content lifts away faster
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor(hash);
  };

  return (
    <section id="top" ref={ref} className="relative h-[100svh] overflow-hidden">
      {/* Video layer */}
      <motion.div style={reduced ? undefined : { y: videoY }} className="absolute inset-0">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset("/video/poster.jpg")}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={asset("/video/hero.mp4")}
            poster={asset("/video/poster.jpg")}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        )}
        {/* Cinematic grade: darken + rose tint + vignette */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(10,10,10,0.75)_100%)]" />
        <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-tr from-rose/30 via-transparent to-blush/20" />
      </motion.div>

      {/* Content layer */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: fade }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease }}
          className="float-slow"
        >
          <Monogram className="text-[7rem] md:text-[9rem]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
          className="rose-text font-display mt-2 text-lg font-medium uppercase md:text-2xl"
        >
          By&nbsp;Bobbie
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.55, ease }}
          className="rose-rule my-5 w-40 md:w-56"
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease }}
          className="font-display max-w-3xl text-4xl font-light leading-tight text-cream md:text-6xl"
        >
          Luxury lashes,
          <br />
          <span className="italic">brought to your door</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="font-script mt-6 text-3xl text-blush/90 md:text-4xl"
        >
          {site.tagline} <span aria-hidden="true">♡</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05, ease }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#book"
            onClick={go("#book")}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-rose to-rose-light px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-transform hover:scale-[1.03]"
          >
            Book Now
          </a>
          <a
            href="#services"
            onClick={go("#services")}
            className="rounded-full border border-cream/25 px-10 py-4 text-xs uppercase tracking-[0.3em] text-cream/85 transition-colors hover:border-blush/60 hover:text-blush"
          >
            View Prices
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={reduced ? undefined : { opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-cream/25 p-1.5">
          <motion.div
            animate={reduced ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-blush/80"
          />
        </div>
      </motion.div>
    </section>
  );
}
