"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

// Photo credit: Michael Brown (@vettexan) on Unsplash, free to use under
// the Unsplash License (unsplash.com/license) -- free for commercial use,
// no permission or attribution required, credited here as good practice.
const HERO_IMAGE_URL =
  "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80";

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
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "640px" }}>
      <img
        src={HERO_IMAGE_URL}
        alt="A modern home at dusk"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark gradient overlay for text legibility -- deliberately a
          simple linear gradient, not a full opaque scrim, so the photo
          still reads clearly at the edges. */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20,22,20,0.55) 0%, rgba(20,22,20,0.75) 100%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
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
    </section>
  );
}
