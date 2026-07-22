import { Monogram } from "./Logo";
import { site } from "@/config/site";

export default function Contact() {
  return (
    <footer id="contact" className="relative z-10 border-t border-rose-light/10">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <Monogram className="text-6xl" />
        <p className="rose-text font-display mt-3 text-sm font-medium uppercase tracking-[0.42em]">
          By&nbsp;Bobbie
        </p>
        <p className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-cream/40">
          Mobile Lash Artist
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-cream/60 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-blush"
          >
            {site.email}
          </a>
          <span className="hidden text-rose-light/30 sm:inline">·</span>
          <span>{site.serviceArea}</span>
          {site.instagram && (
            <>
              <span className="hidden text-rose-light/30 sm:inline">·</span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blush"
              >
                Instagram
              </a>
            </>
          )}
        </div>

        <div className="rose-rule mx-auto mt-10 w-40" />
        <p className="mt-6 text-xs text-cream/30">
          © {new Date().getFullYear()} By Bobbie · bybobbie.co.uk · All lashes
          lovingly hand placed
        </p>
      </div>
    </footer>
  );
}
