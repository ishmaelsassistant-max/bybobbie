"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "./Logo";
import { scrollToAnchor } from "@/lib/lenis";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Prices" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToAnchor(hash);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-rose-light/10" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" onClick={go("#top")} aria-label="By Bobbie — home">
          <Wordmark compact />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="text-xs uppercase tracking-[0.25em] text-cream/70 transition-colors hover:text-blush"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#book"
            onClick={go("#book")}
            className="rounded-full border border-rose-light/40 px-5 py-2 text-xs uppercase tracking-[0.25em] text-blush transition-all hover:bg-rose/20 hover:border-rose-light/70"
          >
            Book Now
          </a>
        </div>

        <button
          className="md:hidden text-cream/80 p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink/95 backdrop-blur-md border-b border-rose-light/10 px-6 pb-6 pt-2 flex flex-col gap-4">
          {[...LINKS, { href: "#book", label: "Book Now" }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="text-sm uppercase tracking-[0.25em] text-cream/80 hover:text-blush"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
