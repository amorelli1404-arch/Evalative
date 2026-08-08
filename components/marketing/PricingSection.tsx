"use client";

import { PricingTable } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

const FREE_FEATURES = [
  "3 full evaluations, one-time",
  "Full verdict card & breakdown",
  "No credit card required",
];

export default function PricingSection({ onFreeSelect }: { onFreeSelect?: () => void }) {
  return (
    <section id="pricing" className="w-full max-w-4xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
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

      {/* Free tier — given room to explain itself, not squeezed into a narrow card */}
      <div
        className="p-8 mb-8 grid md:grid-cols-[1fr_auto] gap-8 items-center"
        style={{ backgroundColor: COLORS.goldSoft, border: `1px solid ${COLORS.hairline}`, borderRadius: "24px" }}
      >
        <div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "white", border: `1px solid ${COLORS.hairline}` }}
          >
            <span style={{ color: COLORS.gold, fontSize: "16px" }}>✓</span>
          </div>
          <span
            className="text-[11px] uppercase tracking-wide px-3 py-1 rounded-full inline-block mb-3"
            style={{ backgroundColor: "white", color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
          >
            No commitment
          </span>
          <h3 style={{ fontFamily: FONT_FAMILY.display, fontSize: "22px", fontWeight: 600, color: COLORS.ink }}>
            Free — 3 evaluations, no card required
          </h3>
          <p
            className="text-sm mt-3 mb-4 max-w-xl"
            style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, lineHeight: 1.7 }}
          >
            This is the same evaluation engine that powers Pro and Max — the same market data, the same verdict
            logic — just capped at three uses instead of unlimited. It's enough to genuinely test-drive the
            decision you're facing, not a watered-down demo. Run out of evaluations and like what you see?
            Upgrade any time and your history carries over.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FREE_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}
              >
                <span style={{ color: COLORS.moss }}>+</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onFreeSelect}
          className="px-8 py-3.5 rounded-full text-sm font-medium whitespace-nowrap"
          style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
        >
          Get started free
        </button>
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
            borderRadius: "24px",
          },
          elements: {
            pricingTableCard: {
              border: `1px solid ${COLORS.hairline}`,
              boxShadow: "none",
              padding: "28px",
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
    </section>
  );
}
