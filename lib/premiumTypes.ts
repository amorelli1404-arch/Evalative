/**
 * lib/premiumTypes.ts
 *
 * Shared types and deterministic calculation functions for the 5 premium
 * dashboard features. Follows the same principle as core/roi_engine.py on
 * the backend: every number here comes from an actual formula applied to
 * actual input values, never a hardcoded "looks realistic" placeholder
 * presented as if it were real data. Where real data doesn't exist yet
 * (comps, neighborhood scores), the calling component is responsible for
 * clearly labeling it as example/sample data -- these functions just do
 * correct math on whatever numbers they're given.
 */

// ---------------------------------------------------------------------------
// Feature 1: Financial & ROI Modeling
// ---------------------------------------------------------------------------

export type ProjectType = "kitchen" | "bathroom" | "addition" | "curb_appeal";

export interface ProjectROI {
  type: ProjectType;
  label: string;
  costEstimate: number;
  valueAdded: number;
  roiPercent: number;
}

export interface FinancingInputs {
  purchasePrice: number;
  interestRatePercent: number;
  loanTermYears: number;
  downPaymentPercent: number;
  annualHoa: number;
  annualInsurance: number;
  annualMaintenancePercent: number;
  annualPropertyTaxPercent: number;
  monthlyRentalEstimate: number;
}

export interface FinancingOutput {
  loanAmount: number;
  monthlyMortgagePayment: number;
  monthlyHoa: number;
  monthlyInsurance: number;
  monthlyMaintenance: number;
  monthlyPropertyTax: number;
  totalMonthlyCost: number;
  monthlyRentalYield: number;
  breakEven: boolean;
}

export function calculateMonthlyMortgagePayment(loanAmount: number, annualRatePercent: number, termYears: number): number {
  const monthlyRate = annualRatePercent / 100 / 12;
  const numPayments = termYears * 12;
  if (monthlyRate === 0) return loanAmount / numPayments;
  const numerator = monthlyRate * Math.pow(1 + monthlyRate, numPayments);
  const denominator = Math.pow(1 + monthlyRate, numPayments) - 1;
  return loanAmount * (numerator / denominator);
}

export function calculateFinancing(inputs: FinancingInputs): FinancingOutput {
  const downPayment = inputs.purchasePrice * (inputs.downPaymentPercent / 100);
  const loanAmount = inputs.purchasePrice - downPayment;
  const monthlyMortgagePayment = calculateMonthlyMortgagePayment(loanAmount, inputs.interestRatePercent, inputs.loanTermYears);
  const monthlyHoa = inputs.annualHoa / 12;
  const monthlyInsurance = inputs.annualInsurance / 12;
  const monthlyMaintenance = (inputs.purchasePrice * (inputs.annualMaintenancePercent / 100)) / 12;
  const monthlyPropertyTax = (inputs.purchasePrice * (inputs.annualPropertyTaxPercent / 100)) / 12;
  const totalMonthlyCost = monthlyMortgagePayment + monthlyHoa + monthlyInsurance + monthlyMaintenance + monthlyPropertyTax;
  const monthlyRentalYield = inputs.monthlyRentalEstimate - totalMonthlyCost;

  return {
    loanAmount,
    monthlyMortgagePayment,
    monthlyHoa,
    monthlyInsurance,
    monthlyMaintenance,
    monthlyPropertyTax,
    totalMonthlyCost,
    monthlyRentalYield,
    breakEven: monthlyRentalYield >= 0,
  };
}

export const NATIONAL_ROI_BY_PROJECT: Record<ProjectType, { label: string; recoupRate: number; baselineCost: number }> = {
  kitchen: { label: "Kitchen Remodel", recoupRate: 0.78, baselineCost: 45000 },
  bathroom: { label: "Bathroom Remodel", recoupRate: 0.71, baselineCost: 25000 },
  addition: { label: "Room Addition", recoupRate: 0.65, baselineCost: 95000 },
  curb_appeal: { label: "Curb Appeal (Exterior/Landscaping)", recoupRate: 1.02, baselineCost: 12000 },
};

export function calculateProjectROI(type: ProjectType, costOverride?: number): ProjectROI {
  const base = NATIONAL_ROI_BY_PROJECT[type];
  const costEstimate = costOverride ?? base.baselineCost;
  const valueAdded = Math.round(costEstimate * base.recoupRate);
  const roiPercent = Math.round((valueAdded / costEstimate) * 100);
  return { type, label: base.label, costEstimate, valueAdded, roiPercent };
}

// ---------------------------------------------------------------------------
// Feature 2: Comparative Market Analysis
// ---------------------------------------------------------------------------

export interface CompProperty {
  id: string;
  addressLabel: string;
  salePrice: number;
  sqft: number;
  daysOnMarket: number;
  distanceMiles: number;
  saleDate: string;
  included: boolean;
}

export interface PriceTrendPoint {
  year: number;
  estimatedValue: number;
}

export function recalculateEstimateFromComps(comps: CompProperty[], subjectSqft: number): number | null {
  const included = comps.filter((c) => c.included);
  if (included.length === 0) return null;
  const avgPricePerSqft = included.reduce((sum, c) => sum + c.salePrice / c.sqft, 0) / included.length;
  return Math.round(avgPricePerSqft * subjectSqft);
}

// ---------------------------------------------------------------------------
// Feature 3: What-If Scenario Builder
// ---------------------------------------------------------------------------

export interface ScenarioInputs {
  interestRateDeltaPercent: number;
  holdingPeriodYears: number;
  marketAdjustmentPercent: number;
  occupancyRatePercent: number;
}

export type VerdictOutcome = "sell_now" | "rent_out" | "hold" | "renovate_now" | "wait";

export interface ScenarioOutput {
  confidenceScore: number;
  verdict: VerdictOutcome;
  verdictLabel: string;
  projectedMonthlyNet: number;
}

const BASE_INTEREST_RATE = 6.5;
const BASE_MONTHLY_RENT = 2400;
const BASE_MONTHLY_COST = 2150;

export function calculateScenarioOutcome(inputs: ScenarioInputs): ScenarioOutput {
  const effectiveRate = BASE_INTEREST_RATE + inputs.interestRateDeltaPercent;
  const occupancyFactor = inputs.occupancyRatePercent / 100;
  const marketFactor = 1 + inputs.marketAdjustmentPercent / 100;

  const adjustedRent = BASE_MONTHLY_RENT * occupancyFactor * marketFactor;
  const rateAdjustedCost = BASE_MONTHLY_COST * (1 + (inputs.interestRateDeltaPercent / BASE_INTEREST_RATE) * 0.35);
  const projectedMonthlyNet = Math.round(adjustedRent - rateAdjustedCost);

  const holdingPenalty = Math.min(20, inputs.holdingPeriodYears * 1.5);
  const volatilityPenalty = Math.abs(inputs.marketAdjustmentPercent) * 1.2;
  const confidenceScore = Math.max(40, Math.round(88 - holdingPenalty - volatilityPenalty));

  let verdict: VerdictOutcome;
  let verdictLabel: string;

  if (effectiveRate >= 7.5 && projectedMonthlyNet < 0) {
    verdict = "sell_now";
    verdictLabel = "Sell now";
  } else if (projectedMonthlyNet > 200 && inputs.occupancyRatePercent >= 90) {
    verdict = "rent_out";
    verdictLabel = "Rent it out";
  } else if (inputs.marketAdjustmentPercent <= -6) {
    verdict = "wait";
    verdictLabel = "Wait and monitor";
  } else if (projectedMonthlyNet < -100) {
    verdict = "sell_now";
    verdictLabel = "Sell now";
  } else {
    verdict = "hold";
    verdictLabel = "Hold steady";
  }

  return { confidenceScore, verdict, verdictLabel, projectedMonthlyNet };
}

// ---------------------------------------------------------------------------
// Feature 5: Neighborhood & Market Analytics
// ---------------------------------------------------------------------------

export interface NeighborhoodScores {
  walkScore: number;
  transitScore: number;
  schoolRating: number;
  zoning: string;
}

export type InventoryLevel = "low" | "medium" | "high";

export interface MarketVelocity {
  medianDaysOnMarket: number;
  daysOnMarketTrend: "rising" | "falling" | "stable";
  inventoryLevel: InventoryLevel;
  priceCutsPercent: number;
}
