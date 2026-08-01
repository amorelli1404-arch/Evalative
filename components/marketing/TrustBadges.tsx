"use client";

import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface Badge {
  label: string;
  icon: JSX.Element;
}

function badgeIcon(path: JSX.Element) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {path}
    </svg>
  );
}

const BADGES: Badge[] = [
  {
    label: "Bank-Grade SSL Encryption",
    icon: badgeIcon(<path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z" />),
  },
  {
    label: "Strict Data Privacy — we never sell your address",
    icon: badgeIcon(
      <>
        <rect x="4" y="10" width="16" height="10" rx="1.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    label: "Cancel anytime with 1 click",
    icon: badgeIcon(<><circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-4" /></>),
  },
];

export default function TrustBadges({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "#D8D6CC" : COLORS.inkMuted;
  const iconColor = variant === "dark" ? COLORS.gold : COLORS.moss;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {BADGES.map((badge) => (
        <div key={badge.label} className="flex items-center gap-2 max-w-[220px]">
          <span style={{ color: iconColor }} className="shrink-0">
            {badge.icon}
          </span>
          <span className="text-xs leading-snug" style={{ fontFamily: FONT_FAMILY.body, color: textColor }}>
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
}
