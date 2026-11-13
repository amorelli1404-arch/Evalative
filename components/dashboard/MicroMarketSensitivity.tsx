"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateMicroMarketSensitivity, type RateTrackingPoint } from "../../lib/premiumTypes";
import { SAMPLE_RATE_HISTORY } from "../../lib/sampleData";
import { useAssumptions } from "./AssumptionsContext";
import { EngineHeader, Eyebrow, Panel, RangeField, StatRow, formatSignedCurrency, signedPercent } from "./ui";

function RateSparkline({ points }: { points: RateTrackingPoint[] }) {
  const width = 480;
  const height = 100;
  const padding = 20;
  const values = points.map((p) => p.ratePercent);
  const minVal = Math.min(...values);
  const range = Math.max(...values) - minVal || 1;

  const xFor = (i: number) => padding + (i / (points.length - 1)) * (width - padding * 2);
  const yFor = (v: number) => height - padding - ((v - minVal) / range) * (height - padding * 2);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.ratePercent)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="8-week rate trend">
      <path d={pathD} fill="none" stroke={COLORS.gold} strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={p.weekLabel} cx={xFor(i)} cy={yFor(p.ratePercent)} r="2.5" fill={COLORS.gold}>
          <title>{`${p.weekLabel}: ${p.ratePercent}%`}</title>
        </circle>
      ))}
    </svg>
  );
}

export default function MicroMarketSensitivity() {
  const { assumptions } = useAssumptions();
  const [sensitivityCoefficient, setSensitivityCoefficient] = useState(1.3);
  const currentRate = SAMPLE_RATE_HISTORY[SAMPLE_RATE_HISTORY.length - 1].ratePercent;
  const rateChange30d = Math.round((currentRate - SAMPLE_RATE_HISTORY[SAMPLE_RATE_HISTORY.length - 5].ratePercent) * 100) / 100;

  const result = calculateMicroMarketSensitivity(sensitivityCoefficient, currentRate, rateChange30d);
  const dollarImpact = Math.round(assumptions.homeValue * (result.projectedLocalPriceImpactPercent / 100));
  const impactColor = result.projectedLocalPriceImpactPercent >= 0 ? COLORS.moss : COLORS.clay;

  return (
    <div>
      <EngineHeader
        title="Micro-Market Sensitivity & Rate Tracking"
        description="How much your specific market moves — up or down — for every 1% change in mortgage rates."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Eyebrow>30-year fixed rate, last 8 weeks</Eyebrow>
          <div className="rounded-sm border p-4 mb-4" style={{ borderColor: COLORS.hairline }}>
            <RateSparkline points={SAMPLE_RATE_HISTORY} />
          </div>
          <StatRow label="Current rate" value={`${currentRate}%`} />
          <StatRow label="30-day change" value={signedPercent(rateChange30d)} color={rateChange30d < 0 ? COLORS.moss : COLORS.clay} />
        </div>

        <div>
          <RangeField
            label="Local sensitivity coefficient" display={`${sensitivityCoefficient.toFixed(1)}x`}
            value={sensitivityCoefficient} min={0.4} max={2.0} step={0.1} onChange={setSensitivityCoefficient}
          />
          <Panel tone="gold">
            <Eyebrow className="mb-1">Projected local price impact</Eyebrow>
            <span className="text-2xl block" style={{ fontFamily: FONT_FAMILY.mono, color: impactColor }}>
              {signedPercent(result.projectedLocalPriceImpactPercent)}
            </span>
            <span className="text-sm block mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: impactColor }}>
              ≈ {formatSignedCurrency(dollarImpact)} on your home
            </span>
            <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              {result.interpretation}
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
