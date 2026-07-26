"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import DisclaimerBanner from "../legal/DisclaimerBanner";

export default function Footer() {
  return (
    <footer className="w-full border-t px-6 py-8" style={{ borderColor: COLORS.hairline }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        <span style={{ fontFamily: FONT_FAMILY.display, fontSize: "14px", fontWeight: 600, color: COLORS.ink }}>
          Evalative
        </span>
        <DisclaimerBanner variant="full" />
        <span className="text-xs mt-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
          © {new Date().getFullYear()} Evalative
        </span>
      </div>
    </footer>
  );
}
