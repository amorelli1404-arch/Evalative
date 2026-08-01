"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface Row {
  feature: string;
  free: string;
  evalative: string;
}

const ROWS: Row[] = [
  { feature: "Business Model", free: "Lead-gen — paid by agents & lenders", evalative: "Unbiased — paid only by your subscription" },
  { feature: "Valuation Frequency", free: "Static estimate, rarely refreshed", evalative: "Continuous, dynamic monthly updates" },
  { feature: "Actionable Recommendation", free: "“What is it worth?”", evalative: "“Should I renovate, rent, or sell?”" },
  { feature: "Decision Tracking", free: "None — one-time number", evalative: "Historical Decision Journal, tracked over time" },
  { feature: "Local Market Match", free: "General listings only", evalative: "Nearby Match budget & comp analysis" },
];

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.clay} strokeWidth="2" className="shrink-0">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.moss} strokeWidth="2" className="shrink-0">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function ComparisonMatrix() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <span
          className="text-xs uppercase tracking-wide block mb-2"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted, letterSpacing: "0.1em" }}
        >
          Why pay for this
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "28px", fontWeight: 600, color: COLORS.ink }}>
          Free real estate sites vs. Evalative
        </h2>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[640px] border-collapse" style={{ borderSpacing: 0 }}>
          <thead>
            <tr>
              <th className="text-left align-bottom pb-3 pr-4 w-1/3" />
              <th className="text-left align-bottom pb-3 px-4">
                <span className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
                  Free sites (Zillow, Redfin)
                </span>
              </th>
              <th className="text-left align-bottom pb-3 pl-4">
                <span
                  className="text-xs uppercase tracking-wide px-2 py-1 rounded-sm inline-block"
                  style={{ fontFamily: FONT_FAMILY.mono, backgroundColor: COLORS.ink, color: COLORS.goldSoft }}
                >
                  Evalative Pro / Max
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.feature} style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
                <td className="py-4 pr-4 align-top">
                  <span className="text-sm font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                    {row.feature}
                  </span>
                </td>
                <td className="py-4 px-4 align-top" style={{ backgroundColor: i % 2 === 0 ? "transparent" : "#FAFAF8" }}>
                  <div className="flex items-start gap-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                    <XIcon />
                    {row.free}
                  </div>
                </td>
                <td className="py-4 pl-4 align-top" style={{ backgroundColor: COLORS.mossSoft }}>
                  <div className="flex items-start gap-2 text-sm font-medium" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                    <CheckIcon />
                    {row.evalative}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
