"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Reveal, SectionHeading } from "./Reveal";
import { site } from "@/config/site";

function LiveCalendar({ username }: { username: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#e8b4a8" },
          light: { "cal-brand": "#b76e79" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <div className="panel overflow-hidden rounded-2xl p-2 md:p-4">
      <Cal
        calLink={username}
        style={{ width: "100%", height: "680px", overflow: "auto" }}
        config={{ theme: "dark" }}
      />
    </div>
  );
}

function EnquiryFallback() {
  return (
    <div className="panel mx-auto max-w-2xl rounded-2xl p-10 text-center md:p-14">
      <p className="font-script rose-text text-4xl">Online booking coming soon</p>
      <p className="mx-auto mt-5 max-w-md leading-relaxed text-cream/60">
        The live calendar is nearly ready. In the meantime, send an enquiry with
        the set you&apos;d like and your preferred days — I&apos;ll come back to
        you with availability.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href={`mailto:${site.email}?subject=Lash%20booking%20enquiry`}
          className="rounded-full bg-gradient-to-r from-rose to-rose-light px-9 py-4 text-xs font-medium uppercase tracking-[0.3em] text-ink transition-transform hover:scale-[1.03]"
        >
          Email an enquiry
        </a>
        {site.instagram && (
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/25 px-9 py-4 text-xs uppercase tracking-[0.3em] text-cream/85 transition-colors hover:border-blush/60 hover:text-blush"
          >
            DM on Instagram
          </a>
        )}
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.25em] text-cream/35">
        {site.serviceArea}
      </p>
    </div>
  );
}

export default function Booking() {
  return (
    <section id="book" className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-36">
      <SectionHeading
        eyebrow="Book"
        title="Reserve your appointment"
        script="I lash, you slay"
      />
      <Reveal>
        {site.calUsername ? (
          <LiveCalendar username={site.calUsername} />
        ) : (
          <EnquiryFallback />
        )}
      </Reveal>
    </section>
  );
}
