"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function Header() {
  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 border-b"
      style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.paper }}
    >
      <span style={{ fontFamily: FONT_FAMILY.display, fontSize: "18px", fontWeight: 600, color: COLORS.ink }}>
        Evalative
      </span>
      <span
        className="text-xs uppercase tracking-wide hidden sm:block"
        style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}
      >
        Independent property evaluations
      </span>
    </header>
  );
}
