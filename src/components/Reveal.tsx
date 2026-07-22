"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  script,
}: {
  eyebrow: string;
  title: string;
  script?: string;
}) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-rose-light/70">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl font-light text-cream md:text-5xl">
        {title}
      </h2>
      {script && (
        <p className="font-script mt-3 text-2xl text-blush/80">{script}</p>
      )}
      <div className="rose-rule mx-auto mt-6 w-32" />
    </Reveal>
  );
}
