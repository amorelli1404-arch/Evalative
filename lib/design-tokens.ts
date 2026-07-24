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

export const SENTIMENT_STYLE: Record<VerdictSentiment, { fg: string; bg: string; label: string; symbol: string }> = {
  favorable: { fg: COLORS.moss, bg: COLORS.mossSoft, label: "Favorable", symbol: "●" },
  caution: { fg: COLORS.ochre, bg: COLORS.ochreSoft, label: "Worth watching", symbol: "◐" },
  unfavorable: { fg: COLORS.clay, bg: COLORS.claySoft, label: "Not favorable", symbol: "○" },
  neutral: { fg: COLORS.slate, bg: COLORS.slateSoft, label: "Insufficient data", symbol: "–" },
};

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
