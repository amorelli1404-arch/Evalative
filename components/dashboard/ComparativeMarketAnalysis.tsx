"use client";

import { useMemo, useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { recalculateEstimateFromComps, type CompProperty, type PriceTrendPoint } from "../../lib/premiumTypes";

const SAMPLE_COMPS: CompProperty[] = [
  { id: "1", addressLabel: "0.2 mi away", salePrice: 612000, sqft: 1850, daysOnMarket: 14, distanceMiles: 0.2, saleDate: "2026-06-12", included: true },
  { id: "2", addressLabel: "0.4 mi away", salePrice: 598000, sqft: 1780, daysOnMarket: 22, distanceMiles: 0.4, saleDate: "2026-05-28", included: true },
  { id: "3", addressLabel: "0.3 mi away", salePrice: 634000, sqft: 1920, daysOnMarket: 9, distanceMiles: 0.3, saleDate: "2026-05-15", included: true },
  { id: "4", addressLabel: "0.6 mi away", salePrice: 575000, sqft: 1690, daysOnMarket: 31, distanceMiles: 0.6, saleDate: "2026-04-30", included: true },
  { id: "5", addressLabel: "0.5 mi away", salePrice: 655000, sqft: 2010, daysOnMarket: 18, distanceMiles: 0.5, saleDate: "2026-04-08", included: true },
];

const SAMPLE_TREND: PriceTrendPoint[] = [
  { year: 2021, estimatedValue: 498000 },
  { year: 2022, estimatedValue: 542000 },
  { year: 2023, estimatedValue: 561000 },
  { year: 2024, estimatedValue: 588000 },
  { year: 2025, estimatedValue: 605000 },
  { year: 2026, estimatedValue: 621000 },
];

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function PriceTrendChart({ points }: { points: PriceTrendPoint[] }) {
  const width = 560;
  const height = 180;
  const padding = 30;
  const values = points.map((p) => p.estimatedValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const xFor = (i: number) => padding + (i / (points.length - 1)) * (width - padding * 2);
  const yFor = (v: number) => height - padding - ((v - minVal) / (maxVal - minVal)) * (height - padding * 2);

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.estimatedValue)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="5-year price trend">
      <path d={pathD} fill="none" stroke={COLORS.gold} strokeWidth="2" />
      {points.map((p, i) => (
        <g key={p.year}>
          <circle cx={xFor(i)} cy={yFor(p.estimatedValue)} r="3" fill={COLORS.gold} />
          <text x={xFor(i)} y={height - 8} textAnchor="middle" fontSize="10" fill={COLORS.inkMuted} fontFamily={FONT_FAMILY.mono}>
            {p.year}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ComparativeMarketAnalysis({ subjectSqft = 1900 }: { subjectSqft?: number }) {
  const [comps, setComps] = useState<CompProperty[]>(SAMPLE_COMPS);

  const estimatedValue = useMemo(() => recalculateEstimateFromComps(comps, subjectSqft), [comps, subjectSqft]);
  const includedCount = comps.filter((c) => c.included).length;

  const toggleComp = (id: string) => {
    setComps((prev) => prev.map((c) => (c.id === id ? { ...c, included: !c.included } : c)));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            Comparable sales
          </h3>
          <div className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            {includedCount} of {comps.length} included
          </div>
        </div>

        <div className="rounded-sm border overflow-hidden mb-4" style={{ borderColor: COLORS.hairline }}>
          <table className="w-full text-left">
            <thead>
              <tr style={{ backgroundColor: COLORS.hairline }}>
                <th className="px-3 py-2 w-10" />
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Location</th>
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Sale Price</th>
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Sq Ft</th>
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>$/Sq Ft</th>
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Days on Market</th>
                <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Distance</th>
              </tr>
            </thead>
            <tbody>
              {comps.map((comp) => (
                <tr
                  key={comp.id}
                  style={{
                    borderTop: `1px solid ${COLORS.hairline}`,
                    opacity: comp.included ? 1 : 0.4,
                  }}
                >
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={comp.included} onChange={() => toggleComp(comp.id)} aria-label={`Include comp ${comp.addressLabel}`} />
                  </td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>{comp.addressLabel}</td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{formatCurrency(comp.salePrice)}</td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{comp.sqft.toLocaleString()}</td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>${Math.round(comp.salePrice / comp.sqft)}</td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{comp.daysOnMarket}d</td>
                  <td className="px-3 py-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{comp.distanceMiles} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-sm p-4" style={{ backgroundColor: COLORS.goldSoft }}>
          <span className="text-xs uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            Estimated value from included comps
          </span>
          <span className="text-2xl" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>
            {estimatedValue !== null ? formatCurrency(estimatedValue) : "Include at least 1 comp"}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          5-year price trend
        </h3>
        <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
          <PriceTrendChart points={SAMPLE_TREND} />
        </div>
      </div>
    </div>
  );
}
