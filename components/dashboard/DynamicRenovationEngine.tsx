"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { calculateDynamicRenovationROI, NATIONAL_ROI_BY_PROJECT, type ProjectType } from "../../lib/premiumTypes";

const PROJECT_TYPES: ProjectType[] = ["kitchen", "bathroom", "addition", "curb_appeal"];

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function DynamicRenovationEngine() {
  const [selectedType, setSelectedType] = useState<ProjectType>("kitchen");
  const [materialTrend, setMaterialTrend] = useState(2.5);
  const [laborTrend, setLaborTrend] = useState(1.2);

  const result = calculateDynamicRenovationROI(selectedType, materialTrend, laborTrend);
  const base = NATIONAL_ROI_BY_PROJECT[selectedType];

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm"
          style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}
        >
          Max exclusive
        </span>
      </div>
      <h3 className="text-lg mb-1" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        Dynamic Renovation ROI Engine
      </h3>
      <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        Recoup rates adjusted for current material and labor cost movement — not the static national average.
      </p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {PROJECT_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className="px-3 py-1.5 text-xs rounded-sm border"
            style={{
              fontFamily: FONT_FAMILY.body,
              borderColor: selectedType === type ? COLORS.gold : COLORS.hairline,
              backgroundColor: selectedType === type ? COLORS.goldSoft : "white",
              color: COLORS.ink,
            }}
          >
            {NATIONAL_ROI_BY_PROJECT[type].label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Material cost index, 90d trend</span>
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{materialTrend >= 0 ? "+" : ""}{materialTrend}%</span>
            </div>
            <input type="range" min={-8} max={8} step={0.5} value={materialTrend} onChange={(e) => setMaterialTrend(parseFloat(e.target.value))} className="w-full" style={{ accentColor: COLORS.gold }} />
          </div>
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Labor cost index, 90d trend</span>
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{laborTrend >= 0 ? "+" : ""}{laborTrend}%</span>
            </div>
            <input type="range" min={-8} max={8} step={0.5} value={laborTrend} onChange={(e) => setLaborTrend(parseFloat(e.target.value))} className="w-full" style={{ accentColor: COLORS.gold }} />
          </div>
          <p className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            National baseline recoup rate for this project: {Math.round(base.recoupRate * 100)}%
          </p>
        </div>

        <div className="rounded-sm p-5" style={{ backgroundColor: COLORS.goldSoft }}>
          <div className="flex justify-between mb-3 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <span>Adjusted recoup rate</span>
            <span style={{ fontFamily: FONT_FAMILY.mono, fontWeight: 600 }}>{Math.round(result.adjustedRecoupRate * 100)}%</span>
          </div>
          <div className="flex justify-between mb-3 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <span>Current cost estimate</span>
            <span style={{ fontFamily: FONT_FAMILY.mono }}>{formatCurrency(result.costEstimate)}</span>
          </div>
          <div className="flex justify-between text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            <span>Adjusted value added</span>
            <span style={{ fontFamily: FONT_FAMILY.mono, fontWeight: 600 }}>{formatCurrency(result.adjustedValueAdded)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
