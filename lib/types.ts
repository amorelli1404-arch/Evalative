export type ScenarioType = "renovation_roi" | "sell_vs_rent" | "rent_vs_buy" | "refinance";

export type Verdict =
  | "renovate_now"
  | "wait"
  | "not_worth_it"
  | "sell"
  | "rent_out"
  | "hold"
  | "buy"
  | "continue_renting"
  | "refinance_now"
  | "refinance_wait"
  | "insufficient_data";

export interface FormattedCard {
  verdict_line: string;
  number_line: string;
  reason_text: string;
  next_step: string;
  source_evaluation_calculation_version: string;
  ai_model_version: string;
  numeric_validation_passed: boolean;
}

export interface EvaluationOutput {
  scenario_type: ScenarioType;
  verdict: Verdict;
  confidence_score: number;
  roi_percent: number | null;
  cost_estimate: number | null;
  value_added: number | null;
  key_driver: string;
  data_freshness_days: number;
  breakeven_years: number | null;
  projected_value_at_holding_period: number | null;
  calculation_version: string;
}

export interface ComparableSale {
  address_label: string;
  sale_price: number;
  sale_date: string;
  living_area_sqft: number;
  distance_miles: number;
}

export interface DecisionJournalEntry {
  id: string;
  scenario_type: ScenarioType;
  verdict_shown: Verdict;
  card_verdict_line: string;
  card_number_line: string;
  shown_at: string;
  reconciliation_status: "pending" | "reconciled" | "insufficient_data" | "user_dismissed";
  actual_outcome_summary: string | null;
  variance_from_prediction_pct: number | null;
}

export interface ConditionSurveyAnswers {
  kitchen_condition: "never_updated" | "0_5yr" | "5_15yr" | "15yr_plus" | null;
  bathroom_condition: "never_updated" | "0_5yr" | "5_15yr" | "15yr_plus" | null;
  roof_age_years: number | null;
  hvac_age_years: number | null;
  occupancy_type: "owner_occupied" | "rental_owned" | "renting" | null;
  primary_goal: "renovation_evaluation" | "sell_vs_rent" | "rent_vs_buy" | null;
}
