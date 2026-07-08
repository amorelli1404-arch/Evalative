/**
 * lib/types.ts
 *
 * TypeScript types mirroring models/evaluation_schema.py exactly. Kept as a
 * direct 1:1 mapping so the frontend never needs to guess at shapes the
 * backend can produce -- if a field is added/changed in the Pydantic model,
 * this file must be updated in the same PR, not discovered later via a
 * runtime type error.
 */

export type ScenarioType =
  | "renovation_roi"
  | "sell_vs_rent"
  | "rent_vs_buy"
  | "refinance";

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

/** Mirrors ai.claude_formatter.FormattedCard -- the only shape the
 * dashboard's Layer 1 view is allowed to render text from. */
export interface FormattedCard {
  verdict_line: string;
  number_line: string;
  reason_text: string;
  next_step: string;
  source_evaluation_calculation_version: string;
  ai_model_version: string;
  numeric_validation_passed: boolean;
}

/** Mirrors models.evaluation_schema.EvaluationOutput -- the full
 * deterministic calculation result. Layer 2 (deep-dive) and Layer 3 (raw
 * config) render directly from this, never from the AI-generated card
 * text, since these views exist specifically to show the underlying math. */
export interface EvaluationOutput {
  scenario_type: ScenarioType;
  verdict: Verdict;
  confidence_score: number; // 0.0 - 1.0
  roi_percent: number | null;
  cost_estimate: number | null;
  value_added: number | null;
  key_driver: string;
  data_freshness_days: number;
  breakeven_years: number | null;
  projected_value_at_holding_period: number | null;
  calculation_version: string;
}

/** A single comparable sale used in the valuation -- surfaced only in
 * Layer 2, per the progressive-disclosure design (never on the default
 * Layer 1 card). */
export interface ComparableSale {
  address_label: string; // e.g. "0.3 mi away" -- never a full street address for comps you don't own, for privacy
  sale_price: number;
  sale_date: string; // ISO date string
  living_area_sqft: number;
  distance_miles: number;
}

/** A single entry in the Decision Journal (schema/004_decision_journal.sql). */
export interface DecisionJournalEntry {
  id: string;
  scenario_type: ScenarioType;
  verdict_shown: Verdict;
  card_verdict_line: string;
  card_number_line: string;
  shown_at: string; // ISO datetime
  reconciliation_status: "pending" | "reconciled" | "insufficient_data" | "user_dismissed";
  actual_outcome_summary: string | null;
  variance_from_prediction_pct: number | null;
}

/** Answers captured by the 6-question condition wizard during onboarding.
 * Mirrors the condition columns on the `properties` table. */
export interface ConditionSurveyAnswers {
  kitchen_condition: "never_updated" | "0_5yr" | "5_15yr" | "15yr_plus" | null;
  bathroom_condition: "never_updated" | "0_5yr" | "5_15yr" | "15yr_plus" | null;
  roof_age_years: number | null;
  hvac_age_years: number | null;
  occupancy_type: "owner_occupied" | "rental_owned" | "renting" | null;
  primary_goal: "renovation_evaluation" | "sell_vs_rent" | "rent_vs_buy" | null;
}
