import type { Metadata } from "next";
import { Playfair_Display, Montserrat, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { COLORS } from "../lib/design-tokens";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-montserrat", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

const SITE_TITLE = "Evalative — Independent Property Evaluations";
const SITE_DESCRIPTION = "Independent, data-driven evaluations of your property decisions.";

export const metadata: Metadata = {
  title: { default: SITE_TITLE, template: "%s — Evalative" },
  description: SITE_DESCRIPTION,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Evalative",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${montserrat.variable} ${plexMono.variable}`}>
      <body className="font-body">
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: COLORS.ink,
              colorText: COLORS.ink,
              borderRadius: "2px",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
