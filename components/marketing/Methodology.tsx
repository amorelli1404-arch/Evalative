"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface DataSource {
  label: string;
  icon: JSX.Element;
}

const ICON_PROPS = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: COLORS.moss, strokeWidth: 1.5 } as const;

const DATA_SOURCES: DataSource[] = [
  {
    label: "Direct MLS Feeds",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9h14v-9" />
        <path d="M10 19v-5h4v5" />
      </svg>
    ),
  },
  {
    label: "Tax Assessor & Deed Records",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M7 3h8l4 4v14H7z" />
        <path d="M15 3v4h4" />
        <path d="M9.5 12h6M9.5 15.5h6M9.5 8.5h3" />
      </svg>
    ),
  },
  {
    label: "Local Permit Data",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="m14.5 4.5 5 5L8 21l-5.5 1.5L4 17z" />
        <path d="m12.5 6.5 5 5" />
      </svg>
    ),
  },
  {
    label: "Current Mortgage Rate Feeds",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
];

export default function Methodology() {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <span
          className="text-xs uppercase tracking-wide block mb-2"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted, letterSpacing: "0.1em" }}
        >
          Methodology
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "28px", fontWeight: 600, color: COLORS.ink }}>
          Where the numbers actually come from
        </h2>
        <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Every verdict is built from primary records, not a single scraped listing price. Here&apos;s what
          feeds it and how we score our own confidence in it.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {DATA_SOURCES.map((source) => (
          <div
            key={source.label}
            className="flex flex-col items-center text-center gap-3 rounded-sm p-5 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.mossSoft, border: `1px solid ${COLORS.hairline}` }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              {source.icon}
            </div>
            <span className="text-xs leading-snug" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink, fontWeight: 500 }}>
              {source.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-sm p-6" style={{ border: `1px solid ${COLORS.hairline}`, backgroundColor: "#FFFFFF" }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke={COLORS.hairline} strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke={COLORS.moss}
                  strokeWidth="3"
                  strokeDasharray="97.4"
                  strokeDashoffset={97.4 * (1 - 0.84)}
                  strokeLinecap="round"
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ fontFamily: FONT_FAMILY.mono, fontSize: "13px", color: COLORS.ink }}
              >
                84%
              </span>
            </div>
            <div>
              <h3 style={{ fontFamily: FONT_FAMILY.display, fontSize: "17px", fontWeight: 600, color: COLORS.ink }}>
                Confidence Score Engine
              </h3>
              <p className="text-xs mt-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                Sample score shown above
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
            Every property gets a confidence score and margin of error, not just a single number. It&apos;s
            calculated from comparable-sale density nearby, how recently records were updated, and how much
            our scenario models agree with each other for that address.
          </p>
        </div>

        <div className="rounded-sm p-6" style={{ border: `1px solid ${COLORS.hairline}`, backgroundColor: COLORS.ink }}>
          <span
            className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm inline-block mb-4"
            style={{ backgroundColor: "rgba(245,244,239,0.12)", color: COLORS.goldSoft, fontFamily: FONT_FAMILY.mono }}
          >
            No commission. No lead-gen.
          </span>
          <h3 className="mb-3" style={{ fontFamily: FONT_FAMILY.display, fontSize: "17px", fontWeight: 600, color: "#FFFFFF" }}>
            Standard real estate sites make money when you act. We don&apos;t.
          </h3>
          <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: "#D8D6CC" }}>
            No agent referrals, no lender kickbacks, no selling your contact info the moment you look up
            an address. Our only revenue is your subscription, which is the only incentive we want
            shaping the verdict.
          </p>
        </div>
      </div>
    </section>
  );
}
