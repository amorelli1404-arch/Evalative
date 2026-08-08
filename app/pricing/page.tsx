"use client";

import { PricingTable } from "@clerk/nextjs";
import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PhotoCarousel, { type CarouselSlide } from "../../components/marketing/PhotoCarousel";
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

export default function PricingPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <PhotoCarousel slides={SLIDES} minHeight="380px" overlayStrength="medium">
        <div className="max-w-2xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: "#E4E2D8" }}>
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF" }}>
            Priced so the answer is worth more than what you paid for it
          </h1>
        </div>
      </PhotoCarousel>

      <section id="pricing" className="w-full max-w-4xl mx-auto px-6 py-14 border-t" style={{ borderColor: COLORS.hairline }}>
        <PricingTable />
      </section>

      {/* Mission section */}
      <section className="w-full max-w-3xl px-6 py-16 border-t" style={{ borderColor: COLORS.hairline }}>
        <h2
          className="text-2xl mb-6 text-center"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}
        >
          Why we priced it this way
        </h2>
        <div className="flex flex-col gap-6" style={{ fontFamily: FONT_FAMILY.body, fontSize: "16px", lineHeight: 1.8, color: COLORS.ink }}>
          <p>
            Good property advice has historically been reserved for people who could afford a financial
            advisor, or who happened to know someone in real estate willing to give it to them straight.
            Everyone else was left comparing contractor quotes on their own or trusting whichever agent
            picked up the phone first. We think that's backwards — the people making a single, high-stakes
            property decision are exactly the people who need this most, and they're the ones least likely
            to have a professional in their corner already.
          </p>
          <p>
            That's the whole reason the Free tier exists with three real evaluations, not a watered-down
            demo. And it's why founding member pricing is locked in for as long as you stay subscribed —
            we'd rather build something people keep paying for because it's genuinely useful, month after
            month, than price it high and hope no one notices.
          </p>
          <p>
            Persistence matters here too. A single evaluation is a snapshot; a decision like this deserves
            something that stays with you as the market shifts underneath it — checked in on monthly, not
            filed away and forgotten the week you got it.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
