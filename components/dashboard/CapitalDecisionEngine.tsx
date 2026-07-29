"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateRentVsBuy, calculateSellVsRent, type CapitalDecisionInputs } from "../../lib/premiumTypes";

export default function CapitalDecisionEngine() {
  const [inputs, setInputs] = useState<CapitalDecisionInputs>({
    homeValue: 425000,
    monthlyRent: 2400,
    monthlyOwnCost: 2850,
    annualAppreciationPercent: 4.2,
    holdingYears: 7,
    sellingCostPercent: 7,
  });

  const rentVsBuy = calculateRentVsBuy(inputs);
  const sellVsRent = calculateSellVsRent(inputs);

  const update = <K extends keyof CapitalDecisionInputs>(key: K, value: number) => setInputs((prev) => ({ ...prev, [key]: value }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm" style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}>
          Max exclusive
        </span>
      </div>
      <h3 className="text-lg mb-1" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        Automated Capital Decision Engine
      </h3>
      <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        Confidence-scored recommendations across both major capital decisions, from one shared set of assumptions.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { key: "homeValue" as const, label: "Home value ($)", step: 5000 },
          { key: "monthlyRent" as const, label: "Monthly rent ($)", step: 50 },
          { key: "monthlyOwnCost" as const, label: "Monthly own cost ($)", step: 50 },
          { key: "annualAppreciationPercent" as const, label: "Annual appreciation (%)", step: 0.1 },
          { key: "holdingYears" as const, label: "Holding period (years)", step: 1 },
          { key: "sellingCostPercent" as const, label: "Selling costs (%)", step: 0.5 },
        ].map((field) => (
          <label key={field.key} className="block">
            <span className="text-[10px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{field.label}</span>
            <input
              type="number" step={field.step} value={inputs[field.key]}
              onChange={(e) => update(field.key, parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1.5 text-sm rounded-sm border"
              style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
            />
          </label>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Rent vs. Buy", result: rentVsBuy },
          { title: "Sell vs. Rent", result: sellVsRent },
        ].map(({ title, result }) => (
          <div key={title} className="rounded-sm border p-5" style={{ borderColor: COLORS.hairline }}>
            <div className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, letterSpacing: "0.05em" }}>
              {title}
            </div>
            <div className="text-2xl mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.moss }}>
              {result.recommendedAction}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1.5 flex-1 rounded-full" style={{ backgroundColor: COLORS.hairline }}>
                <div className="h-1.5 rounded-full" style={{ width: `${result.confidenceScore}%`, backgroundColor: COLORS.gold }} />
              </div>
              <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>{result.confidenceScore}%</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              {result.reasoning}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
