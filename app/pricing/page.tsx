"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import PhotoCarousel, { type CarouselSlide } from "../../components/marketing/PhotoCarousel";
import PricingSection from "../../components/marketing/PricingSection";
import PlanHighlights from "../../components/marketing/PlanHighlights";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

/**
 * app/pricing/page.tsx
 *
 * Dedicated pricing page, separate from the embedded Pricing section on
 * the homepage. Both exist deliberately: the homepage section captures
 * on-page conversion for visitors already reading through the landing
 * page, while this page gives pricing its own shareable URL and room for
 * the plan comparison, mission narrative and billing questions that don't
 * belong crammed into the homepage.
 */

const SLIDES: CarouselSlide[] = [
  // Photo credit: John Fornander (@johnfo) on Unsplash
  { url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=80", alt: "A modern home with a swimming pool" },
  // Photo credit: Michael Brown (@vettexan) on Unsplash
  { url: "https://images.unsplash.com/photo-1757359056339-22968344cce6?auto=format&fit=crop&w=1800&q=80", alt: "A modern home at dusk" },
];

const WARM_WASH = "#FAF8F2";
const WARM_TEXT = "#F5F4EF";
const WARM_TEXT_MUTED = "#D8D6CC";

const REASSURANCES = ["No credit card to start", "Cancel in one click", "14-day refund on Pro"];

// true renders a check, false a dash, a string is shown as-is. Prices are
// deliberately absent: they live in Clerk and are shown by the PricingTable.
type CompareValue = boolean | string;

const COMPARE_ROWS: { feature: string; free: CompareValue; pro: CompareValue; max: CompareValue }[] = [
  { feature: "Evaluations", free: "3 total", pro: "Unlimited", max: "Unlimited" },
  { feature: "Properties tracked", free: false, pro: "1", max: "Up to 5" },
  { feature: "Monthly refreshes", free: false, pro: true, max: true },
  { feature: "Full Decision Journal history", free: false, pro: true, max: true },
  { feature: "Deep-dive dashboard", free: false, pro: true, max: true },
  { feature: "Formal report export", free: false, pro: true, max: true },
  { feature: "Renovation, capital decision & rate sensitivity engines", free: false, pro: false, max: true },
  { feature: "Nearby Match", free: false, pro: false, max: true },
  { feature: "Quarterly deep-dive report", free: false, pro: false, max: true },
  { feature: "Early access to new features", free: false, pro: false, max: true },
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

// The billing questions from the FAQ page, kept short here.
const BILLING_FAQ: { question: string; answer: string }[] = [
  {
    question: "Do I need a credit card to start?",
    answer: "No. Free gives you three full evaluations with no credit card required.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes — cancellation is one click from your account settings, with no phone call or retention flow required. You'll keep access through the end of your current billing period.",
  },
  {
    question: "Is there a refund if I don't like it?",
    answer: "Pro subscriptions are covered by a 14-day full refund policy, so you can test it against your actual property risk-free.",
  },
  {
    question: "Can I track multiple homes?",
    answer: "Pro covers one property. Max covers up to five, with a portfolio-level view so you can compare decisions across all of them side by side.",
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center mb-10">
      <span className="text-[11px] uppercase block mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ochre, letterSpacing: "0.14em" }}>
        {eyebrow}
      </span>
      <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "24px", fontWeight: 600, color: COLORS.ink, lineHeight: 1.25 }}>
        {title}
      </h2>
      <span className="block mt-4" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
    </div>
  );
}

function CompareCell({ value, checkColor }: { value: CompareValue; checkColor: string }) {
  if (typeof value === "string") {
    return (
      <span className="text-[13px] font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={checkColor} strokeWidth="2" className="inline-block" role="img" aria-label="Included">
        <path d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  return (
    <span role="img" aria-label="Not included" style={{ fontFamily: FONT_FAMILY.mono, color: "#B5B1A6" }}>
      –
    </span>
  );
}

function FaqRow({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.hairline}` }}>
      <button onClick={onToggle} aria-expanded={isOpen} className="w-full flex items-center justify-between gap-4 py-4 text-left">
        <span style={{ fontFamily: FONT_FAMILY.display, fontSize: "16px", fontWeight: 600, color: COLORS.ink }}>{question}</span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200"
          style={{ color: COLORS.ochre, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: isOpen ? "240px" : "0px", opacity: isOpen ? 1 : 0 }}>
        <p className="pb-4 pr-8" style={{ fontFamily: FONT_FAMILY.body, fontSize: "13px", lineHeight: 1.75, color: COLORS.inkMuted }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const scrollToPlans = () => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <PhotoCarousel slides={SLIDES} minHeight="400px" overlayStrength="medium" priority>
        <div className="max-w-2xl mx-auto px-6 pt-28 pb-10 flex flex-col items-center text-center">
          <span className="text-[11px] uppercase mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: "#E4E2D8", letterSpacing: "0.14em" }}>
            Pricing
          </span>
          <h1 className="text-3xl sm:text-4xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: WARM_TEXT, lineHeight: 1.25 }}>
            Priced so the answer is worth more than what you paid for it
          </h1>
          <span className="block mt-5" style={{ width: "32px", height: "1px", backgroundColor: COLORS.gold }} />
          <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: "#E4E2D8" }}>
            Start free with three full evaluations. Upgrade only when you want it to keep watching the market for you.
          </p>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {REASSURANCES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px]"
                style={{
                  fontFamily: FONT_FAMILY.body,
                  color: WARM_TEXT,
                  backgroundColor: "rgba(245,244,239,0.12)",
                  border: "1px solid rgba(245,244,239,0.22)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={COLORS.gold} strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PhotoCarousel>

      <PricingSection />

      {/* Plan comparison */}
      <section className="w-full max-w-4xl px-6 pt-14 pb-10">
        <SectionHeading eyebrow="At a glance" title="Compare the plans" />

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">What the Free, Pro and Max plans include</caption>
            <thead>
              <tr>
                <th scope="col" className="text-left pb-3 pr-4 w-[46%]">
                  <span className="sr-only">Feature</span>
                </th>
                {["Free", "Pro"].map((plan) => (
                  <th key={plan} scope="col" className="pb-3 px-3 text-center font-normal">
                    <span className="text-[11px] uppercase" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted, letterSpacing: "0.14em" }}>
                      {plan}
                    </span>
                  </th>
                ))}
                <th
                  scope="col"
                  className="py-3 px-3 text-center font-normal rounded-t-sm"
                  style={{ backgroundColor: COLORS.ink }}
                >
                  <span className="text-[11px] uppercase" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold, letterSpacing: "0.14em" }}>
                    Max
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature} style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
                  <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                    <span className="text-[13px]" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                      {row.feature}
                    </span>
                  </th>
                  <td className="py-3.5 px-3 text-center">
                    <CompareCell value={row.free} checkColor={COLORS.moss} />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <CompareCell value={row.pro} checkColor={COLORS.moss} />
                  </td>
                  <td className="py-3.5 px-3 text-center" style={{ backgroundColor: COLORS.goldSoft }}>
                    <CompareCell value={row.max} checkColor={COLORS.ochre} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PlanHighlights />

      {/* Mission section */}
      <section
        className="w-full border-t border-b"
        style={{ borderColor: COLORS.hairline, background: `linear-gradient(180deg, ${WARM_WASH} 0%, ${COLORS.paper} 100%)` }}
      >
        <div className="w-full max-w-5xl mx-auto px-6 py-16">
          <SectionHeading eyebrow="Our thinking" title="Why we priced it this way" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRINCIPLES.map((principle, i) => (
              <div
                key={principle.title}
                className="rounded-sm p-6 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: COLORS.paper, border: `1px solid ${COLORS.hairline}`, boxShadow: "0 1px 2px rgba(26,26,26,0.03)" }}
              >
                <span className="block mb-3" style={{ fontFamily: FONT_FAMILY.display, fontSize: "28px", fontWeight: 600, color: COLORS.gold, lineHeight: 1 }}>
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
        </div>
      </section>

      {/* Billing questions */}
      <section className="w-full max-w-2xl px-6 py-16">
        <SectionHeading eyebrow="Before you choose" title="Billing questions, answered" />

        <div style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
          {BILLING_FAQ.map((item, i) => (
            <FaqRow
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>

        <p className="text-xs mt-6 text-center" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          More questions about the plans?{" "}
          <Link
            href="/faq"
            className="underline underline-offset-4 transition-colors duration-150"
            style={{ color: COLORS.ink, textDecorationColor: COLORS.gold }}
          >
            Read the full FAQ
          </Link>
        </p>
      </section>

      {/* Closing call to action */}
      <section
        className="w-full"
        style={{
          background: [
            "radial-gradient(50% 80% at 50% 0%, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)",
            "linear-gradient(160deg, #242424 0%, #111111 100%)",
          ].join(", "),
        }}
      >
        <div className="max-w-xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: WARM_TEXT, lineHeight: 1.3 }}>
            Start with three free evaluations
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: WARM_TEXT_MUTED }}>
            No credit card required. If a paid plan earns its place, founding member pricing stays locked in for as long as you stay subscribed.
          </p>
          <button
            onClick={scrollToPlans}
            className="mt-7 px-8 py-3 rounded-sm text-[11px] font-semibold uppercase transition-all duration-200 hover:-translate-y-0.5"
            style={{
              fontFamily: FONT_FAMILY.body,
              letterSpacing: "0.1em",
              color: COLORS.ink,
              background: `linear-gradient(135deg, #E7C463 0%, ${COLORS.gold} 100%)`,
              boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
            }}
          >
            Choose your plan
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
