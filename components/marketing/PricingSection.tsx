"use client";

import { PricingTable } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full max-w-5xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="flex flex-col items-center text-center mb-10">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs uppercase tracking-wide mb-5"
          style={{ borderColor: COLORS.gold, color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}
        >
          <span style={{ color: COLORS.gold }}>●</span>
          Simple, honest pricing
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "32px", fontWeight: 600, color: COLORS.ink }}>
          Choose your plan
        </h2>
        <p className="text-sm mt-3 max-w-md" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Start free. Lock in founding member pricing for as long as you stay subscribed.
        </p>
      </div>

      <PricingTable
        appearance={{
          variables: {
            colorPrimary: COLORS.gold,
            colorPrimaryForeground: COLORS.ink,
            colorText: COLORS.ink,
            colorTextSecondary: COLORS.inkMuted,
            colorBackground: COLORS.paper,
            colorBorder: COLORS.hairline,
            fontFamily: FONT_FAMILY.body,
            borderRadius: "20px",
            spacingUnit: "0.85rem",
          },
          elements: {
            pricingTableCards: {
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px",
              alignItems: "stretch",
            },
            pricingTableCard: {
              border: `1px solid ${COLORS.hairline}`,
              boxShadow: "none",
              padding: "18px",
              height: "100%",
            },
            pricingTableCardTitle: {
              fontFamily: FONT_FAMILY.display,
              fontWeight: 600,
              fontSize: "16px",
              color: COLORS.ink,
            },
            pricingTableCardDescription: {
              fontFamily: FONT_FAMILY.body,
              fontSize: "12px",
              color: COLORS.inkMuted,
            },
            pricingTableCardFee: {
              fontFamily: FONT_FAMILY.mono,
              fontSize: "24px",
              color: COLORS.ink,
            },
            pricingTableCardFeaturesListItem: {
              fontFamily: FONT_FAMILY.body,
              fontSize: "13px",
              color: COLORS.ink,
            },
            pricingTableCardFooterButton: {
              fontFamily: FONT_FAMILY.body,
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "999px",
              boxShadow: "none",
              padding: "10px",
            },
          },
        }}
      />
    </section>
  );
}
