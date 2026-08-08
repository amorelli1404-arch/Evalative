"use client";

import { useRef } from "react";
import { PricingTable } from "@clerk/nextjs";
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
import SocialProof from "../components/marketing/SocialProof";
import InteractiveDemo from "../components/marketing/InteractiveDemo";
import Footer from "../components/marketing/Footer";

export default function HomePage() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />
      <Hero onGetStarted={() => scrollToDemo()} />
      <InstantSampleReportPreview onGetStarted={scrollToDemo} />
      <Methodology />
      <SampleEvaluations onExploreAll={scrollToDemo} />
      <Destinations />
      <ValueProps />
      <NearbyMatchFeature onSeePricing={scrollToPricing} />
      <FoundingOffer onSeePricing={scrollToPricing} />
      <ComparisonMatrix />
      <SocialProof />
      <section id="pricing" className="w-full max-w-4xl mx-auto px-6 py-14">
        <PricingTable highlightedPlan="pro" />
      </section>
      <InteractiveDemo ref={demoRef} />
      <Footer />
    </main>
  );
}
