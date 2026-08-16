"use client";

import { PricingTable } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

const FREE_FEATURES = [
  "3 full evaluations, one-time",
  "Full verdict card & breakdown",
  "No credit card required",
];

const CARD_RADIUS = "24px";

export default function PricingSection({ onFreeSelect }: { onFreeSelect?: () => void }) {
  return (
    <section id="pricing" className="w-full max-w-6xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="flex flex-col items-center text-center mb-12">
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

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {/* Free tier — styled to match the Pro/Max cards so all three sit as one row */}
        <div
          className="p-7 flex flex-col"
          style={{ backgroundColor: COLORS.goldSoft, border: `1px solid ${COLORS.hairline}`, borderRadius: CARD_RADIUS }}
        >
          <span
            className="text-[11px] uppercase tracking-wide px-3 py-1 rounded-full self-start mb-4"
            style={{ backgroundColor: "white", color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
          >
            No commitment
          </span>
          <h3 style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, fontSize: "20px", color: COLORS.ink }}>
            Free
          </h3>
          <p
            className="mt-2"
            style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, fontSize: "14px" }}
          >
            Test-drive the full evaluation engine
          </p>
          <div className="mt-5 mb-5" style={{ fontFamily: FONT_FAMILY.mono, fontSize: "34px", color: COLORS.ink }}>
            $0
          </div>
          <ul className="flex flex-col gap-2.5 mb-6">
            {FREE_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm"
                style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}
              >
                <span style={{ color: COLORS.moss }}>+</span>
                {feature}
              </li>
            ))}
          </ul>
          <button
            onClick={onFreeSelect}
            className="w-full py-3.5 rounded-full text-sm font-semibold mt-auto"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
          >
            Get started free
          </button>
        </div>

        <div className="md:col-span-2 h-full">
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
                borderRadius: "24px",
              },
              elements: {
                pricingTableCards: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "24px",
                  alignItems: "stretch",
                  height: "100%",
                },
                pricingTableCard: {
                  border: `1px solid ${COLORS.hairline}`,
                  boxShadow: "none",
                  padding: "28px",
                  height: "100%",
                },
                pricingTableCardTitle: {
                  fontFamily: FONT_FAMILY.display,
                  fontWeight: 600,
                  fontSize: "20px",
                  color: COLORS.ink,
                },
                pricingTableCardDescription: {
                  fontFamily: FONT_FAMILY.body,
                  color: COLORS.inkMuted,
                },
                pricingTableCardFee: {
                  fontFamily: FONT_FAMILY.mono,
                  fontSize: "34px",
                  color: COLORS.ink,
                },
                pricingTableCardFeaturesListItem: {
                  fontFamily: FONT_FAMILY.body,
                  color: COLORS.ink,
                },
                pricingTableCardFooterButton: {
                  fontFamily: FONT_FAMILY.body,
                  fontWeight: 600,
                  borderRadius: "999px",
                  boxShadow: "none",
                  padding: "14px",
                },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
}
