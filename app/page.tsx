"use client";

/**
 * app/page.tsx
 *
 * The full homepage: Header, Hero (with scroll-to-demo CTA), ValueProps,
 * the working InteractiveDemo section, and Footer. This replaces the
 * earlier bare-demo-only homepage -- the demo itself is unchanged
 * (components/marketing/InteractiveDemo.tsx), just now presented as one
 * section of a proper landing page instead of the entire page.
 */

import { useRef } from "react";
import Header from "../components/marketing/Header";
import Hero from "../components/marketing/Hero";
import ValueProps from "../components/marketing/ValueProps";
import Pricing from "../components/marketing/Pricing";
import InteractiveDemo from "../components/marketing/InteractiveDemo";
import Footer from "../components/marketing/Footer";

export default function HomePage() {
  const demoRef = useRef<HTMLDivElement>(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main style={{ backgroundColor: "#F2F1EC", minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />
      <Hero onGetStarted={scrollToDemo} />
      <ValueProps />
      <Pricing />
      <InteractiveDemo ref={demoRef} />
      <Footer />
    </main>
  );
}
