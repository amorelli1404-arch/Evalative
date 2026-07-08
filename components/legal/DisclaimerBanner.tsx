"use client";

/**
 * components/legal/DisclaimerBanner.tsx
 *
 * The Phase 4 legal disclaimer, as a reusable component rather than
 * copy-pasted text, so it renders identically everywhere a valuation or
 * evaluation figure is shown -- and so a future edit to the required
 * legal language happens in exactly one place. Two variants:
 *
 *   "compact"  -- a single-line version for space-constrained contexts
 *                 (e.g. beneath the Layer 1 verdict card).
 *   "full"     -- the complete disclosure, used in RawConfigPanel (Layer 3)
 *                 and anywhere the full legal text is required (e.g. the
 *                 account/subscription settings page, per standard SaaS
 *                 practice of surfacing key ToS terms outside just the
 *                 ToS document itself).
 *
 * This component must never be conditionally hidden based on subscription
 * tier, feature flag, or A/B test -- it is a compliance fixture, not a
 * marketing element subject to experimentation.
 */

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface DisclaimerBannerProps {
  variant: "compact" | "full";
}

const COMPACT_TEXT =
  "Estimate only, not an appraisal. Not financial or investment advice.";

const FULL_TEXT =
  "This is an automated estimate, not an appraisal. It has not been developed by a licensed " +
  "appraiser and does not comply with USPAP. Figures shown are modeled from public records and " +
  "market data using an automated valuation model and may differ from actual market value. " +
  "This platform is not a registered investment advisor, licensed appraiser, or real estate " +
  "broker, and nothing shown here constitutes personalized financial, investment, or legal advice. " +
  "Consult a licensed real estate professional, appraiser, or financial advisor before making " +
  "a property decision.";

export default function DisclaimerBanner({ variant }: DisclaimerBannerProps) {
  if (variant === "compact") {
    return (
      <p
        className="text-[11px] leading-snug"
        style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
      >
        {COMPACT_TEXT}
      </p>
    );
  }

  return (
    <div
      className="text-[12px] leading-relaxed p-3 rounded-sm border"
      style={{ color: COLORS.inkMuted, borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.body }}
    >
      {FULL_TEXT}
    </div>
  );
}
