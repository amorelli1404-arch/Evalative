import type { Config } from "tailwindcss";
import { COLORS } from "./lib/design-tokens";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
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
        display: ["var(--font-playfair)"],
        body: ["var(--font-montserrat)"],
        mono: ["var(--font-plex-mono)"],
      },
      borderRadius: {
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
