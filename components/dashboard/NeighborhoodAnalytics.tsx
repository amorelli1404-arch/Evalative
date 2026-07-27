"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import type { InventoryLevel, MarketVelocity, NeighborhoodScores } from "../../lib/premiumTypes";

const SAMPLE_NEIGHBORHOOD: NeighborhoodScores = {
  walkScore: 78,
  transitScore: 54,
  schoolRating: 8,
  zoning: "R-1 Single Family",
};

const SAMPLE_VELOCITY: MarketVelocity = {
  medianDaysOnMarket: 18,
  daysOnMarketTrend: "falling",
  inventoryLevel: "low",
  priceCutsPercent: 12,
};

const INVENTORY_LABEL: Record<InventoryLevel, { label: string; color: string }> = {
  low: { label: "Low", color: COLORS.moss },
  medium: { label: "Medium", color: COLORS.ochre },
  high: { label: "High", color: COLORS.clay },
};

function ScoreCard({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
      <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{label}</div>
      <div className="text-2xl mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{value}<span className="text-sm" style={{ color: COLORS.inkMuted }}>/{max}</span></div>
      <div className="h-1.5 rounded-full w-full" style={{ backgroundColor: COLORS.hairline }}>
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: COLORS.gold }} />
      </div>
    </div>
  );
}

export default function NeighborhoodAnalytics() {
  const trendArrow = SAMPLE_VELOCITY.daysOnMarketTrend === "falling" ? "↓" : SAMPLE_VELOCITY.daysOnMarketTrend === "rising" ? "↑" : "→";
  const trendColor = SAMPLE_VELOCITY.daysOnMarketTrend === "falling" ? COLORS.moss : SAMPLE_VELOCITY.daysOnMarketTrend === "rising" ? COLORS.clay : COLORS.inkMuted;
  const inventory = INVENTORY_LABEL[SAMPLE_VELOCITY.inventoryLevel];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Neighborhood drivers
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ScoreCard label="Walk Score" value={SAMPLE_NEIGHBORHOOD.walkScore} max={100} />
          <ScoreCard label="Transit Score" value={SAMPLE_NEIGHBORHOOD.transitScore} max={100} />
          <ScoreCard label="School Rating" value={SAMPLE_NEIGHBORHOOD.schoolRating} max={10} />
          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Zoning</div>
            <div className="text-lg" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>{SAMPLE_NEIGHBORHOOD.zoning}</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Market momentum
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Median days on market</div>
            <div className="text-2xl" style={{ fontFamily: FONT_FAMILY.mono, color: trendColor }}>
              {SAMPLE_VELOCITY.medianDaysOnMarket}d <span className="text-lg">{trendArrow}</span>
            </div>
          </div>
          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Inventory level</div>
            <div className="text-2xl" style={{ fontFamily: FONT_FAMILY.mono, color: inventory.color }}>{inventory.label}</div>
          </div>
          <div className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
            <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Listings with price cuts</div>
            <div className="text-2xl" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{SAMPLE_VELOCITY.priceCutsPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
