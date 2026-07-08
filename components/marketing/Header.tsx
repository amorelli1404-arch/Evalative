"use client";

import Link from "next/link";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function Header() {
  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
      style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.paper }}
    >
      <Link href="/" style={{ fontFamily: FONT_FAMILY.display, fontSize: "18px", fontWeight: 600, color: COLORS.ink }}>
        Evalative
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/#pricing"
          className="text-sm hidden sm:block"
          style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="text-sm hidden sm:block"
          style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}
        >
          About
        </Link>
        <span
          className="text-xs uppercase tracking-wide hidden md:block"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}
        >
          Independent property evaluations
        </span>
      </nav>
    </header>
  );
}
