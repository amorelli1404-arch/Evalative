"use client";

/**
 * components/RawConfigPanel.tsx
 *
 * Layer 3 of the progressive disclosure system -- opt-in only, reached by
 * explicit navigation from Layer 2. This is the one place in the product
 * where methodology, raw calculation inputs, and manual override controls
 * are exposed. Per the product design principle, this is NEVER shown by
 * default and never the entry point to a scenario.
 *
 * Overrides submitted here map directly to ScenarioInputs
 * (models/evaluation_schema.py) and trigger a new evaluation run rather
 * than mutating the current one in place -- every override is a fresh,
 * fully-audited calculation, never a silent patch to an existing result.
 */

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../lib/design-tokens";
import type { EvaluationOutput } from "../lib/types";

interface RawConfigPanelProps {
  evaluation: EvaluationOutput;
  onSubmitOverride: (overrides: ScenarioOverrideInput) => void;
  onClose: () => void;
}

export interface ScenarioOverrideInput {
  renovation_category?: string;
  renovation_budget_override?: number;
  assumed_monthly_rent_override?: number;
  holding_period_years_override?: number;
}

function MethodologyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: COLORS.hairline }}>
      <span className="text-[13px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
        {label}
      </span>
      <span className="text-[13px] tabular-nums" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}>
        {value}
      </span>
    </div>
  );
}

export default function RawConfigPanel({ evaluation, onSubmitOverride, onClose }: RawConfigPanelProps) {
  const [budgetOverride, setBudgetOverride] = useState<string>("");
  const [rentOverride, setRentOverride] = useState<string>("");
  const [holdingYears, setHoldingYears] = useState<string>("5");

  const handleSubmit = () => {
    const overrides: ScenarioOverrideInput = {
      holding_period_years_override: holdingYears ? parseInt(holdingYears, 10) : undefined,
    };
    if (budgetOverride) overrides.renovation_budget_override = parseFloat(budgetOverride);
    if (rentOverride) overrides.assumed_monthly_rent_override = parseFloat(rentOverride);
    onSubmitOverride(overrides);
  };

  return (
    <div
      className="w-full max-w-md rounded-sm border p-5"
      style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-[16px]"
          style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.display, fontWeight: 600 }}
        >
          Raw data & methodology
        </h3>
        <button onClick={onClose} className="text-[13px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
          ← Back
        </button>
      </div>

      {/* Methodology disclosure -- required Phase 4 legal language, always
          visible on this panel, never hidden behind another tap. */}
      <div
        className="text-[12px] leading-relaxed mb-5 p-3 rounded-sm border"
        style={{ color: COLORS.inkMuted, borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.body }}
      >
        This is an automated estimate, not an appraisal. It has not been developed by a licensed
        appraiser and does not comply with USPAP. Figures shown are modeled from public records and
        market data and may differ from actual market value. This is not personalized financial or
        investment advice.
      </div>

      <div className="mb-5">
        <span className="text-[11px] uppercase tracking-wide block mb-2" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
          Calculation details
        </span>
        <MethodologyRow label="Scenario type" value={evaluation.scenario_type.replace(/_/g, " ")} />
        <MethodologyRow label="Calculation version" value={evaluation.calculation_version} />
        <MethodologyRow label="Data age" value={`${evaluation.data_freshness_days} days`} />
        <MethodologyRow label="Confidence score" value={evaluation.confidence_score.toFixed(3)} />
        <MethodologyRow label="Key driver code" value={evaluation.key_driver} />
      </div>

      <div className="mb-5">
        <span className="text-[11px] uppercase tracking-wide block mb-3" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
          Adjust assumptions
        </span>

        {evaluation.scenario_type === "renovation_roi" && (
          <label className="block mb-3">
            <span className="text-[13px] block mb-1" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
              Your actual budget (optional override)
            </span>
            <input
              type="number"
              value={budgetOverride}
              onChange={(e) => setBudgetOverride(e.target.value)}
              placeholder={evaluation.cost_estimate?.toString() ?? "Enter amount"}
              className="w-full px-3 py-2 rounded-sm border text-[14px] tabular-nums"
              style={{ borderColor: COLORS.hairline, color: COLORS.ink, fontFamily: FONT_FAMILY.mono, backgroundColor: "white" }}
            />
          </label>
        )}

        {(evaluation.scenario_type === "sell_vs_rent" || evaluation.scenario_type === "rent_vs_buy") && (
          <label className="block mb-3">
            <span className="text-[13px] block mb-1" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
              Assumed monthly rent (optional override)
            </span>
            <input
              type="number"
              value={rentOverride}
              onChange={(e) => setRentOverride(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 rounded-sm border text-[14px] tabular-nums"
              style={{ borderColor: COLORS.hairline, color: COLORS.ink, fontFamily: FONT_FAMILY.mono, backgroundColor: "white" }}
            />
          </label>
        )}

        <label className="block mb-3">
          <span className="text-[13px] block mb-1" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
            Holding period (years)
          </span>
          <input
            type="number"
            value={holdingYears}
            onChange={(e) => setHoldingYears(e.target.value)}
            min={1}
            max={30}
            className="w-full px-3 py-2 rounded-sm border text-[14px] tabular-nums"
            style={{ borderColor: COLORS.hairline, color: COLORS.ink, fontFamily: FONT_FAMILY.mono, backgroundColor: "white" }}
          />
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 rounded-sm text-[14px]"
        style={{ backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: FONT_FAMILY.body, fontWeight: 500 }}
      >
        Recalculate with these assumptions
      </button>
    </div>
  );
}
