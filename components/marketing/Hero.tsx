"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

function SignatureGauge() {
  // Echoes the confidence-gauge tick motif from VerdictCard.tsx, scaled up
  // as the page's one memorable visual signature -- a bank of ascending
  // ticks reading as an instrument dial, reinforcing "measured data" over
  // "sales pitch" without introducing a new decorative element.
  const heights = [10, 16, 22, 28, 34, 40, 46];
  return (
    <div className="flex items-end gap-[6px]" aria-hidden="true">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: "6px",
            height: `${h}px`,
            borderRadius: "1px",
            backgroundColor: i < 5 ? COLORS.moss : COLORS.hairline,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="w-full flex flex-col items-center text-center px-6 pt-16 pb-14">
      <SignatureGauge />
      <h1
        className="mt-8 max-w-2xl text-3xl sm:text-4xl leading-tight"
        style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}
      >
        An independent read on your property&apos;s next move
      </h1>
      <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        Short, data-driven verdicts on renovating, selling, renting, or buying — tracked monthly,
        with no agent, lender, or commission behind the numbers.
      </p>
      <button
        onClick={onGetStarted}
        className="mt-8 px-6 py-3 rounded-sm text-sm font-medium"
        style={{ backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: FONT_FAMILY.body }}
      >
        Run a free evaluation
      </button>
      <span className="mt-3 text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
        No account needed to try it
      </span>
    </section>
  );
}
