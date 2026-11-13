"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { recalculateEstimateFromComps, type PriceTrendPoint } from "../../lib/premiumTypes";
import { SAMPLE_PRICE_TREND } from "../../lib/sampleData";
import { AssumptionFields, useAssumptions } from "./AssumptionsContext";
import { Eyebrow, Panel, SectionTitle, formatCurrency } from "./ui";

function PriceTrendChart({ points }: { points: PriceTrendPoint[] }) {
  const width = 560;
  const height = 180;
  const padding = 30;
  const values = points.map((p) => p.estimatedValue);
  const minVal = Math.min(...values);
  const range = Math.max(...values) - minVal || 1;

  const xFor = (i: number) => padding + (i / (points.length - 1)) * (width - padding * 2);
  const yFor = (v: number) => height - padding - ((v - minVal) / range) * (height - padding * 2);
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(p.estimatedValue)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="5-year price trend">
      <path d={pathD} fill="none" stroke={COLORS.gold} strokeWidth="2" />
      {points.map((p, i) => (
        <g key={p.year}>
          <circle cx={xFor(i)} cy={yFor(p.estimatedValue)} r="3" fill={COLORS.gold}>
            <title>{`${p.year}: ${formatCurrency(p.estimatedValue)}`}</title>
          </circle>
          <text x={xFor(i)} y={height - 8} textAnchor="middle" fontSize="10" fill={COLORS.inkMuted} fontFamily={FONT_FAMILY.mono}>
            {p.year}
          </text>
        </g>
      ))}
    </svg>
  );
}

const HEADERS = ["Location", "Sale Price", "Sq Ft", "$/Sq Ft", "Days on Market", "Distance"];

export default function ComparativeMarketAnalysis() {
  const { assumptions, comps, toggleComp } = useAssumptions();
  const estimatedValue = recalculateEstimateFromComps(comps, assumptions.livingAreaSqft);
  const includedCount = comps.filter((c) => c.included).length;
  const cell = "px-3 py-2 text-sm";

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <SectionTitle className="">Comparable sales</SectionTitle>
          <span className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            {includedCount} of {comps.length} included
          </span>
        </div>

        <div className="rounded-sm border overflow-x-auto mb-4" style={{ borderColor: COLORS.hairline }}>
          <table className="w-full text-left">
            <thead>
              <tr style={{ backgroundColor: COLORS.hairline }}>
                <th className="px-3 py-2 w-10" />
                {HEADERS.map((h) => (
                  <th key={h} className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>
              {comps.map((comp) => (
                <tr key={comp.id} style={{ borderTop: `1px solid ${COLORS.hairline}`, opacity: comp.included ? 1 : 0.4 }}>
                  <td className="px-3 py-2">
                    <input type="checkbox" checked={comp.included} onChange={() => toggleComp(comp.id)} aria-label={`Include comp ${comp.addressLabel}`} />
                  </td>
                  <td className={cell} style={{ fontFamily: FONT_FAMILY.body }}>{comp.addressLabel}</td>
                  <td className={cell}>{formatCurrency(comp.salePrice)}</td>
                  <td className={cell}>{comp.sqft.toLocaleString()}</td>
                  <td className={cell}>${Math.round(comp.salePrice / comp.sqft)}</td>
                  <td className={cell} style={{ color: COLORS.inkMuted }}>{comp.daysOnMarket}d</td>
                  <td className={cell} style={{ color: COLORS.inkMuted }}>{comp.distanceMiles} mi</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Panel tone="gold">
            <Eyebrow className="mb-1">Estimated value from included comps</Eyebrow>
            <span className="text-2xl" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>
              {estimatedValue !== null ? formatCurrency(estimatedValue) : "Include at least 1 comp"}
            </span>
            {estimatedValue !== null && (
              <p className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                Average price per sq ft of the included sales × your {assumptions.livingAreaSqft.toLocaleString()} sq ft.
              </p>
            )}
          </Panel>
          <AssumptionFields keys={["livingAreaSqft", "homeValue"]} />
        </div>
      </div>

      <div>
        <SectionTitle>5-year price trend</SectionTitle>
        <Panel>
          <PriceTrendChart points={SAMPLE_PRICE_TREND} />
        </Panel>
      </div>
    </div>
  );
}
