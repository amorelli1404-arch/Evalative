"use client";

import { useRef, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import InstantSampleReportPreview from "./InstantSampleReportPreview";
import Methodology from "./Methodology";
import SampleEvaluations from "./SampleEvaluations";
import Destinations from "./Destinations";
import ValueProps from "./ValueProps";
import NearbyMatchFeature from "./NearbyMatchFeature";
import FoundingOffer from "./FoundingOffer";
import ComparisonMatrix from "./ComparisonMatrix";
import PricingSection from "./PricingSection";
import InteractiveDemo, { type DemoPrefill } from "./InteractiveDemo";
import Footer from "./Footer";

/**
 * components/marketing/HomePageContent.tsx
 *
 * The interactive homepage. It lives here rather than in app/page.tsx so
 * that page can stay a server component and export its own metadata
 * (canonical URL, link-preview tags) and structured data.
 */
export default function HomePageContent() {
  const demoRef = useRef<HTMLDivElement>(null);
  const [demoPrefill, setDemoPrefill] = useState<DemoPrefill | null>(null);

  const scrollToDemo = () => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />
      <Hero
        onGetStarted={(address, scenario) => {
          setDemoPrefill({ address, scenario });
          scrollToDemo();
        }}
      />
      <InstantSampleReportPreview onGetStarted={scrollToDemo} />
      <Methodology />
      <SampleEvaluations onExploreAll={scrollToDemo} />
      <Destinations />
      <ValueProps />
      <NearbyMatchFeature onSeePricing={scrollToPricing} />
      <FoundingOffer onSeePricing={scrollToPricing} />
      <ComparisonMatrix />
      {/* SocialProof is intentionally not rendered: its testimonials, usage
          count and endorsement are placeholders. Add it back once
          components/marketing/SocialProof.tsx holds real ones. */}
      <PricingSection />
      <InteractiveDemo ref={demoRef} prefill={demoPrefill} />
      <Footer />
    </main>
  );
}
