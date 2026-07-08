"use client";

import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import ImagePanel from "../../components/marketing/ImagePanel";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <section className="w-full max-w-3xl px-6 py-16">
        <span
          className="text-xs uppercase tracking-wide block mb-3"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}
        >
          About
        </span>
        <h1
          className="text-3xl mb-6"
          style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}
        >
          We built the second opinion your real estate decisions were missing
        </h1>

        <div className="mb-8">
          <ImagePanel aspectRatio="16 / 7" label="Add a real photo here" />
        </div>

        <div className="flex flex-col gap-5" style={{ fontFamily: FONT_FAMILY.body, fontSize: "16px", lineHeight: 1.75, color: COLORS.ink }}>
          <p>
            Every big property decision — renovate or wait, sell or rent it out, buy or keep renting —
            usually gets run past someone who profits from a specific answer. Your agent gets paid if you
            sell. Your lender gets paid if you refinance. Nobody in that conversation is purely on your side.
          </p>
          <p>
            Evalative doesn&apos;t sell your home, manage your mortgage, or take a commission on anything.
            We just run the numbers — using public property records, local market data, and current
            renovation costs — and give you a short, plain-language answer you can actually act on.
          </p>
          <p>
            It&apos;s not a one-time report either. Your evaluation updates as your local market moves, so
            the answer stays current instead of going stale the month after you get it.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
