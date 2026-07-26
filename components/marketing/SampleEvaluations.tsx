"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface SampleCard {
  imageUrl: string;
  imageAlt: string;
  verdictLine: string;
  numberLine: string;
  scenarioType: string;
  location: string;
  confidence: string;
  dataFreshness: string;
}

const SAMPLES: SampleCard[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A modern home at dusk",
    verdictLine: "Worth it now",
    numberLine: "+$18,400 value",
    scenarioType: "Kitchen renovation",
    location: "Springfield, OH",
    confidence: "84%",
    dataFreshness: "Updated 3d ago",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A modern home with a swimming pool",
    verdictLine: "Rent it out",
    numberLine: "+$41,200 vs. selling",
    scenarioType: "Sell vs. rent",
    location: "Austin, TX",
    confidence: "79%",
    dataFreshness: "Updated 1w ago",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80",
    imageAlt: "A family home at golden hour",
    verdictLine: "Buying favored",
    numberLine: "$212/mo cheaper",
    scenarioType: "Rent vs. buy",
    location: "Denver, CO",
    confidence: "88%",
    dataFreshness: "Updated 2d ago",
  },
];

export default function SampleEvaluations({ onExploreAll }: { onExploreAll: () => void }) {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.gold, letterSpacing: "0.1em" }}>
            Example verdicts
          </span>
          <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "32px", fontWeight: 600, color: COLORS.ink }}>
            See what a real evaluation looks like
          </h2>
        </div>
        <button
          onClick={onExploreAll}
          className="text-sm uppercase tracking-wide hidden sm:block"
          style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink, letterSpacing: "0.05em", borderBottom: `1px solid ${COLORS.ink}` }}
        >
          Try it yourself →
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAMPLES.map((card) => (
          <div key={card.location} className="group cursor-default">
            <div className="relative w-full overflow-hidden rounded-sm mb-4" style={{ aspectRatio: "16 / 9" }}>
              <img
                src={card.imageUrl}
                alt={card.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <button
                aria-label="Save"
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
                  <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-8 11-8 11z" />
                </svg>
              </button>
              <span
                className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm"
                style={{ backgroundColor: "rgba(26,26,26,0.75)", color: "#FFFFFF", fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}
              >
                Example
              </span>
            </div>

            <div style={{ fontFamily: FONT_FAMILY.mono, fontSize: "22px", fontWeight: 600, color: COLORS.ink }}>
              {card.numberLine}
            </div>
            <div className="text-sm mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              {card.verdictLine} · {card.scenarioType}
            </div>
            <div className="text-sm mb-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              {card.location}
            </div>

            <div className="flex items-center gap-4 pt-3" style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
              <span className="flex items-center gap-1 text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                {card.dataFreshness}
              </span>
              <span className="flex items-center gap-1 text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z" /></svg>
                {card.confidence} confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
