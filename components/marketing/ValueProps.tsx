"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

const ITEMS = [
  {
    title: "No one's getting a commission",
    body: "Agents get paid when you sell. Lenders get paid when you refinance. We don't — so the verdict isn't shaped by what happens next.",
  },
  {
    title: "Tracked monthly, not once",
    body: "Your evaluation refreshes as local prices, rates, and material costs move — not a one-time number that goes stale in a month.",
  },
  {
    title: "One verdict, not a spreadsheet",
    body: "A single answer, the number behind it, and one next step. The full data is there if you want it — never forced on you.",
  },
];

export default function ValueProps() {
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="grid sm:grid-cols-3 gap-8">
        {ITEMS.map((item) => (
          <div key={item.title}>
            <h3 className="text-base mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
