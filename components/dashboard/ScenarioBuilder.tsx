"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateScenarioOutcome, type ScenarioInputs, type VerdictOutcome } from "../../lib/premiumTypes";
import { useAssumptions } from "./AssumptionsContext";
import { Eyebrow, Meter, Panel, RangeField, SectionTitle, formatSignedCurrency, signedPercent } from "./ui";

const VERDICT_COLOR: Record<VerdictOutcome, string> = {
  sell_now: COLORS.clay,
  rent_out: COLORS.moss,
  hold: COLORS.ochre,
  renovate_now: COLORS.moss,
  wait: COLORS.ochre,
};

const START: Omit<ScenarioInputs, "holdingPeriodYears"> = {
  interestRateDeltaPercent: 0,
  marketAdjustmentPercent: 0,
  occupancyRatePercent: 95,
};

export default function ScenarioBuilder() {
  const { assumptions, financingInputs } = useAssumptions();
  const [inputs, setInputs] = useState<ScenarioInputs>({ ...START, holdingPeriodYears: assumptions.holdingYears });
  const update = <K extends keyof ScenarioInputs>(key: K, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  const output = calculateScenarioOutcome(inputs, financingInputs);
  const effectiveRate = Math.max(0, assumptions.interestRatePercent + inputs.interestRateDeltaPercent);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <SectionTitle className="">Adjust the variables</SectionTitle>
          <button
            onClick={() => setInputs({ ...START, holdingPeriodYears: assumptions.holdingYears })}
            className="text-xs underline"
            style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}
          >
            Reset
          </button>
        </div>
        <RangeField
          label={`Interest rate change (→ ${effectiveRate.toFixed(2)}%)`}
          display={signedPercent(inputs.interestRateDeltaPercent)}
          value={inputs.interestRateDeltaPercent} min={-2} max={2} step={0.25}
          onChange={(v) => update("interestRateDeltaPercent", v)}
        />
        <RangeField
          label="Holding period"
          display={`${inputs.holdingPeriodYears} yrs`}
          value={inputs.holdingPeriodYears} min={1} max={10} step={1}
          onChange={(v) => update("holdingPeriodYears", v)}
        />
        <RangeField
          label="Market rent adjustment"
          display={signedPercent(inputs.marketAdjustmentPercent)}
          value={inputs.marketAdjustmentPercent} min={-10} max={10} step={1}
          onChange={(v) => update("marketAdjustmentPercent", v)}
        />
        <RangeField
          label="Occupancy rate"
          display={`${inputs.occupancyRatePercent}%`}
          value={inputs.occupancyRatePercent} min={80} max={100} step={1}
          onChange={(v) => update("occupancyRatePercent", v)}
        />
      </div>

      <div>
        <SectionTitle className="mb-6">Live outcome</SectionTitle>
        <Panel padding="p-6">
          <div className="mb-5">
            <Eyebrow>Verdict</Eyebrow>
            <span className="text-2xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: VERDICT_COLOR[output.verdict] }}>
              {output.verdictLabel}
            </span>
          </div>
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <Eyebrow className="">Confidence score</Eyebrow>
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{output.confidenceScore}%</span>
            </div>
            <Meter percent={output.confidenceScore} />
          </div>
          <div>
            <Eyebrow className="mb-1">Projected monthly net</Eyebrow>
            <span className="text-xl" style={{ fontFamily: FONT_FAMILY.mono, color: output.projectedMonthlyNet >= 0 ? COLORS.moss : COLORS.clay }}>
              {formatSignedCurrency(output.projectedMonthlyNet)}/mo
            </span>
          </div>
        </Panel>
        <p className="text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Starts from your property&apos;s numbers on the Overview tab. The mortgage is re-priced at the new rate, and rent is
          scaled by the market adjustment and occupancy.
        </p>
      </div>
    </div>
  );
}
