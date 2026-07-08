import type { Config } from "tailwindcss";
import { COLORS } from "./lib/design-tokens";

/**
 * tailwind.config.ts
 *
 * Extends Tailwind's theme with the exact palette from lib/design-tokens.ts
 * rather than defining colors twice in two places. COLORS is the single
 * source of truth -- if a color changes there, it changes here
 * automatically on next build, and the two can never drift out of sync.
 *
 * This lets components optionally use `bg-paper`, `text-moss`,
 * `border-hairline`, etc. as Tailwind utility classes, though the
 * component files in this codebase currently apply colors via inline
 * `style` props (chosen there because several components pick a color
 * dynamically based on verdict sentiment, which inline style handles more
 * directly than conditional className strings). Both approaches read from
 * the same COLORS constant, so visual consistency is guaranteed either way.
 */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: COLORS.paper,
        ink: COLORS.ink,
        "ink-muted": COLORS.inkMuted,
        hairline: COLORS.hairline,
        moss: COLORS.moss,
        "moss-soft": COLORS.mossSoft,
        ochre: COLORS.ochre,
        "ochre-soft": COLORS.ochreSoft,
        clay: COLORS.clay,
        "clay-soft": COLORS.claySoft,
        slate: COLORS.slate,
        "slate-soft": COLORS.slateSoft,
      },
      fontFamily: {
        display: ["var(--font-source-serif)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-plex-mono)"],
      },
      borderRadius: {
        // The design intentionally avoids large rounded corners (per the
        // "instrument panel / field report" direction, not the soft
        // rounded-card look common in consumer fintech apps) -- capping
        // the scale here means a future contributor reaching for `rounded-xl`
        // gets the same restrained radius as `rounded-sm`, rather than
        // accidentally reintroducing a softer, more generic look.
        DEFAULT: "2px",
        sm: "2px",
        md: "3px",
        lg: "4px",
        xl: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
