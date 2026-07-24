"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import PhotoCarousel, { type CarouselSlide } from "./PhotoCarousel";

const SLIDES: CarouselSlide[] = [
  // Photo credit: Michael Brown (@vettexan) on Unsplash
  { url: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80", alt: "A modern home at dusk" },
  // Photo credit: John Fornander (@johnfo) on Unsplash
  { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80", alt: "A modern home with a swimming pool" },
  // Photo credit: Bailey Anselme (@pbanselme) on Unsplash
  { url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1800&q=80", alt: "A family home at golden hour" },
];

function SignatureGauge() {
  const heights = [10, 16, 22, 28, 34, 40, 46];
  return (
    <div className="flex items-end gap-[6px]" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: `${h}px`,
            borderRadius: "1px",
            backgroundColor: i < 5 ? "#8FBBA3" : "rgba(255,255,255,0.35)",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <PhotoCarousel slides={SLIDES} minHeight="640px" overlayStrength="medium">
      <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <SignatureGauge />
        <h1
          className="mt-8 text-4xl sm:text-5xl leading-tight"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF" }}
        >
          An independent read on your property&apos;s next move
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: "#E4E2D8" }}>
          Short, data-driven verdicts on renovating, selling, renting, or buying — tracked monthly,
          with no agent, lender, or commission behind the numbers.
        </p>
        <button
          onClick={onGetStarted}
          className="mt-8 px-7 py-3 rounded-sm text-sm font-medium"
          style={{ backgroundColor: COLORS.paper, color: COLORS.ink, fontFamily: FONT_FAMILY.body }}
        >
          Run a free evaluation
        </button>
        <span className="mt-3 text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: "#C9C7BC" }}>
          No account needed to try it
        </span>
      </div>
    </PhotoCarousel>
  );
}
