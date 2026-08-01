"use client";

import { useState } from "react";
import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How is this different from an official appraisal?",
    answer:
      "It isn't one, and we don't pretend it is. This is an automated estimate built from public records and market data, not a licensed appraiser's on-site inspection. It's meant to help you decide whether a decision is worth pursuing — not to satisfy a lender's or court's appraisal requirement.",
  },
  {
    question: "How often does my property refresh?",
    answer:
      "Pro and Max evaluations refresh monthly, pulling updated comparable sales, tax records, and current mortgage rates so your verdict reflects the market as it moves, not the day you signed up.",
  },
  {
    question: "Can I track multiple homes?",
    answer:
      "Pro covers one property. Max covers up to five, with a portfolio-level view so you can compare decisions across all of them side by side.",
  },
  {
    question: "Where does your data come from?",
    answer:
      "Direct MLS feeds, tax assessor and deed records, local permit data, and current mortgage rate feeds. We combine primary public records rather than relying on a single scraped listing price.",
  },
  {
    question: "Do you sell my address or contact info to agents or lenders?",
    answer:
      "No. We don't take referral fees, we don't sell leads, and we're not a brokerage or lender. Our only source of revenue is subscriptions, which is exactly why the verdict isn't shaped by what happens next.",
  },
  {
    question: "What's included in Free vs. Pro vs. Max?",
    answer:
      "Free gives you three full evaluations with no credit card required. Pro adds unlimited evaluations on one property, monthly refreshes, and your full Decision Journal history. Max covers up to five properties, adds Nearby Match and a quarterly deep-dive report, plus early access to new features.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes — cancellation is one click from your account settings, with no phone call or retention flow required. You'll keep access through the end of your current billing period.",
  },
  {
    question: "Is there a refund if I don't like it?",
    answer:
      "Pro subscriptions are covered by a 14-day full refund policy, so you can test it against your actual property risk-free.",
  },
];

function AccordionRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: `1px solid ${COLORS.hairline}` }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150"
      >
        <span style={{ fontFamily: FONT_FAMILY.display, fontSize: "17px", fontWeight: 600, color: COLORS.ink }}>
          {item.question}
        </span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-200"
          style={{ color: COLORS.inkMuted, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "320px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="pb-5 text-sm leading-relaxed pr-8" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />

      <div className="w-full" style={{ backgroundColor: COLORS.ink, paddingTop: "88px" }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <span className="text-xs uppercase tracking-wide mb-3 block" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold }}>
            Support
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#FFFFFF" }}>
            Frequently asked questions
          </h1>
        </div>
      </div>

      <section className="w-full max-w-2xl px-6 py-16">
        {FAQ_ITEMS.map((item, i) => (
          <AccordionRow
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </section>

      <Footer />
    </main>
  );
}
