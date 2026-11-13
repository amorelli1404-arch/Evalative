"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateRentVsBuy, calculateSellVsRent } from "../../lib/premiumTypes";
import { AssumptionFields, useAssumptions } from "./AssumptionsContext";
import { EngineHeader, Eyebrow, Meter, Panel, formatCurrency } from "./ui";
import type { PanelProps } from "./PremiumDashboard";

export default function CapitalDecisionEngine({ onNavigate }: PanelProps) {
  const { capitalInputs } = useAssumptions();
  const results = [
    { title: "Rent vs. Buy", result: calculateRentVsBuy(capitalInputs) },
    { title: "Sell vs. Rent", result: calculateSellVsRent(capitalInputs) },
  ];

  return (
    <div>
      <EngineHeader
        title="Automated Capital Decision Engine"
        description="Confidence-scored recommendations across both major capital decisions, from one shared set of assumptions."
      />

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <AssumptionFields keys={["homeValue", "monthlyRent", "annualAppreciationPercent", "holdingYears", "sellingCostPercent"]} />
        <Panel tone="gold">
          <Eyebrow className="mb-1">Monthly cost of owning</Eyebrow>
          <span className="text-2xl block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>
            {formatCurrency(capitalInputs.monthlyOwnCost)}
          </span>
          <p className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            Mortgage, tax, insurance, HOA and maintenance, calculated from your financing numbers.{" "}
            <button onClick={() => onNavigate("financial")} className="underline">
              Edit financing
            </button>
          </p>
        </Panel>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {results.map(({ title, result }) => (
          <Panel key={title}>
            <Eyebrow className="mb-3">{title}</Eyebrow>
            <div className="text-2xl mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.moss }}>
              {result.recommendedAction}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1"><Meter percent={result.confidenceScore} thin /></div>
              <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>{result.confidenceScore}%</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              {result.reasoning}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
