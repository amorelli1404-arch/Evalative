"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import FinancialROIModeling from "./FinancialROIModeling";
import ComparativeMarketAnalysis from "./ComparativeMarketAnalysis";
import ScenarioBuilder from "./ScenarioBuilder";
import ReportExport from "./ReportExport";
import NeighborhoodAnalytics from "./NeighborhoodAnalytics";

const TABS = [
  { key: "financial", label: "Financial & ROI", component: FinancialROIModeling },
  { key: "cma", label: "Market Analysis", component: ComparativeMarketAnalysis },
  { key: "scenario", label: "What-If Builder", component: ScenarioBuilder },
  { key: "neighborhood", label: "Neighborhood", component: NeighborhoodAnalytics },
  { key: "export", label: "Export & Import", component: ReportExport },
] as const;

export default function PremiumDashboard() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("financial");
  const ActiveComponent = TABS.find((t) => t.key === activeTab)!.component;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm"
          style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}
        >
          Max feature
        </span>
      </div>
      <h1 className="text-3xl mb-8" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        Deep-dive dashboard
      </h1>

      <div className="flex flex-wrap gap-1 mb-8 border-b" style={{ borderColor: COLORS.hairline }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-3 text-sm"
            style={{
              fontFamily: FONT_FAMILY.body,
              color: activeTab === tab.key ? COLORS.ink : COLORS.inkMuted,
              borderBottom: activeTab === tab.key ? `2px solid ${COLORS.gold}` : "2px solid transparent",
              fontWeight: activeTab === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ActiveComponent />
    </div>
  );
}
