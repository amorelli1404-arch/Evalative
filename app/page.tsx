"use client";

import { useRef } from "react";
import Header from "../components/marketing/Header";
import Hero from "../components/marketing/Hero";
import SampleEvaluations from "../components/marketing/SampleEvaluations";
import Destinations from "../components/marketing/Destinations";
import ValueProps from "../components/marketing/ValueProps";
import NearbyMatchFeature from "../components/marketing/NearbyMatchFeature";
import FoundingOffer from "../components/marketing/FoundingOffer";
import Pricing from "../components/marketing/Pricing";
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
      <SampleEvaluations onExploreAll={scrollToDemo} />
      <Destinations />
      <ValueProps />
      <NearbyMatchFeature onSeePricing={scrollToPricing} />
      <FoundingOffer onSeePricing={scrollToPricing} />
      <Pricing onFreeSelect={scrollToDemo} />
      <InteractiveDemo ref={demoRef} />
      <Footer />
    </main>
  );
}
