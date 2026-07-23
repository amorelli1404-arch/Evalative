"use client";

import { useEffect, useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

/**
 * components/marketing/Hero.tsx
 *
 * Flowing photo carousel hero, inspired by the full-bleed rotating
 * imagery on high-end real estate sites (e.g. luxuryestate.com's
 * homepage slideshow) -- crossfading between several real licensed
 * photos rather than a single static image. All three photos are
 * Unsplash License (free for commercial use, no permission required),
 * credited below as good practice.
 *
 * ACCESSIBILITY: auto-advance is disabled when the user has
 * prefers-reduced-motion set -- the carousel still shows the first image
 * and remains fully navigable via the dot controls, it just doesn't
 * animate on its own. This is a hard requirement, not optional polish.
 */

const SLIDES = [
  {
    // Photo credit: Michael Brown (@vettexan) on Unsplash
    url: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80",
    alt: "A modern home at dusk",
  },
  {
    // Photo credit: John Fornander (@johnfo) on Unsplash
    url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80",
    alt: "A modern home with a swimming pool",
  },
  {
    // Photo credit: Bailey Anselme (@pbanselme) on Unsplash
    url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1800&q=80",
    alt: "A family home at golden hour",
  },
];

const SLIDE_DURATION_MS = 6000;

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "640px" }}>
      {SLIDES.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: prefersReducedMotion ? "none" : "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      {/* Dark gradient overlay for text legibility across every slide */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(20,22,20,0.55) 0%, rgba(20,22,20,0.75) 100%)" }}
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

        {/* Manual slide controls -- always present and functional, even
            when auto-advance is disabled for reduced-motion users. */}
        <div className="flex items-center gap-2 mt-10" role="tablist" aria-label="Hero image selector">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.url}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
              onClick={() => setActiveIndex(i)}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: i === activeIndex ? "#F5F4EF" : "rgba(245,244,239,0.4)",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
