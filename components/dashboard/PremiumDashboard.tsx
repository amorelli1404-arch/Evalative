"use client";

import { useState, type ComponentType } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { AssumptionsProvider } from "./AssumptionsContext";
import DashboardOverview from "./DashboardOverview";
import FinancialROIModeling from "./FinancialROIModeling";
import ComparativeMarketAnalysis from "./ComparativeMarketAnalysis";
import ScenarioBuilder from "./ScenarioBuilder";
import ReportExport from "./ReportExport";
import NeighborhoodAnalytics from "./NeighborhoodAnalytics";
import DynamicRenovationEngine from "./DynamicRenovationEngine";
import CapitalDecisionEngine from "./CapitalDecisionEngine";
import MicroMarketSensitivity from "./MicroMarketSensitivity";

export type DashboardTier = "pro" | "max";

export type TabKey =
  | "overview"
  | "financial"
  | "cma"
  | "scenario"
  | "neighborhood"
  | "export"
  | "dynamic_renovation"
  | "capital_decision"
  | "micro_market";

/** Every tab gets these, so any tab can jump to another or start an export. */
export interface PanelProps {
  tier: DashboardTier;
  onNavigate: (tab: TabKey) => void;
  onExport: () => void;
}

const TABS: { key: TabKey; label: string; maxOnly?: boolean; component: ComponentType<PanelProps> }[] = [
  { key: "overview", label: "Overview", component: DashboardOverview },
  { key: "financial", label: "Financial & ROI", component: FinancialROIModeling },
  { key: "cma", label: "Market Analysis", component: ComparativeMarketAnalysis },
  { key: "scenario", label: "What-If Builder", component: ScenarioBuilder },
  { key: "neighborhood", label: "Neighborhood", component: NeighborhoodAnalytics },
  { key: "dynamic_renovation", label: "Renovation Engine", maxOnly: true, component: DynamicRenovationEngine },
  { key: "capital_decision", label: "Capital Decision", maxOnly: true, component: CapitalDecisionEngine },
  { key: "micro_market", label: "Rate Sensitivity", maxOnly: true, component: MicroMarketSensitivity },
  { key: "export", label: "Export & Import", component: ReportExport },
];

export default function PremiumDashboard({ tier }: { tier: DashboardTier }) {
  const tabs = TABS.filter((t) => tier === "max" || !t.maxOnly);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const ActiveComponent = (tabs.find((t) => t.key === activeTab) ?? tabs[0]).component;

  const navigate = (tab: TabKey) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The report is the Overview (it summarizes every tab), so switch to it
  // and give React a moment to render before opening the print dialog.
  const exportReport = () => {
    setActiveTab("overview");
    window.setTimeout(() => window.print(), 150);
  };

  return (
    <AssumptionsProvider>
      <div className="w-full max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <span
              className="inline-block text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm mb-2"
              style={{
                backgroundColor: tier === "max" ? COLORS.goldSoft : COLORS.mossSoft,
                color: COLORS.ink,
                fontFamily: FONT_FAMILY.body,
                letterSpacing: "0.06em",
              }}
            >
              {tier === "max" ? "Max plan" : "Pro plan"}
            </span>
            <h1 className="text-3xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
              Deep-dive dashboard
            </h1>
          </div>
          <button
            onClick={exportReport}
            className="no-print px-5 py-2.5 rounded-sm text-sm font-medium"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
          >
            Export report (PDF)
          </button>
        </div>

        <div className="mb-8 rounded-sm px-4 py-3 border" style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.slateSoft }}>
          <p className="text-xs leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <strong>How this works:</strong> enter your property&apos;s numbers once on the Overview tab and every
            other tab updates with them. Comparable sales, price trends, neighborhood scores and rate history are
            <strong> sample data</strong> for now, not figures for your property.
          </p>
        </div>

        <div className="no-print flex flex-wrap gap-1 mb-8 border-b" style={{ borderColor: COLORS.hairline }}>
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

        <ActiveComponent tier={tier} onNavigate={navigate} onExport={exportReport} />

        {tier === "pro" && (
          <div className="no-print mt-12 rounded-sm p-5 border" style={{ borderColor: COLORS.gold, backgroundColor: COLORS.goldSoft }}>
            <p className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              <strong>Max</strong> unlocks 3 additional engines: real-time renovation cost adjustment, automated
              capital decisions with confidence scoring, and hyper-local rate sensitivity tracking.
            </p>
          </div>
        )}
      </div>
    </AssumptionsProvider>
  );
}
