import type { Metadata } from "next";
import HomePageContent from "../components/marketing/HomePageContent";
import { SITE_NAME, SITE_SOCIAL_DESCRIPTION, SITE_TITLE } from "../lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    url: "/",
  },
};

// Structured data so search engines can describe the product. The offer
// reflects the Free tier; paid plan prices live in Clerk.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Independent data-driven property evaluations for buying, selling, renting, or renovating.",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <HomePageContent />
    </>
  );
}
