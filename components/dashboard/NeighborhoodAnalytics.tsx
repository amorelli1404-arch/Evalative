"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import type { InventoryLevel, MarketVelocity } from "../../lib/premiumTypes";
import { SAMPLE_NEIGHBORHOOD, SAMPLE_VELOCITY } from "../../lib/sampleData";
import { Eyebrow, Meter, SectionTitle } from "./ui";

const INVENTORY_LABEL: Record<InventoryLevel, { label: string; color: string }> = {
  low: { label: "Low", color: COLORS.moss },
  medium: { label: "Medium", color: COLORS.ochre },
  high: { label: "High", color: COLORS.clay },
};

const TREND: Record<MarketVelocity["daysOnMarketTrend"], { arrow: string; color: string }> = {
  falling: { arrow: "↓", color: COLORS.moss },
  rising: { arrow: "↑", color: COLORS.clay },
  stable: { arrow: "→", color: COLORS.inkMuted },
};

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
      <Eyebrow>{label}</Eyebrow>
      {children}
    </div>
  );
}

function ScoreTile({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <Tile label={label}>
      <div className="text-2xl mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>
        {value}<span className="text-sm" style={{ color: COLORS.inkMuted }}>/{max}</span>
      </div>
      <Meter percent={(value / max) * 100} thin />
    </Tile>
  );
}

export default function NeighborhoodAnalytics() {
  const trend = TREND[SAMPLE_VELOCITY.daysOnMarketTrend];
  const inventory = INVENTORY_LABEL[SAMPLE_VELOCITY.inventoryLevel];
  const big = "text-2xl";

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionTitle>Neighborhood drivers</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreTile label="Walk Score" value={SAMPLE_NEIGHBORHOOD.walkScore} max={100} />
          <ScoreTile label="Transit Score" value={SAMPLE_NEIGHBORHOOD.transitScore} max={100} />
          <ScoreTile label="School Rating" value={SAMPLE_NEIGHBORHOOD.schoolRating} max={10} />
          <Tile label="Zoning">
            <div className="text-lg" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>{SAMPLE_NEIGHBORHOOD.zoning}</div>
          </Tile>
        </div>
      </div>

      <div>
        <SectionTitle>Market momentum</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-4">
          <Tile label="Median days on market">
            <div className={big} style={{ fontFamily: FONT_FAMILY.mono, color: trend.color }}>
              {SAMPLE_VELOCITY.medianDaysOnMarket}d <span className="text-lg">{trend.arrow}</span>
            </div>
          </Tile>
          <Tile label="Inventory level">
            <div className={big} style={{ fontFamily: FONT_FAMILY.mono, color: inventory.color }}>{inventory.label}</div>
          </Tile>
          <Tile label="Listings with price cuts">
            <div className={big} style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{SAMPLE_VELOCITY.priceCutsPercent}%</div>
          </Tile>
        </div>
      </div>
    </div>
  );
}
