"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateMicroMarketSensitivity, type RateTrackingPoint } from "../../lib/premiumTypes";

const SAMPLE_RATE_HISTORY: RateTrackingPoint[] = [
  { weekLabel: "8wk", ratePercent: 6.72 },
  { weekLabel: "7wk", ratePercent: 6.68 },
  { weekLabel: "6wk", ratePercent: 6.61 },
  { weekLabel: "5wk", ratePercent: 6.58 },
  { weekLabel: "4wk", ratePercent: 6.49 },
  { weekLabel: "3wk", ratePercent: 6.55 },
  { weekLabel: "2wk", ratePercent: 6.47 },
  { weekLabel: "now", ratePercent: 6.41 },
];

function RateSparkline({ points }: { points: RateTrackingPoint[] }) {
  const width = 480;
  const height = 100;
  const padding = 20;
  const values = points.map((p) => p.ratePercent);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const xFor = (i: number) => padding + (i / (points.length - 1)) * (width - padding * 2);
  const yFor = (v: number) => height - padding - ((v - minVal) / range) * (height - padding * 2);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.ratePercent)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="8-week rate trend">
      <path d={pathD} fill="none" stroke={COLORS.gold} strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={p.weekLabel} cx={xFor(i)} cy={yFor(p.ratePercent)} r="2.5" fill={COLORS.gold} />
      ))}
    </svg>
  );
}

export default function MicroMarketSensitivity() {
  const [sensitivityCoefficient, setSensitivityCoefficient] = useState(1.3);
  const currentRate = SAMPLE_RATE_HISTORY[SAMPLE_RATE_HISTORY.length - 1].ratePercent;
  const rateChange30d = currentRate - SAMPLE_RATE_HISTORY[SAMPLE_RATE_HISTORY.length - 5].ratePercent;

  const result = calculateMicroMarketSensitivity(sensitivityCoefficient, currentRate, rateChange30d);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm" style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}>
          Max exclusive
        </span>
      </div>
      <h3 className="text-lg mb-1" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        Micro-Market Sensitivity & Rate Tracking
      </h3>
      <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        How much your specific market moves — up or down — for every 1% change in mortgage rates.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            30-year fixed rate, last 8 weeks
          </span>
          <div className="rounded-sm border p-4 mb-4" style={{ borderColor: COLORS.hairline }}>
            <RateSparkline points={SAMPLE_RATE_HISTORY} />
          </div>
          <div className="flex justify-between text-sm mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <span>Current rate</span>
            <span style={{ fontFamily: FONT_FAMILY.mono }}>{currentRate}%</span>
          </div>
          <div className="flex justify-between text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <span>30-day change</span>
            <span style={{ fontFamily: FONT_FAMILY.mono, color: rateChange30d < 0 ? COLORS.moss : COLORS.clay }}>
              {rateChange30d >= 0 ? "+" : ""}{Math.round(rateChange30d * 100) / 100}%
            </span>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Local sensitivity coefficient</span>
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{sensitivityCoefficient.toFixed(1)}x</span>
            </div>
            <input
              type="range" min={0.4} max={2.0} step={0.1} value={sensitivityCoefficient}
              onChange={(e) => setSensitivityCoefficient(parseFloat(e.target.value))}
              className="w-full" style={{ accentColor: COLORS.gold }}
            />
          </div>
          <div className="rounded-sm p-5" style={{ backgroundColor: COLORS.goldSoft }}>
            <span className="text-xs uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              Projected local price impact
            </span>
            <span className="text-2xl block mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: result.projectedLocalPriceImpactPercent >= 0 ? COLORS.moss : COLORS.clay }}>
              {result.projectedLocalPriceImpactPercent >= 0 ? "+" : ""}{result.projectedLocalPriceImpactPercent}%
            </span>
            <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              {result.interpretation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
