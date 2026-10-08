import type { EvaluationOutput, FormattedCard, ComparableSale } from "./types";
import { calculateRentVsBuy, calculateSellVsRent, type CapitalDecisionInputs } from "./premiumTypes";

const NATIONAL_BASELINE_COST: Record<string, number> = {
  minor_kitchen_remodel: 28000,
  major_kitchen_remodel: 82000,
  bathroom_remodel: 25000,
};

const NATIONAL_RECOUP_RATE: Record<string, number> = {
  minor_kitchen_remodel: 0.96,
  major_kitchen_remodel: 0.58,
  bathroom_remodel: 0.71,
};

const LOCAL_MARKET_MULTIPLIER = 1.13;

export function computeMockEvaluation(
  category: string,
  budgetOverride?: number | null
): { evaluation: EvaluationOutput; card: FormattedCard } {
  const cost = budgetOverride && budgetOverride > 0 ? budgetOverride : NATIONAL_BASELINE_COST[category] ?? NATIONAL_BASELINE_COST.minor_kitchen_remodel;
  const recoupRate = NATIONAL_RECOUP_RATE[category] ?? NATIONAL_RECOUP_RATE.minor_kitchen_remodel;
  const valueAdded = Math.round(cost * recoupRate * LOCAL_MARKET_MULTIPLIER);
  const roiPercent = Math.round((valueAdded / cost) * 100);

  let verdict: EvaluationOutput["verdict"];
  let verdictLine: string;
  let reasonText: string;

  if (roiPercent >= 100) {
    verdict = "renovate_now";
    verdictLine = "🟢 Worth it right now";
    reasonText = "Your local market is appreciating faster than the national average, which is boosting returns on this kind of project above what's typical elsewhere.";
  } else if (roiPercent >= 70) {
    verdict = "wait";
    verdictLine = "🟡 Worth monitoring";
    reasonText = "This project returns a solid share of its cost, but it's close enough to the line that timing matters.";
  } else {
    verdict = "not_worth_it";
    verdictLine = "🔴 Not worth it right now";
    reasonText = "This project type typically doesn't return its full cost in your area right now.";
  }

  const evaluation: EvaluationOutput = {
    scenario_type: "renovation_roi",
    verdict,
    confidence_score: 0.84,
    roi_percent: roiPercent,
    cost_estimate: cost,
    value_added: valueAdded,
    key_driver: "local_market_outpacing_national_recoup",
    data_freshness_days: 0,
    breakeven_years: null,
    projected_value_at_holding_period: null,
    calculation_version: "demo-1.0.0",
  };

  const card: FormattedCard = {
    verdict_line: verdictLine,
    number_line: `Est. $${valueAdded.toLocaleString()} value added vs. $${cost.toLocaleString()} cost (${roiPercent}% return)`,
    reason_text: reasonText,
    next_step: roiPercent >= 100 ? "Get 2-3 contractor quotes now to lock in current pricing." : "Revisit this evaluation after finishing higher-return projects first.",
    source_evaluation_calculation_version: "demo-1.0.0",
    ai_model_version: "demo_mock::no_llm",
    numeric_validation_passed: true,
  };

  return { evaluation, card };
}

// Same sample assumptions the Max dashboard's Capital Decision Engine opens
// with, so the homepage demo and the dashboard tell one consistent story.
const SAMPLE_CAPITAL_INPUTS: CapitalDecisionInputs = {
  homeValue: 425000,
  monthlyRent: 2400,
  monthlyOwnCost: 2850,
  annualAppreciationPercent: 4.2,
  holdingYears: 7,
  sellingCostPercent: 7,
};

const CAPITAL_VERDICT_COPY: Record<
  "sell" | "rent_out" | "buy" | "continue_renting",
  { verdictLine: string; numberSuffix: string; keyDriver: string; nextStep: string }
> = {
  sell: {
    verdictLine: "🟡 Selling looks favorable",
    numberSuffix: "ahead by selling and reinvesting",
    keyDriver: "reinvested_sale_proceeds_outperform_rental_path",
    nextStep: "Ask 2-3 local agents for a listing-price opinion before you decide.",
  },
  rent_out: {
    verdictLine: "🟢 Renting it out looks favorable",
    numberSuffix: "ahead by renting it out",
    keyDriver: "rental_cash_flow_plus_appreciation_favors_holding",
    nextStep: "Get a rental estimate from a local property manager to confirm the rent assumption.",
  },
  buy: {
    verdictLine: "🟢 Buying looks favorable",
    numberSuffix: "ahead by buying",
    keyDriver: "buying_total_cost_favorable_over_holding_period",
    nextStep: "Get pre-approved so you know your real rate before making an offer.",
  },
  continue_renting: {
    verdictLine: "🟡 Renting looks favorable for now",
    numberSuffix: "ahead by continuing to rent",
    keyDriver: "renting_total_cost_favorable_or_comparable",
    nextStep: "Revisit this evaluation when rates or local prices move.",
  },
};

export function computeMockCapitalEvaluation(
  goal: "sell_vs_rent" | "rent_vs_buy"
): { evaluation: EvaluationOutput; card: FormattedCard } {
  const result = goal === "sell_vs_rent" ? calculateSellVsRent(SAMPLE_CAPITAL_INPUTS) : calculateRentVsBuy(SAMPLE_CAPITAL_INPUTS);

  let verdict: "sell" | "rent_out" | "buy" | "continue_renting";
  if (goal === "sell_vs_rent") {
    verdict = result.recommendedAction === "Rent it out" ? "rent_out" : "sell";
  } else {
    verdict = result.recommendedAction === "Buy" ? "buy" : "continue_renting";
  }
  const copy = CAPITAL_VERDICT_COPY[verdict];

  const evaluation: EvaluationOutput = {
    scenario_type: goal,
    verdict,
    confidence_score: result.confidenceScore / 100,
    roi_percent: null,
    cost_estimate: null,
    value_added: result.netAdvantage,
    key_driver: copy.keyDriver,
    data_freshness_days: 0,
    breakeven_years: null,
    projected_value_at_holding_period: null,
    calculation_version: "demo-1.0.0",
  };

  const card: FormattedCard = {
    verdict_line: copy.verdictLine,
    number_line: `Est. $${result.netAdvantage.toLocaleString()} ${copy.numberSuffix} over ${SAMPLE_CAPITAL_INPUTS.holdingYears} years`,
    reason_text: result.reasoning,
    next_step: copy.nextStep,
    source_evaluation_calculation_version: "demo-1.0.0",
    ai_model_version: "demo_mock::no_llm",
    numeric_validation_passed: true,
  };

  return { evaluation, card };
}

export const MOCK_COMPARABLE_SALES: ComparableSale[] = [
  { address_label: "0.2 mi away", sale_price: 612000, sale_date: "2026-06-12", living_area_sqft: 1850, distance_miles: 0.2 },
  { address_label: "0.4 mi away", sale_price: 598000, sale_date: "2026-05-28", living_area_sqft: 1780, distance_miles: 0.4 },
  { address_label: "0.3 mi away", sale_price: 634000, sale_date: "2026-05-15", living_area_sqft: 1920, distance_miles: 0.3 },
];
