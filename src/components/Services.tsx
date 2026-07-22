"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { serviceGroups } from "@/config/site";
import { scrollToAnchor } from "@/lib/lenis";

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`panel panel-hover rounded-2xl transition-transform duration-200 will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

export default function Services() {
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor("#book");
  };

  return (
    <section id="services" className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="Services"
        title="Price list"
        script="thank you for choosing By Bobbie"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {serviceGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.1}>
            <TiltCard className="h-full p-8">
              <h3 className="rose-text font-display inline-block text-xl font-medium uppercase tracking-[0.3em]">
                {group.title}
              </h3>
              <div className="rose-rule mt-4 mb-2" />
              <ul>
                {group.services.map((s) => (
                  <li
                    key={s.slug}
                    className="flex items-baseline justify-between gap-4 border-b border-cream/8 py-4 last:border-0"
                  >
                    <div>
                      <p className="font-display text-lg text-cream">{s.name}</p>
                      {s.note && (
                        <p className="mt-0.5 text-sm text-cream/45">{s.note}</p>
                      )}
                    </div>
                    <p className="font-display shrink-0 text-xl text-blush">
                      £{s.price}
                    </p>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 text-center">
        <motion.a
          href="#book"
          onClick={go}
          whileHover={{ scale: 1.03 }}
          className="inline-block rounded-full bg-gradient-to-r from-rose to-rose-light px-10 py-4 text-xs font-medium uppercase tracking-[0.3em] text-ink"
        >
          Book your appointment
        </motion.a>
        <p className="mt-5 text-sm text-cream/40">
          A patch test is required for all new clients, at least 24 hours before
          your appointment.
        </p>
      </Reveal>
    </section>
  );
}
