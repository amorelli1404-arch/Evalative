/**
 * lib/design-tokens.ts
 *
 * The design token system for the product, referenced by every component
 * in this directory. Intentional departure from typical PropTech visual
 * language (Zillow blue, Redfin red, glossy listing-photo hero treatments):
 * this product's entire pitch is "an independent instrument reading, not
 * a sales pitch," so the visual language borrows from lab reports and
 * appraisal documents -- muted paper background, monospace figures for
 * every number (the signature element), thin hairline dividers instead of
 * card shadows, and a restrained three-color verdict system rather than
 * loud alert-banner colors.
 *
 * COLOR PALETTE
 *   paper       #F2F1EC  -- background, warm-neutral, not the common cream/terracotta default
 *   ink         #1C1F1D  -- primary text, near-black with a warm undertone
 *   ink-muted   #5B5F5A  -- secondary text
 *   hairline    #D8D5CC  -- dividers, borders (never shadows for elevation)
 *   moss        #3F6652  -- favorable verdict (muted forest, not neon green)
 *   ochre       #A87B2E  -- caution/wait verdict (muted amber, not bright yellow)
 *   clay        #9C4A3C  -- unfavorable verdict (muted brick red, not alarm red)
 *   slate       #55606B  -- informational/neutral accent, insufficient-data state
 *
 * TYPE SYSTEM
 *   Display/headline : "Source Serif 4"  -- used sparingly, moderate contrast, not a loud hero serif
 *   Body             : "Inter"            -- clean grotesk for all UI copy
 *   Data/figures     : "IBM Plex Mono"    -- EVERY dollar figure, percentage, and confidence
 *                                            score renders in this face with tabular numerals.
 *                                            This is the signature typographic move: numbers
 *                                            are visually marked as measured data, distinct
 *                                            from surrounding prose.
 *
 * Register the font families in app/layout.tsx via next/font, and add the
 * palette below to tailwind.config.ts under theme.extend.colors so classes
 * like `bg-paper`, `text-moss`, `border-hairline` are available directly.
 */

export const COLORS = {
  paper: "#F2F1EC",
  ink: "#1C1F1D",
  inkMuted: "#5B5F5A",
  hairline: "#D8D5CC",
  moss: "#3F6652",
  mossSoft: "#E4EBE6",
  ochre: "#A87B2E",
  ochreSoft: "#F2E9DA",
  clay: "#9C4A3C",
  claySoft: "#F1E1DE",
  slate: "#55606B",
  slateSoft: "#E5E8EA",
} as const;

export const FONT_FAMILY = {
  display: "var(--font-source-serif)",
  body: "var(--font-inter)",
  mono: "var(--font-plex-mono)",
} as const;

/**
 * Every verdict maps to exactly one of three sentiment buckets, which is
 * deliberate: more than three visual states in a glanceable card system
 * defeats the purpose of "short, simple, actionable." insufficient_data is
 * a fourth, explicitly NEUTRAL bucket -- it must never be styled as
 * favorable or unfavorable, since no verdict was actually reached.
 */
export type VerdictSentiment = "favorable" | "caution" | "unfavorable" | "neutral";

import type { Verdict } from "./types";

export const VERDICT_SENTIMENT: Record<Verdict, VerdictSentiment> = {
  renovate_now: "favorable",
  rent_out: "favorable",
  buy: "favorable",
  refinance_now: "favorable",
  wait: "caution",
  hold: "caution",
  continue_renting: "caution",
  refinance_wait: "caution",
  not_worth_it: "unfavorable",
  sell: "unfavorable",
  insufficient_data: "neutral",
};

export const SENTIMENT_STYLE: Record<
  VerdictSentiment,
  { fg: string; bg: string; label: string; symbol: string }
> = {
  favorable: { fg: COLORS.moss, bg: COLORS.mossSoft, label: "Favorable", symbol: "●" },
  caution: { fg: COLORS.ochre, bg: COLORS.ochreSoft, label: "Worth watching", symbol: "◐" },
  unfavorable: { fg: COLORS.clay, bg: COLORS.claySoft, label: "Not favorable", symbol: "○" },
  neutral: { fg: COLORS.slate, bg: COLORS.slateSoft, label: "Insufficient data", symbol: "–" },
};

/** Human-readable labels for verdict values, used as a fallback / accessible
 * label alongside the AI-generated verdict_line text. */
export const VERDICT_LABEL: Record<Verdict, string> = {
  renovate_now: "Renovate now",
  wait: "Wait and monitor",
  not_worth_it: "Not worth it right now",
  sell: "Selling looks favorable",
  rent_out: "Renting it out looks favorable",
  hold: "No clear advantage either way",
  buy: "Buying looks favorable",
  continue_renting: "Renting looks favorable for now",
  refinance_now: "Refinance now",
  refinance_wait: "Wait to refinance",
  insufficient_data: "Not enough data yet",
};

/** Maps machine-readable key_driver codes (from roi_engine.py) to short,
 * plain-language labels for use in Layer 2/3 detail views. The AI-formatted
 * card handles translating this into full sentences (reason_text); this
 * mapping is for contexts that render the raw EvaluationOutput directly,
 * such as the fallback template card or the Layer 3 methodology panel. */
export const KEY_DRIVER_LABEL: Record<string, string> = {
  local_market_outpacing_national_recoup: "Your local market is appreciating faster than average",
  strong_national_recoup_category: "This project type recoups well on average nationally",
  material_costs_declining: "Material costs are trending down",
  moderate_recoup_stable_costs: "Solid return with stable costs",
  recoup_below_cost_threshold: "This project won't return its full cost right now",
  rent_vs_sell_within_margin: "Renting and selling come out roughly even",
  rental_cash_flow_plus_appreciation_favors_holding: "Rental income plus appreciation favors holding",
  reinvested_sale_proceeds_outperform_rental_path: "Selling and reinvesting the proceeds comes out ahead",
  buying_total_cost_favorable_over_holding_period: "Buying costs less than renting over this timeframe",
  renting_total_cost_favorable_or_comparable: "Renting costs less or about the same over this timeframe",
  breakeven_within_typical_holding_period: "You'd break even on closing costs within a typical stay",
  breakeven_exceeds_typical_holding_period: "It would take longer than usual to break even",
  rate_improvement_below_threshold: "Current rates aren't enough lower to make this worth modeling",
  no_positive_monthly_savings: "This wouldn't lower your monthly payment",
  missing_avm_value: "We don't have a current value estimate for this property yet",
  missing_current_mortgage_data: "We don't have your current mortgage details yet",
  unsupported_renovation_category: "We don't yet support evaluations for this project type",
};
