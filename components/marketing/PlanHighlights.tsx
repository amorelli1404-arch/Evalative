"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

/**
 * components/marketing/PlanHighlights.tsx
 *
 * Spells out what the two paid plans unlock, underneath the Clerk plan
 * cards on the pricing page. Feature copy mirrors what the FAQ and the
 * Pro/Max dashboards already describe -- prices are deliberately not
 * repeated here, they live in Clerk and are shown by the PricingTable.
 */

interface Feature {
  title: string;
  body: string;
}

const PRO_FEATURES: Feature[] = [
  {
    title: "Unlimited evaluations",
    body: "Run as many scenarios as you like on one property — renovate, sell, rent, or buy.",
  },
  {
    title: "Monthly refreshes",
    body: "Updated comparable sales, tax records, and mortgage rates, so the verdict moves with the market.",
  },
  {
    title: "Full Decision Journal",
    body: "Every verdict logged month by month, so you can see whether it still holds before you act.",
  },
  {
    title: "Financial & ROI modeling",
    body: "Return by project type, plus a financing calculator for your real monthly cost.",
  },
  {
    title: "Market analysis & What-If builder",
    body: "Choose which comps count, then test rate changes, holding periods, and vacancy.",
  },
  {
    title: "Neighborhood analytics & report export",
    body: "Local drivers and market momentum, with a formal report to share with co-buyers or lenders.",
  },
];

const MAX_FEATURES: Feature[] = [
  {
    title: "Up to five properties",
    body: "A portfolio-level view to compare decisions across all of them side by side.",
  },
  {
    title: "Dynamic Renovation ROI Engine",
    body: "Recoup rates adjusted for current material and labor cost movement, not a static average.",
  },
  {
    title: "Automated Capital Decision Engine",
    body: "Confidence-scored rent-vs-buy and sell-vs-rent recommendations from one set of assumptions.",
  },
  {
    title: "Rate sensitivity tracking",
    body: "How much your specific market moves for every 1% change in mortgage rates.",
  },
  {
    title: "Nearby Match",
    body: "Homes and apartments near you that fit your budget and criteria.",
  },
  {
    title: "Quarterly deep-dive report & early access",
    body: "A fuller written report each quarter, and new features before anyone else.",
  },
];

const WARM_TEXT = "#F5F4EF";
const WARM_TEXT_MUTED = "#D8D6CC";

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="shrink-0 mt-[3px]">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function FeatureList({
  features,
  titleColor,
  bodyColor,
  checkColor,
  ruleColor,
}: {
  features: Feature[];
  titleColor: string;
  bodyColor: string;
  checkColor: string;
  ruleColor: string;
}) {
  return (
    <ul className="flex flex-col">
      {features.map((feature, i) => (
        <li
          key={feature.title}
          className="flex items-start gap-3 py-3"
          style={{ borderTop: i === 0 ? "none" : `1px solid ${ruleColor}` }}
        >
          <CheckIcon color={checkColor} />
          <div>
            <div className="text-[13px] font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: titleColor }}>
              {feature.title}
            </div>
            <div className="text-[12px] mt-0.5" style={{ fontFamily: FONT_FAMILY.body, color: bodyColor, lineHeight: 1.6 }}>
              {feature.body}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function PlanHighlights() {
  const scrollToPlans = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 pt-4 pb-14">
      <div className="flex flex-col items-center text-center mb-9">
        <span
          className="text-[11px] uppercase block mb-3"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ochre, letterSpacing: "0.14em" }}
        >
          What you unlock
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "24px", fontWeight: 600, color: COLORS.ink, lineHeight: 1.25 }}>
          The paid plans, in detail
        </h2>
        <span className="block mt-4" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
        <p className="text-[13px] mt-4 max-w-md leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Free gives you three full evaluations. Pro and Max turn a one-time answer into something that
          keeps working for you as the market moves.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* Pro */}
        <div
          className="rounded-sm p-6 sm:p-7 flex flex-col"
          style={{
            border: `1px solid ${COLORS.hairline}`,
            background: `linear-gradient(180deg, #FAF8F2 0%, ${COLORS.paper} 38%)`,
          }}
        >
          <span
            className="text-[10px] uppercase block mb-2"
            style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ochre, letterSpacing: "0.16em" }}
          >
            Pro
          </span>
          <h3 className="mb-2" style={{ fontFamily: FONT_FAMILY.display, fontSize: "20px", fontWeight: 600, color: COLORS.ink, lineHeight: 1.3 }}>
            Everything you need for one property
          </h3>
          <p className="text-[12.5px] mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, lineHeight: 1.65 }}>
            The full deep-dive dashboard, refreshed every month.
          </p>

          <div className="flex-1">
            <FeatureList
              features={PRO_FEATURES}
              titleColor={COLORS.ink}
              bodyColor={COLORS.inkMuted}
              checkColor={COLORS.ochre}
              ruleColor={COLORS.hairline}
            />
          </div>

          <button
            onClick={scrollToPlans}
            className="mt-6 w-full py-2.5 rounded-sm border text-[11px] font-semibold uppercase transition-colors duration-200 hover:bg-black/5"
            style={{ fontFamily: FONT_FAMILY.body, letterSpacing: "0.1em", color: COLORS.ink, borderColor: COLORS.ink }}
          >
            Choose Pro
          </button>
          <p className="text-[11px] mt-3 text-center" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            New Pro subscriptions include a 14-day full refund.
          </p>
        </div>

        {/* Max */}
        <div
          className="relative rounded-sm p-6 sm:p-7 flex flex-col overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.55)",
            background: [
              "radial-gradient(70% 45% at 100% 0%, rgba(212,175,55,0.20) 0%, rgba(212,175,55,0) 70%)",
              "linear-gradient(160deg, #242424 0%, #111111 100%)",
            ].join(", "),
            boxShadow: "0 18px 44px rgba(26,26,26,0.18)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-[10px] uppercase"
              style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold, letterSpacing: "0.16em" }}
            >
              Max
            </span>
            <span
              className="text-[9.5px] uppercase px-2 py-1 rounded-sm"
              style={{
                fontFamily: FONT_FAMILY.mono,
                letterSpacing: "0.12em",
                color: COLORS.goldSoft,
                backgroundColor: "rgba(245,244,239,0.10)",
                border: "1px solid rgba(212,175,55,0.35)",
              }}
            >
              Most complete
            </span>
          </div>
          <h3 className="mb-2" style={{ fontFamily: FONT_FAMILY.display, fontSize: "20px", fontWeight: 600, color: WARM_TEXT, lineHeight: 1.3 }}>
            Every engine, across your whole portfolio
          </h3>
          <p className="text-[12.5px] mb-4" style={{ fontFamily: FONT_FAMILY.body, color: WARM_TEXT_MUTED, lineHeight: 1.65 }}>
            Everything in Pro, plus three exclusive engines and more properties.
          </p>

          <div className="flex-1">
            <FeatureList
              features={MAX_FEATURES}
              titleColor={WARM_TEXT}
              bodyColor={WARM_TEXT_MUTED}
              checkColor={COLORS.gold}
              ruleColor="rgba(245,244,239,0.12)"
            />
          </div>

          <button
            onClick={scrollToPlans}
            className="mt-6 w-full py-2.5 rounded-sm text-[11px] font-semibold uppercase transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: FONT_FAMILY.body,
              letterSpacing: "0.1em",
              color: COLORS.ink,
              background: `linear-gradient(135deg, #E7C463 0%, ${COLORS.gold} 100%)`,
              boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
            }}
          >
            Choose Max
          </button>
          <p className="text-[11px] mt-3 text-center" style={{ fontFamily: FONT_FAMILY.body, color: WARM_TEXT_MUTED }}>
            Founding member pricing stays locked in while you&apos;re subscribed.
          </p>
        </div>
      </div>
    </section>
  );
}
