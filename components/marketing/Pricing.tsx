"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { startCheckout } from "../../app/checkout-actions";

interface Tier {
  name: string;
  backendTier: "starter" | "homeowner_pro" | null;
  price: string;
  originalPrice?: string;
  cadence: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    backendTier: null,
    price: "$0",
    cadence: "forever",
    description: "Try it out with no commitment.",
    features: ["3 evaluations, one-time", "Full verdict card & breakdown", "No credit card required"],
  },
  {
    name: "Pro",
    backendTier: "starter",
    price: "$5.99",
    originalPrice: "$9.99",
    cadence: "/ month",
    description: "For an active decision you're tracking.",
    features: [
      "Unlimited evaluations, 1 property",
      "Monthly data refresh",
      "Full Decision Journal history",
      "Priority rate & market alerts",
    ],
    highlighted: true,
  },
  {
    name: "Max",
    backendTier: "homeowner_pro",
    price: "$11.99",
    originalPrice: "$19.99",
    cadence: "/ month",
    description: "Everything, plus room to grow.",
    features: [
      "Everything in Pro",
      "Up to 5 properties",
      "Portfolio-level view",
      "Nearby Match — similar properties near you",
      "Quarterly deep-dive report",
      "Early access to new features",
    ],
  },
];

export default function Pricing({ onFreeSelect }: { onFreeSelect?: () => void }) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = async (tier: Tier) => {
    if (tier.backendTier === null) {
      onFreeSelect?.();
      return;
    }

    setError(null);
    setLoadingTier(tier.name);
    try {
      const { checkoutUrl } = await startCheckout(tier.backendTier, "month");
      window.location.href = checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong starting checkout. Please try again.");
      setLoadingTier(null);
    }
  };

  return (
    <section id="pricing" className="w-full max-w-4xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="text-center mb-10">
        <span
          className="text-xs uppercase tracking-wide block mb-2"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}
        >
          Founding member pricing
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "24px", fontWeight: 600, color: COLORS.ink }}>
          Start free. Lock in this rate for as long as you stay.
        </h2>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-6 p-3 rounded-sm border border-red-300 bg-red-50 text-red-800 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className="rounded-sm p-6 flex flex-col"
            style={{
              backgroundColor: "white",
              border: tier.highlighted ? `2px solid ${COLORS.moss}` : `1px solid ${COLORS.hairline}`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              {tier.highlighted && (
                <span
                  className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm self-start"
                  style={{ backgroundColor: COLORS.mossSoft, color: COLORS.moss, fontFamily: FONT_FAMILY.mono }}
                >
                  Most popular
                </span>
              )}
              {tier.originalPrice && (
                <span
                  className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm self-start"
                  style={{ backgroundColor: "#FDE8E8", color: "#B23B3B", fontFamily: FONT_FAMILY.mono }}
                >
                  40% off
                </span>
              )}
            </div>
            <h3 style={{ fontFamily: FONT_FAMILY.display, fontSize: "18px", fontWeight: 600, color: COLORS.ink }}>
              {tier.name}
            </h3>
            <div className="flex items-baseline gap-1 mt-2 mb-1">
              {tier.originalPrice && (
                <span
                  className="line-through"
                  style={{ fontFamily: FONT_FAMILY.mono, fontSize: "15px", color: COLORS.inkMuted }}
                >
                  {tier.originalPrice}
                </span>
              )}
              <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "28px", color: COLORS.ink }}>{tier.price}</span>
              <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "13px", color: COLORS.inkMuted }}>{tier.cadence}</span>
            </div>
            <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              {tier.description}
            </p>
            <ul className="flex flex-col gap-2 mb-6 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                  <span style={{ color: COLORS.moss }}>+</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelect(tier)}
              disabled={loadingTier === tier.name}
              className="w-full py-2 rounded-sm text-sm font-medium"
              style={{
                backgroundColor: tier.highlighted ? COLORS.ink : "white",
                color: tier.highlighted ? COLORS.paper : COLORS.ink,
                border: tier.highlighted ? "none" : `1px solid ${COLORS.hairline}`,
                fontFamily: FONT_FAMILY.body,
                opacity: loadingTier === tier.name ? 0.6 : 1,
              }}
            >
              {loadingTier === tier.name ? "Redirecting to checkout..." : tier.name === "Free" ? "Get started" : `Choose ${tier.name}`}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
