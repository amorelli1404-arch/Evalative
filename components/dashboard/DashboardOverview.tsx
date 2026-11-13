"use client";

import { COLORS, FONT_FAMILY, SENTIMENT_STYLE, type VerdictSentiment } from "../../lib/design-tokens";
import {
  PROJECT_TYPES,
  calculateProjectROI,
  calculateRentVsBuy,
  calculateScenarioOutcome,
  calculateSellVsRent,
  recalculateEstimateFromComps,
  type VerdictOutcome,
} from "../../lib/premiumTypes";
import { ASSUMPTION_GROUPS, AssumptionFields, useAssumptions } from "./AssumptionsContext";
import { Eyebrow, SectionTitle, formatCurrency, formatSignedCurrency } from "./ui";
import type { PanelProps, TabKey } from "./PremiumDashboard";

const SCENARIO_SENTIMENT: Record<VerdictOutcome, VerdictSentiment> = {
  rent_out: "favorable",
  renovate_now: "favorable",
  hold: "caution",
  wait: "caution",
  sell_now: "unfavorable",
};

interface Summary {
  title: string;
  headline: string;
  detail: string;
  sentiment: VerdictSentiment;
  tab: TabKey;
  locked?: boolean;
}

function SummaryCard({ summary, onNavigate }: { summary: Summary; onNavigate: (tab: TabKey) => void }) {
  const tone = SENTIMENT_STYLE[summary.sentiment];
  return (
    <button
      onClick={() => onNavigate(summary.tab)}
      disabled={summary.locked}
      className="text-left rounded-sm border p-5 flex flex-col transition-shadow hover:shadow-sm disabled:cursor-default"
      style={{ borderColor: COLORS.hairline, borderLeft: `3px solid ${tone.fg}`, backgroundColor: "white" }}
    >
      <Eyebrow>{summary.title}</Eyebrow>
      <span className="text-xl mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: tone.fg }}>
        {summary.headline}
      </span>
      <span className="text-sm leading-relaxed flex-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
        {summary.detail}
      </span>
      {!summary.locked && (
        <span className="no-print text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          See the details →
        </span>
      )}
    </button>
  );
}

export default function DashboardOverview({ tier, onNavigate }: PanelProps) {
  const { assumptions, financing, financingInputs, capitalInputs, comps, resetAssumptions } = useAssumptions();

  const cashFlow = financing.monthlyRentalYield;
  const compsValue = recalculateEstimateFromComps(comps, assumptions.livingAreaSqft);
  const scenario = calculateScenarioOutcome(
    { interestRateDeltaPercent: 0, holdingPeriodYears: assumptions.holdingYears, marketAdjustmentPercent: 0, occupancyRatePercent: 95 },
    financingInputs
  );
  const bestProject = PROJECT_TYPES.map((type) => calculateProjectROI(type)).sort((a, b) => b.roiPercent - a.roiPercent)[0];

  const summaries: Summary[] = [
    {
      title: "Monthly cash flow if rented",
      headline: `${formatSignedCurrency(cashFlow)}/mo`,
      detail: `Rent of ${formatCurrency(assumptions.monthlyRent)} against ${formatCurrency(financing.totalMonthlyCost)} of mortgage, tax, insurance, HOA and upkeep.`,
      sentiment: cashFlow >= 0 ? "favorable" : "unfavorable",
      tab: "financial",
    },
    {
      title: "Value from comparable sales",
      headline: compsValue !== null ? formatCurrency(compsValue) : "No comps selected",
      detail:
        compsValue !== null
          ? `Your entered value of ${formatCurrency(assumptions.homeValue)} is ${Math.abs(Math.round(((assumptions.homeValue - compsValue) / compsValue) * 100))}% ${assumptions.homeValue >= compsValue ? "above" : "below"} what nearby sales suggest.`
          : "Include at least one comparable sale to get an estimate.",
      sentiment: "neutral",
      tab: "cma",
    },
    {
      title: "Hold, rent or sell (today's market)",
      headline: scenario.verdictLabel,
      detail: `At 95% occupancy and today's rate, the property nets ${formatSignedCurrency(scenario.projectedMonthlyNet)}/mo. Stress-test it in the What-If Builder.`,
      sentiment: SCENARIO_SENTIMENT[scenario.verdict],
      tab: "scenario",
    },
    {
      title: "Best-returning renovation",
      headline: `${bestProject.label}: ${bestProject.roiPercent}%`,
      detail: `Recoups about ${formatCurrency(bestProject.valueAdded)} of a ${formatCurrency(bestProject.costEstimate)} national-average cost.`,
      sentiment: bestProject.roiPercent >= 100 ? "favorable" : "caution",
      tab: tier === "max" ? "dynamic_renovation" : "financial",
    },
  ];

  if (tier === "max") {
    const rentVsBuy = calculateRentVsBuy(capitalInputs);
    const sellVsRent = calculateSellVsRent(capitalInputs);
    summaries.push(
      {
        title: `Rent vs. buy · ${rentVsBuy.confidenceScore}% confidence`,
        headline: rentVsBuy.recommendedAction,
        detail: rentVsBuy.reasoning,
        sentiment: rentVsBuy.recommendedAction === "Buy" ? "favorable" : "caution",
        tab: "capital_decision",
      },
      {
        title: `Sell vs. rent it out · ${sellVsRent.confidenceScore}% confidence`,
        headline: sellVsRent.recommendedAction,
        detail: sellVsRent.reasoning,
        sentiment: sellVsRent.recommendedAction === "Rent it out" ? "favorable" : "caution",
        tab: "capital_decision",
      }
    );
  } else {
    summaries.push({
      title: "Rent vs. buy · Sell vs. rent",
      headline: "Available on Max",
      detail: "Confidence-scored verdicts on your two biggest capital decisions, from these same numbers.",
      sentiment: "neutral",
      tab: "overview",
      locked: true,
    });
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionTitle>Where you stand</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaries.map((s) => (
            <SummaryCard key={s.title} summary={s} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
          <SectionTitle className="">Your property&apos;s numbers</SectionTitle>
          <button
            onClick={resetAssumptions}
            className="no-print text-xs underline"
            style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}
          >
            Reset to sample numbers
          </button>
        </div>
        <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Change anything here and every verdict above, and every tab, updates. Your numbers are saved in this browser.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {ASSUMPTION_GROUPS.map((group) => (
            <div key={group.title}>
              <Eyebrow className="mb-3">{group.title}</Eyebrow>
              <AssumptionFields keys={group.keys} className="grid grid-cols-1 gap-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
