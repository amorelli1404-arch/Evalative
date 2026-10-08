"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import SampleReportModal from "./SampleReportModal";

type ScenarioId = "buying" | "selling" | "renovating";

interface ScenarioReport {
  id: ScenarioId;
  tabLabel: string;
  location: string;
  scenarioType: string;
  verdict: string;
  confidence: string;
  metric2Label: string;
  metric2Value: string;
  metric3Label: string;
  metric3Value: string;
  bullets: string[];
}

const SCENARIOS: ScenarioReport[] = [
  {
    id: "buying",
    tabLabel: "Buying",
    location: "Denver, CO",
    scenarioType: "Rent vs. buy",
    verdict: "🟢 Buying Favored",
    confidence: "88%",
    metric2Label: "3-Year Value Impact",
    metric2Value: "+$18,900 equity built",
    metric3Label: "Monthly Cost Difference",
    metric3Value: "$212/mo cheaper than renting",
    bullets: [
      "Local mortgage rates have eased 0.4 points this quarter",
      "Rent-to-price ratio in this ZIP currently favors buying",
      "Breakeven on closing costs lands at 3.2 years — within a typical stay",
    ],
  },
  {
    id: "selling",
    tabLabel: "Selling",
    location: "Austin, TX",
    scenarioType: "Sell vs. rent",
    verdict: "🟢 Rent It Out",
    confidence: "79%",
    metric2Label: "3-Year Value Impact",
    metric2Value: "+$41,200 vs. selling now",
    metric3Label: "Monthly Cash Flow",
    metric3Value: "+$340/mo as a rental",
    bullets: [
      "Local rents are up 6% year-over-year",
      "Agent fees and closing costs would consume roughly 7% of your equity",
      "Rental income plus appreciation outpaces reinvested sale proceeds",
    ],
  },
  {
    id: "renovating",
    tabLabel: "Renovating",
    location: "Springfield, OH",
    scenarioType: "Kitchen renovation",
    verdict: "🟢 Kitchen Renovation Worth It",
    confidence: "84%",
    metric2Label: "3-Year Value Impact",
    metric2Value: "+$18,400 value added",
    metric3Label: "Break-Even Timeline",
    metric3Value: "11 months to recoup cost",
    bullets: [
      "Your local market is appreciating faster than the national average",
      "Material costs for this project type are trending down",
      "Comparable recent remodels recouped 96%+ of project cost nearby",
    ],
  },
];

export default function InstantSampleReportPreview({ onGetStarted }: { onGetStarted: () => void }) {
  const [activeId, setActiveId] = useState<ScenarioId>("buying");
  const [transitioning, setTransitioning] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = SCENARIOS.find((s) => s.id === activeId)!;

  const handleTabChange = (id: ScenarioId) => {
    if (id === activeId) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setActiveId(id);
      setTransitioning(false);
    }, 160);
  };

  // Standard tab keyboard behavior: arrow keys move between scenarios.
  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;
    if (e.key === "ArrowRight") nextIndex = (index + 1) % SCENARIOS.length;
    else if (e.key === "ArrowLeft") nextIndex = (index - 1 + SCENARIOS.length) % SCENARIOS.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = SCENARIOS.length - 1;
    else return;
    e.preventDefault();
    handleTabChange(SCENARIOS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-16 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span
          className="text-xs uppercase tracking-wide block mb-2"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted, letterSpacing: "0.1em" }}
        >
          Instant sample report
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "28px", fontWeight: 600, color: COLORS.ink }}>
          Pick a scenario. See the verdict.
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          A real preview of the report format — no signup required to look.
        </p>
      </div>

      <div
        className="grid grid-cols-3 rounded-sm p-1 max-w-lg mx-auto mb-8"
        style={{ backgroundColor: COLORS.mossSoft }}
        role="tablist"
        aria-label="Choose a scenario"
      >
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`scenario-tab-${s.id}`}
            role="tab"
            aria-selected={activeId === s.id}
            aria-controls="scenario-panel"
            tabIndex={activeId === s.id ? 0 : -1}
            onClick={() => handleTabChange(s.id)}
            onKeyDown={(e) => handleTabKeyDown(e, i)}
            className="px-3 py-2.5 rounded-sm text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-200"
            style={{
              fontFamily: FONT_FAMILY.body,
              letterSpacing: "0.05em",
              backgroundColor: activeId === s.id ? COLORS.ink : "transparent",
              color: activeId === s.id ? "#FFFFFF" : COLORS.moss,
              boxShadow: activeId === s.id ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
            }}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div
        id="scenario-panel"
        role="tabpanel"
        aria-labelledby={`scenario-tab-${activeId}`}
        tabIndex={0}
        className="w-full rounded-sm overflow-hidden transition-all duration-200 ease-in-out"
        style={{
          border: `1px solid ${COLORS.hairline}`,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(6px)" : "translateY(0)",
        }}
      >
        <div style={{ height: "4px", backgroundColor: COLORS.moss }} />

        <div className="px-6 sm:px-8 pt-6 pb-8">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
            <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
              {active.scenarioType} · {active.location}
            </span>
            <span
              className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm"
              style={{ backgroundColor: "rgba(26,26,26,0.06)", color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
            >
              Sample data
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl mb-6" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            {active.verdict}
          </h3>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-sm p-4" style={{ backgroundColor: COLORS.mossSoft }}>
              <span className="text-[11px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.moss }}>
                Confidence Score
              </span>
              <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "22px", fontWeight: 600, color: COLORS.ink }}>
                {active.confidence}
              </span>
            </div>
            <div className="rounded-sm p-4" style={{ backgroundColor: COLORS.mossSoft }}>
              <span className="text-[11px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.moss }}>
                {active.metric2Label}
              </span>
              <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "18px", fontWeight: 600, color: COLORS.ink }}>
                {active.metric2Value}
              </span>
            </div>
            <div className="rounded-sm p-4" style={{ backgroundColor: COLORS.mossSoft }}>
              <span className="text-[11px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.moss }}>
                {active.metric3Label}
              </span>
              <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "18px", fontWeight: 600, color: COLORS.ink }}>
                {active.metric3Value}
              </span>
            </div>
          </div>

          <div className="mb-7">
            <span className="text-xs uppercase tracking-wide block mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
              Why
            </span>
            <ul className="flex flex-col gap-2">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                  <span style={{ color: COLORS.moss }}>+</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-7 py-3 rounded-sm text-sm font-medium transition-transform duration-150 hover:-translate-y-0.5"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
          >
            Get Your Property Report →
          </button>

          <div className="mt-4">
            <button
              onClick={() => setPdfModalOpen(true)}
              className="text-xs underline underline-offset-2 transition-colors duration-150"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}
            >
              View as downloadable PDF report
            </button>
          </div>
        </div>
      </div>

      <SampleReportModal open={pdfModalOpen} onClose={() => setPdfModalOpen(false)} initialTab="deep_dive" />
    </section>
  );
}
