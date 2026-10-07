"use client";

import { PricingTable } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

// Warm off-whites already used for the photo-overlay text and quiet table
// rows elsewhere on the site -- reused here so the pricing band reads as
// part of the same palette instead of a stark white widget.
const WARM_WASH = "#FAF8F2";
const WARM_TEXT = "#F5F4EF";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full border-t"
      style={{
        borderColor: COLORS.hairline,
        background: [
          "radial-gradient(60% 55% at 50% 0%, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0) 70%)",
          "radial-gradient(40% 45% at 12% 100%, rgba(63,102,82,0.06) 0%, rgba(63,102,82,0) 70%)",
          `linear-gradient(180deg, ${WARM_WASH} 0%, ${COLORS.paper} 100%)`,
        ].join(", "),
      }}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center mb-9">
          <span
            className="text-[11px] uppercase block mb-3"
            style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ochre, letterSpacing: "0.14em" }}
          >
            Simple, honest pricing
          </span>
          <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "24px", fontWeight: 600, color: COLORS.ink, lineHeight: 1.25 }}>
            Choose your plan
          </h2>
          <span className="block mt-4" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
          <p className="text-[13px] mt-4 max-w-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            Start free. Lock in founding member pricing for as long as you stay subscribed.
          </p>
        </div>

        <PricingTable
          appearance={{
            variables: {
              colorPrimary: COLORS.ink,
              colorPrimaryForeground: WARM_TEXT,
              colorText: COLORS.ink,
              colorTextSecondary: COLORS.inkMuted,
              colorBackground: COLORS.paper,
              colorBorder: COLORS.hairline,
              fontFamily: FONT_FAMILY.body,
              borderRadius: "3px",
              spacingUnit: "0.75rem",
            },
            elements: {
              pricingTable: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "14px",
                alignItems: "stretch",
              },
              pricingTableCard: {
                backgroundColor: COLORS.paper,
                border: `1px solid ${COLORS.hairline}`,
                borderRadius: "3px",
                boxShadow: "0 1px 2px rgba(26,26,26,0.03)",
                height: "100%",
                overflow: "hidden",
                transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
                "&:hover": {
                  borderColor: COLORS.gold,
                  boxShadow: "0 14px 32px rgba(168,123,46,0.10)",
                  transform: "translateY(-2px)",
                },
              },
              pricingTableCardHeader: {
                background: `linear-gradient(180deg, ${WARM_WASH} 0%, ${COLORS.paper} 100%)`,
                borderBottom: `1px solid ${COLORS.hairline}`,
                padding: "18px 18px 16px",
              },
              pricingTableCardTitle: {
                fontFamily: FONT_FAMILY.display,
                fontWeight: 600,
                fontSize: "16px",
                letterSpacing: "0.01em",
                color: COLORS.ink,
              },
              pricingTableCardDescription: {
                fontFamily: FONT_FAMILY.body,
                fontSize: "11.5px",
                lineHeight: 1.55,
                color: COLORS.inkMuted,
              },
              pricingTableCardFee: {
                fontFamily: FONT_FAMILY.display,
                fontWeight: 600,
                fontSize: "26px",
                lineHeight: 1.1,
                color: COLORS.ink,
              },
              pricingTableCardFeePeriod: {
                fontFamily: FONT_FAMILY.mono,
                fontSize: "10.5px",
                letterSpacing: "0.04em",
                color: COLORS.inkMuted,
              },
              pricingTableCardFeePeriodNotice: {
                fontFamily: FONT_FAMILY.body,
                fontSize: "11px",
                color: COLORS.inkMuted,
              },
              pricingTableCardBody: {
                backgroundColor: COLORS.paper,
              },
              pricingTableCardFeatures: {
                padding: "16px 18px",
              },
              pricingTableCardFeaturesList: {
                rowGap: "9px",
              },
              pricingTableCardFeaturesListItem: {
                fontFamily: FONT_FAMILY.body,
                fontSize: "12px",
                lineHeight: 1.5,
                color: COLORS.ink,
              },
              pricingTableCardFooter: {
                backgroundColor: COLORS.paper,
                borderTop: `1px solid ${COLORS.hairline}`,
                padding: "14px 18px 18px",
              },
              pricingTableCardFooterButton: {
                fontFamily: FONT_FAMILY.body,
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderRadius: "2px",
                boxShadow: "none",
                padding: "10px",
                transition: "background-color 200ms ease, color 200ms ease, border-color 200ms ease",
                "&:hover": {
                  backgroundColor: COLORS.gold,
                  borderColor: COLORS.gold,
                  color: COLORS.ink,
                },
              },
              pricingTableCardFooterNotice: {
                fontFamily: FONT_FAMILY.body,
                fontSize: "11px",
                color: COLORS.inkMuted,
              },
            },
          }}
        />
      </div>
    </section>
  );
}
