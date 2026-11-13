"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { NATIONAL_ROI_BY_PROJECT, PROJECT_TYPES, calculateDynamicRenovationROI, type ProjectType } from "../../lib/premiumTypes";
import { EngineHeader, Panel, RangeField, StatRow, formatCurrency, signedPercent } from "./ui";

export default function DynamicRenovationEngine() {
  const [selectedType, setSelectedType] = useState<ProjectType>("kitchen");
  const [materialTrend, setMaterialTrend] = useState(2.5);
  const [laborTrend, setLaborTrend] = useState(1.2);

  const result = calculateDynamicRenovationROI(selectedType, materialTrend, laborTrend);
  const base = NATIONAL_ROI_BY_PROJECT[selectedType];
  const netCost = result.costEstimate - result.adjustedValueAdded;

  return (
    <div>
      <EngineHeader
        title="Dynamic Renovation ROI Engine"
        description="Recoup rates adjusted for current material and labor cost movement — not the static national average."
      />

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
          <RangeField
            label="Material cost index, 90d trend" display={signedPercent(materialTrend)}
            value={materialTrend} min={-8} max={8} step={0.5} onChange={setMaterialTrend}
          />
          <RangeField
            label="Labor cost index, 90d trend" display={signedPercent(laborTrend)}
            value={laborTrend} min={-8} max={8} step={0.5} onChange={setLaborTrend}
          />
          <p className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            National baseline recoup rate for this project: {Math.round(base.recoupRate * 100)}%
          </p>
        </div>

        <Panel tone="gold">
          <StatRow label="Adjusted recoup rate" value={`${Math.round(result.adjustedRecoupRate * 100)}%`} strong />
          <StatRow label="Current cost estimate" value={formatCurrency(result.costEstimate)} />
          <StatRow label="Value added at resale" value={formatCurrency(result.adjustedValueAdded)} strong />
          <StatRow
            label={netCost > 0 ? "Out of pocket after resale bump" : "Gain after resale bump"}
            value={formatCurrency(Math.abs(netCost))}
            color={netCost > 0 ? COLORS.clay : COLORS.moss}
          />
        </Panel>
      </div>
    </div>
  );
}
