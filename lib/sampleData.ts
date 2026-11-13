/**
 * lib/sampleData.ts
 *
 * Every placeholder figure the dashboard shows lives here, so it's obvious
 * what is example data and there's one file to swap out when real feeds
 * (comps, neighborhood scores, rate history) are connected. Figures are
 * sized to match the default $425,000 sample property so the tabs tell
 * one consistent story.
 */

import type {
  CompProperty,
  MarketVelocity,
  NeighborhoodScores,
  PriceTrendPoint,
  RateTrackingPoint,
} from "./premiumTypes";

export const SAMPLE_COMPS: CompProperty[] = [
  { id: "1", addressLabel: "0.2 mi away", salePrice: 418000, sqft: 1850, daysOnMarket: 14, distanceMiles: 0.2, saleDate: "2026-06-12", included: true },
  { id: "2", addressLabel: "0.4 mi away", salePrice: 405000, sqft: 1780, daysOnMarket: 22, distanceMiles: 0.4, saleDate: "2026-05-28", included: true },
  { id: "3", addressLabel: "0.3 mi away", salePrice: 437000, sqft: 1920, daysOnMarket: 9, distanceMiles: 0.3, saleDate: "2026-05-15", included: true },
  { id: "4", addressLabel: "0.6 mi away", salePrice: 392000, sqft: 1690, daysOnMarket: 31, distanceMiles: 0.6, saleDate: "2026-04-30", included: true },
  { id: "5", addressLabel: "0.5 mi away", salePrice: 451000, sqft: 2010, daysOnMarket: 18, distanceMiles: 0.5, saleDate: "2026-04-08", included: true },
];

export const SAMPLE_PRICE_TREND: PriceTrendPoint[] = [
  { year: 2021, estimatedValue: 347000 },
  { year: 2022, estimatedValue: 377000 },
  { year: 2023, estimatedValue: 390000 },
  { year: 2024, estimatedValue: 409000 },
  { year: 2025, estimatedValue: 421000 },
  { year: 2026, estimatedValue: 432000 },
];

export const SAMPLE_NEIGHBORHOOD: NeighborhoodScores = {
  walkScore: 78,
  transitScore: 54,
  schoolRating: 8,
  zoning: "R-1 Single Family",
};

export const SAMPLE_VELOCITY: MarketVelocity = {
  medianDaysOnMarket: 18,
  daysOnMarketTrend: "falling",
  inventoryLevel: "low",
  priceCutsPercent: 12,
};

export const SAMPLE_RATE_HISTORY: RateTrackingPoint[] = [
  { weekLabel: "8wk", ratePercent: 6.72 },
  { weekLabel: "7wk", ratePercent: 6.68 },
  { weekLabel: "6wk", ratePercent: 6.61 },
  { weekLabel: "5wk", ratePercent: 6.58 },
  { weekLabel: "4wk", ratePercent: 6.49 },
  { weekLabel: "3wk", ratePercent: 6.55 },
  { weekLabel: "2wk", ratePercent: 6.47 },
  { weekLabel: "now", ratePercent: 6.41 },
];
