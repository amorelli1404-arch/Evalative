"use client";

import { COLORS } from "../../lib/design-tokens";

/**
 * components/marketing/ImagePanel.tsx
 *
 * A styled placeholder standing in for real photography. Deliberately NOT
 * a hotlinked image from a web search -- those belong to whoever
 * photographed them, and embedding them in a commercial product without a
 * license is a real legal risk. This renders a duotone moss-tinted panel
 * with a subtle grid, which reads as an intentional design choice rather
 * than a broken <img>, until real photos are dropped in.
 *
 * TO ADD A REAL PHOTO:
 *   1. Get a properly licensed photo (Unsplash License, a paid stock site,
 *      or your own photography). Unsplash (unsplash.com) is free for
 *      commercial use and a good starting point.
 *   2. Save it into /public/images/ in this project, e.g. public/images/hero-home.jpg
 *   3. Replace the <div> below with:
 *        <img src="/images/hero-home.jpg" alt="..." className="w-full h-full object-cover" />
 *      (Next.js's <Image> component from 'next/image' is an even better
 *      choice for automatic optimization -- swap to that if you want.)
 */

interface ImagePanelProps {
  aspectRatio?: string; // e.g. "4 / 3", "16 / 9"
  label?: string; // small caption shown in the corner, optional
}

export default function ImagePanel({ aspectRatio = "4 / 3", label }: ImagePanelProps) {
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden border"
      style={{ aspectRatio, borderColor: COLORS.hairline }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${COLORS.mossSoft} 0%, ${COLORS.paper} 100%)`,
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={COLORS.ink} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {label && (
        <span
          className="absolute bottom-3 right-3 text-[11px] uppercase tracking-wide px-2 py-1 rounded-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: COLORS.inkMuted }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
