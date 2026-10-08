import type { Metadata } from "next";
import { Playfair_Display, Montserrat, IBM_Plex_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { COLORS } from "../lib/design-tokens";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SOCIAL_DESCRIPTION, SITE_TITLE, SITE_URL } from "../lib/site";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-montserrat", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
