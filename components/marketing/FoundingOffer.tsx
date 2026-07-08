"use client";

import { FONT_FAMILY } from "../../lib/design-tokens";

// Photo credit: Jakub Żerdzicki on Unsplash, free to use under the
// Unsplash License -- free for commercial use, no permission required.
const KEY_IMAGE_URL =
  "https://images.unsplash.com/photo-1733244766159-f58f4184fd38?auto=format&fit=crop&w=1800&q=80";

export default function FoundingOffer({ onSeePricing }: { onSeePricing: () => void }) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "380px" }}>
      <img src={KEY_IMAGE_URL} alt="Handing over the keys to a new home" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,22,20,0.68) 0%, rgba(20,22,20,0.8) 100%)" }} />

      <div className="relative z-10 max-w-xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <span
          className="text-xs uppercase tracking-wide px-3 py-1 rounded-sm mb-4"
          style={{ backgroundColor: "rgba(245,244,239,0.15)", color: "#F5F4EF", fontFamily: FONT_FAMILY.mono }}
        >
          Founding member pricing
        </span>
        <h2
          className="text-2xl sm:text-3xl leading-tight"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF" }}
        >
          We're opening this up before the public launch
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: "#E4E2D8" }}>
          Join now as a founding member and your rate is locked in for as long as you stay subscribed —
          even after prices go up for everyone else. This is the earliest and least expensive this
          product will ever be.
        </p>
        <button
          onClick={onSeePricing}
          className="mt-7 px-7 py-3 rounded-sm text-sm font-medium"
          style={{ backgroundColor: "#F5F4EF", color: "#1C1F1D", fontFamily: FONT_FAMILY.body }}
        >
          See founding member pricing
        </button>
      </div>
    </section>
  );
}
