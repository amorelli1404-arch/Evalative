"use client";

import Link from "next/link";
import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PhotoCarousel, { type CarouselSlide } from "../../components/marketing/PhotoCarousel";
import PricingSection from "../../components/marketing/PricingSection";
import TrustBadges from "../../components/marketing/TrustBadges";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

/**
 * app/pricing/page.tsx
 *
 * Dedicated pricing page, separate from the embedded Pricing section on
 * the homepage. Both exist deliberately: the homepage section captures
 * on-page conversion for visitors already reading through the landing
 * page, while this page gives pricing its own shareable URL and room for
 * the mission narrative that doesn't belong crammed into the homepage.
 */

const SLIDES: CarouselSlide[] = [
  // Photo credit: John Fornander (@johnfo) on Unsplash
  { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80", alt: "A modern home with a swimming pool" },
  // Photo credit: Michael Brown (@vettexan) on Unsplash
  { url: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80", alt: "A modern home at dusk" },
];

const PRINCIPLES: { title: string; body: string }[] = [
  {
    title: "Advice for everyone",
    body:
      "Good property advice has historically been reserved for people who could afford a financial advisor, or who happened to know someone in real estate willing to give it to them straight. Everyone else was left comparing contractor quotes on their own or trusting whichever agent picked up the phone first. We think that's backwards — the people making a single, high-stakes property decision are exactly the people who need this most, and they're the ones least likely to have a professional in their corner already.",
  },
  {
    title: "Priced to be kept",
    body:
      "That's the whole reason the Free tier exists with three real evaluations, not a watered-down demo. And it's why founding member pricing is locked in for as long as you stay subscribed — we'd rather build something people keep paying for because it's genuinely useful, month after month, than price it high and hope no one notices.",
  },
  {
    title: "Built to stay with you",
    body:
      "Persistence matters here too. A single evaluation is a snapshot; a decision like this deserves something that stays with you as the market shifts underneath it — checked in on monthly, not filed away and forgotten the week you got it.",
  },
];

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <PhotoCarousel slides={SLIDES} minHeight="280px" overlayStrength="medium">
        <div className="max-w-xl mx-auto px-6 pt-24 pb-14 flex flex-col items-center text-center">
          <span className="text-[11px] uppercase mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: "#E4E2D8", letterSpacing: "0.14em" }}>
            Pricing
          </span>
          <h1 className="text-2xl sm:text-3xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF", lineHeight: 1.3 }}>
            Priced so the answer is worth more than what you paid for it
          </h1>
          <span className="block mt-5" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
        </div>
      </PhotoCarousel>

      <PricingSection />

      {/* Reassurance strip */}
      <div className="w-full max-w-4xl px-6 pb-12 flex flex-col items-center gap-5">
        <TrustBadges />
        <p className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          Questions about the plans?{" "}
          <Link
            href="/faq"
            className="underline underline-offset-4 transition-colors duration-150"
            style={{ color: COLORS.ink, textDecorationColor: COLORS.gold }}
          >
            Read the FAQ
          </Link>
        </p>
      </div>

      {/* Mission section */}
      <section className="w-full max-w-4xl px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
        <div className="flex flex-col items-center text-center mb-10">
          <span
            className="text-[11px] uppercase block mb-3"
            style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted, letterSpacing: "0.14em" }}
          >
            Our thinking
          </span>
          <h2 className="text-xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            Why we priced it this way
          </h2>
          <span className="block mt-4" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-9">
          {PRINCIPLES.map((principle, i) => (
            <div key={principle.title} className="pt-5 border-t" style={{ borderColor: COLORS.hairline }}>
              <span className="text-[11px] block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold, letterSpacing: "0.14em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                {principle.title}
              </h3>
              <p style={{ fontFamily: FONT_FAMILY.body, fontSize: "13px", lineHeight: 1.75, color: COLORS.inkMuted }}>
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
