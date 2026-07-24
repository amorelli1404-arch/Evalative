"use client";

import { useRef } from "react";
import Header from "../components/marketing/Header";
import Hero from "../components/marketing/Hero";
import ValueProps from "../components/marketing/ValueProps";
import FoundingOffer from "../components/marketing/FoundingOffer";
import NearbyMatchFeature from "../components/marketing/NearbyMatchFeature";
import Pricing from "../components/marketing/Pricing";
import InteractiveDemo from "../components/marketing/InteractiveDemo";
import Footer from "../components/marketing/Footer";

export default function HomePage() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToPricing = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ backgroundColor: "#F2F1EC", minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />
      <Hero onGetStarted={scrollToDemo} />
      <ValueProps />
      <NearbyMatchFeature onSeePricing={scrollToPricing} />
      <FoundingOffer onSeePricing={scrollToPricing} />
      <Pricing onFreeSelect={scrollToDemo} />
      <InteractiveDemo ref={demoRef} />
      <Footer />
    </main>
  );
}
