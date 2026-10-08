"use client";

import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PhotoCarousel, { type CarouselSlide } from "../../components/marketing/PhotoCarousel";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

const SLIDES: CarouselSlide[] = [
  // Photo credit: Bailey Anselme (@pbanselme) on Unsplash
  { url: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=1800&q=80", alt: "A family home at golden hour" },
  // Photo credit: SnapSaga (@catauggie) on Unsplash
  { url: "https://images.unsplash.com/photo-1714199523604-f4f01ae8e0ec?auto=format&fit=crop&w=1800&q=80", alt: "A tree-lined residential street" },
];

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <PhotoCarousel slides={SLIDES} minHeight="420px" overlayStrength="medium" priority>
        <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: "#E4E2D8" }}>
            About Evalative
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF" }}>
            We built the second opinion your property decisions were missing
          </h1>
        </div>
      </PhotoCarousel>

      <section className="w-full max-w-3xl px-6 py-16">
        <div className="flex flex-col gap-6" style={{ fontFamily: FONT_FAMILY.body, fontSize: "17px", lineHeight: 1.8, color: COLORS.ink }}>
          <p>
            Every big property decision — renovate or wait, sell or rent it out, buy or keep renting —
            usually gets run past someone who profits from a specific answer. Your agent gets paid if
            you sell. Your lender gets paid if you refinance. Nobody in that conversation is purely
            on your side, and most people make the biggest financial decision of their year on advice
            from someone with a stake in the outcome.
          </p>
          <p>
            We built Evalative because that never sat right with us. So we built something that
            doesn&apos;t sell homes, doesn&apos;t manage mortgages, and doesn&apos;t take a commission
            on anything you decide. We just run the numbers — real public property records, real
            local market data, real renovation costs — and hand you a short, plain-language verdict
            you can actually act on.
          </p>
          <p>
            It&apos;s not a one-time report, either. Markets move. Rates move. Material costs move.
            Your evaluation moves with them, so the answer you're looking at is never more than a
            month stale.
          </p>

          <div className="mt-4 p-6 rounded-sm" style={{ backgroundColor: "white", border: `1px solid ${COLORS.hairline}` }}>
            <h2 className="text-xl mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
              Why we're opening this up now
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.75 }}>
              We're a small team building this in the open, before a wider public launch. That means
              the people who join now get to shape what we build next — and lock in founding member
              pricing that won&apos;t be offered again once we're further along. If you've got a
              property decision in front of you right now, there's genuinely no better time to try it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
