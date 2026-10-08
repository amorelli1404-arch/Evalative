"use client";

import { useRef, useState } from "react";
import Header from "../components/marketing/Header";
import Hero from "../components/marketing/Hero";
import InstantSampleReportPreview from "../components/marketing/InstantSampleReportPreview";
import Methodology from "../components/marketing/Methodology";
import SampleEvaluations from "../components/marketing/SampleEvaluations";
import Destinations from "../components/marketing/Destinations";
import ValueProps from "../components/marketing/ValueProps";
import NearbyMatchFeature from "../components/marketing/NearbyMatchFeature";
import FoundingOffer from "../components/marketing/FoundingOffer";
import ComparisonMatrix from "../components/marketing/ComparisonMatrix";
import PricingSection from "../components/marketing/PricingSection";
import InteractiveDemo, { type DemoPrefill } from "../components/marketing/InteractiveDemo";
import Footer from "../components/marketing/Footer";

export default function HomePage() {
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
