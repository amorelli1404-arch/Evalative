"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import FinancialROIModeling from "./FinancialROIModeling";
import ComparativeMarketAnalysis from "./ComparativeMarketAnalysis";
import ScenarioBuilder from "./ScenarioBuilder";
import ReportExport from "./ReportExport";
import NeighborhoodAnalytics from "./NeighborhoodAnalytics";
import DynamicRenovationEngine from "./DynamicRenovationEngine";
import CapitalDecisionEngine from "./CapitalDecisionEngine";
import MicroMarketSensitivity from "./MicroMarketSensitivity";

export type DashboardTier = "pro" | "max";

const PRO_TABS = [
  { key: "financial", label: "Financial & ROI", component: FinancialROIModeling },
  { key: "cma", label: "Market Analysis", component: ComparativeMarketAnalysis },
  { key: "scenario", label: "What-If Builder", component: ScenarioBuilder },
  { key: "neighborhood", label: "Neighborhood", component: NeighborhoodAnalytics },
  { key: "export", label: "Export & Import", component: ReportExport },
] as const;

const MAX_ONLY_TABS = [
  { key: "dynamic_renovation", label: "Renovation Engine", component: DynamicRenovationEngine },
  { key: "capital_decision", label: "Capital Decision", component: CapitalDecisionEngine },
  { key: "micro_market", label: "Rate Sensitivity", component: MicroMarketSensitivity },
] as const;

export default function PremiumDashboard({ tier }: { tier: DashboardTier }) {
  const tabs = tier === "max" ? [...PRO_TABS, ...MAX_ONLY_TABS] : PRO_TABS;
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);
  const ActiveComponent = tabs.find((t) => t.key === activeTab)?.component ?? tabs[0].component;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm"
          style={{
            backgroundColor: tier === "max" ? COLORS.goldSoft : COLORS.mossSoft,
            color: COLORS.ink,
            fontFamily: FONT_FAMILY.body,
            letterSpacing: "0.06em",
          }}
        >
          {tier === "max" ? "Max plan" : "Pro plan"}
        </span>
      </div>
      <h1 className="text-3xl mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        Deep-dive dashboard
      </h1>

      <div className="mb-8 rounded-sm px-4 py-3 border" style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.slateSoft }}>
        <p className="text-xs leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
          <strong>Sample data.</strong> Comparable sales, price trends, neighborhood scores and rate history
          shown here are examples, not figures for your property. The calculators run on whatever numbers
          you enter.
        </p>
      </div>

      <div className="flex flex-wrap gap-1 mb-8 border-b" style={{ borderColor: COLORS.hairline }}>
        {tabs.map((tab) => (
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

      {tier === "pro" && (
        <div className="mt-12 rounded-sm p-5 border" style={{ borderColor: COLORS.gold, backgroundColor: COLORS.goldSoft }}>
          <p className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <strong>Max</strong> unlocks 3 additional engines: real-time renovation cost adjustment, automated
            capital decisions with confidence scoring, and hyper-local rate sensitivity tracking.
          </p>
        </div>
      )}
    </div>
  );
}
