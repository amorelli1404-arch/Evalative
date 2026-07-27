"use client";

import { useMemo, useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateScenarioOutcome, type ScenarioInputs } from "../../lib/premiumTypes";

const VERDICT_COLOR: Record<string, string> = {
  sell_now: COLORS.clay,
  rent_out: COLORS.moss,
  hold: COLORS.ochre,
  renovate_now: COLORS.moss,
  wait: COLORS.ochre,
};

function Slider({
  label, value, min, max, step, unit, onChange,
}: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{label}</span>
        <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{value >= 0 && unit === "%" && min < 0 ? "+" : ""}{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: COLORS.gold }}
      />
    </div>
  );
}

export default function ScenarioBuilder() {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    interestRateDeltaPercent: 0,
    holdingPeriodYears: 5,
    marketAdjustmentPercent: 0,
    occupancyRatePercent: 95,
  });

  const output = useMemo(() => calculateScenarioOutcome(inputs), [inputs]);
  const update = <K extends keyof ScenarioInputs>(key: K, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="text-lg mb-6" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Adjust the variables
        </h3>
        <Slider label="Interest rate change" value={inputs.interestRateDeltaPercent} min={-2} max={2} step={0.25} unit="%" onChange={(v) => update("interestRateDeltaPercent", v)} />
        <Slider label="Holding period" value={inputs.holdingPeriodYears} min={1} max={10} step={1} unit=" yrs" onChange={(v) => update("holdingPeriodYears", v)} />
        <Slider label="Market adjustment" value={inputs.marketAdjustmentPercent} min={-10} max={10} step={1} unit="%" onChange={(v) => update("marketAdjustmentPercent", v)} />
        <Slider label="Occupancy rate" value={inputs.occupancyRatePercent} min={80} max={100} step={1} unit="%" onChange={(v) => update("occupancyRatePercent", v)} />
      </div>

      <div>
        <h3 className="text-lg mb-6" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Live outcome
        </h3>
        <div className="rounded-sm p-6 border" style={{ borderColor: COLORS.hairline }}>
          <div className="mb-5">
            <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Verdict</span>
            <span className="text-2xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: VERDICT_COLOR[output.verdict] }}>
              {output.verdictLabel}
            </span>
          </div>
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Confidence score</span>
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{output.confidenceScore}%</span>
            </div>
            <div className="h-2 rounded-full w-full" style={{ backgroundColor: COLORS.hairline }}>
              <div className="h-2 rounded-full transition-all" style={{ width: `${output.confidenceScore}%`, backgroundColor: COLORS.gold }} />
            </div>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Projected monthly net</span>
            <span className="text-xl" style={{ fontFamily: FONT_FAMILY.mono, color: output.projectedMonthlyNet >= 0 ? COLORS.moss : COLORS.clay }}>
              {output.projectedMonthlyNet >= 0 ? "+" : ""}${output.projectedMonthlyNet.toLocaleString()}/mo
            </span>
          </div>
        </div>
        <p className="text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Recalculates instantly as you move the sliders — this shows how sensitive your decision is to rate changes, market swings, and vacancy.
        </p>
      </div>
    </div>
  );
}
