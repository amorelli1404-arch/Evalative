import type { Metadata } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * app/layout.tsx
 *
 * Registers the three type families from the design token system
 * (lib/design-tokens.ts FONT_FAMILY) as CSS custom properties via
 * next/font, which self-hosts the font files at build time (no external
 * request to Google Fonts at runtime, better privacy and performance than
 * a <link> tag). Every component in components/ references these via
 * `FONT_FAMILY.display` / `.body` / `.mono`, which resolve to the CSS
 * variables set up here -- so this file is a hard dependency for those
 * components to render with the correct typography rather than a
 * system-font fallback.
 */

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Property Evaluation Platform",
  description: "Independent, data-driven evaluations of your property decisions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
