import type Lenis from "lenis";

// Shared handle so the nav (and any CTA) can drive the smooth scroller.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToAnchor(hash: string) {
  if (instance) {
    instance.scrollTo(hash, { offset: 0, duration: 1.4 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
}
