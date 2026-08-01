"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

/**
 * components/marketing/SocialProof.tsx
 *
 * Placeholder testimonials, endorsement quote, and activity counter for
 * conversion-copy purposes. Names, outcomes, and the "1,200 verdicts"
 * figure below are illustrative placeholders, not sourced from real
 * customers or usage data -- swap in real reviews, a real named
 * endorsement, and a real live count before this goes to production, to
 * avoid presenting fabricated claims as genuine.
 */

interface Testimonial {
  initials: string;
  name: string;
  location: string;
  quote: string;
  outcome: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "MK",
    name: "M. Kessler",
    location: "Austin, TX",
    quote: "The Decision Journal is what sold me. I could actually see the rate drop coming and time it.",
    outcome: "Saved $14k by renovating instead of selling",
  },
  {
    initials: "RP",
    name: "R. Patel",
    location: "Columbus, OH",
    quote: "Every other tool just gave me a number. This told me what to actually do with it.",
    outcome: "Avoided a $22k over-renovation",
  },
  {
    initials: "SL",
    name: "S. Lindgren",
    location: "Denver, CO",
    quote: "No agent pitch, no lender pop-up — just the math. Exactly what I needed before refinancing.",
    outcome: "Refinanced 4 months earlier than planned",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="flex flex-col items-center text-center mb-10">
        <span
          className="text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-4"
          style={{ backgroundColor: COLORS.mossSoft, color: COLORS.moss, fontFamily: FONT_FAMILY.mono }}
        >
          Over 1,200 property verdicts tracked this month
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "28px", fontWeight: 600, color: COLORS.ink }}>
          People make real decisions with these numbers
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="rounded-sm p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1"
            style={{ border: `1px solid ${COLORS.hairline}`, backgroundColor: "#FFFFFF" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: COLORS.ink, color: "#FFFFFF", fontFamily: FONT_FAMILY.mono, fontSize: "13px" }}
              >
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>{t.name}</div>
                <div className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>{t.location}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <span
              className="text-xs font-medium px-2 py-1 rounded-sm self-start"
              style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ochre, fontFamily: FONT_FAMILY.mono }}
            >
              {t.outcome}
            </span>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center rounded-sm p-8" style={{ backgroundColor: COLORS.ink }}>
        <p
          className="text-lg sm:text-xl leading-relaxed mb-4"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 500, color: "#FFFFFF", fontStyle: "italic" }}
        >
          &ldquo;Independent, automated valuation tools like this fill a real gap — most homeowners never
          get a second opinion that isn&apos;t trying to sell them something.&rdquo;
        </p>
        <span className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: "#D8D6CC" }}>
          — J. Alvarez, CFP&reg;, Independent Financial Planner
        </span>
      </div>
    </section>
  );
}
