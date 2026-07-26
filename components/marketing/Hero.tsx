"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import PhotoCarousel, { type CarouselSlide } from "./PhotoCarousel";

const SLIDES: CarouselSlide[] = [
  { url: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80", alt: "A modern home at dusk" },
  { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80", alt: "A modern home with a swimming pool" },
  { url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1800&q=80", alt: "A family home at golden hour" },
];

const SCENARIOS = [
  { value: "renovation_evaluation", label: "Should I renovate?" },
  { value: "sell_vs_rent", label: "Sell or rent it out?" },
  { value: "rent_vs_buy", label: "Should I buy?" },
];

export default function Hero({ onGetStarted }: { onGetStarted: (address: string, scenario: string) => void }) {
  const [address, setAddress] = useState("");
  const [scenario, setScenario] = useState(SCENARIOS[0].value);

  return (
    <PhotoCarousel slides={SLIDES} minHeight="100vh" overlayStrength="medium" slideDurationMs={6500}>
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <h1
          className="text-5xl sm:text-6xl leading-tight mb-6"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#FFFFFF" }}
        >
          The ultimate independent property evaluation
        </h1>
        <p className="max-w-xl text-lg leading-relaxed mb-10" style={{ fontFamily: FONT_FAMILY.body, color: "#F0F0F0" }}>
          Short, data-driven verdicts on renovating, selling, renting, or buying — with no agent,
          lender, or commission behind the numbers.
        </p>

        <div
          className="w-full max-w-2xl flex flex-col sm:flex-row items-stretch rounded-sm overflow-hidden"
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0 12px 40px rgba(0,0,0,0.25)" }}
        >
          <div className="flex-1 px-5 py-4 sm:border-r" style={{ borderColor: COLORS.hairline }}>
            <label className="block text-[10px] uppercase tracking-wide mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, letterSpacing: "0.08em" }}>
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Maple St, Springfield"
              className="w-full text-sm outline-none"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}
            />
          </div>
          <div className="flex-1 px-5 py-4 sm:border-r" style={{ borderColor: COLORS.hairline }}>
            <label className="block text-[10px] uppercase tracking-wide mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, letterSpacing: "0.08em" }}>
              Scenario
            </label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}
            >
              {SCENARIOS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => onGetStarted(address, scenario)}
            className="px-8 py-4 text-sm uppercase tracking-wide font-medium"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.gold, color: "#1A1A1A", letterSpacing: "0.08em" }}
          >
            Evaluate
          </button>
        </div>
        <span className="mt-4 text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: "#D8D8D8" }}>
          No account needed to try it
        </span>
      </div>
    </PhotoCarousel>
  );
}
