"use client";

import Link from "next/link";
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

const QUESTIONS = [
  { question: "Should I renovate now or wait?", answer: "We compare what a project costs with how much value it adds when you sell." },
  { question: "Should I sell or rent it out?", answer: "We compare selling and investing the money with keeping the home and renting it out." },
  { question: "Should I buy or keep renting?", answer: "We add up the full cost of each path over the time you plan to stay." },
];

const STEPS = [
  { title: "Tell us about the property", body: "Its value, the rent it could earn, your loan and how long you plan to keep it. You can change any number later." },
  { title: "We run the math", body: "Mortgage payments, monthly cash flow, renovation returns, and long-term comparisons, all from the same set of numbers." },
  { title: "You get a plain answer", body: "A short verdict, the main reason behind it, and the one thing to do next. The full numbers are there if you want them." },
];

const NOT_US = [
  "We don't sell homes, so we earn nothing if you sell.",
  "We don't offer mortgages, so we earn nothing if you borrow or refinance.",
  "We don't take a commission on any decision you make.",
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl mb-6" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
      {children}
    </h2>
  );
}

export default function AboutPage() {
  const body = { fontFamily: FONT_FAMILY.body, color: COLORS.ink };

  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header />

      <PhotoCarousel slides={SLIDES} minHeight="420px" overlayStrength="medium" priority>
        <div className="max-w-2xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-wide mb-3" style={{ fontFamily: FONT_FAMILY.mono, color: "#E4E2D8" }}>
            About Evalative
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#F5F4EF" }}>
            A straight answer on your biggest property decisions
          </h1>
          <p className="text-base sm:text-lg" style={{ fontFamily: FONT_FAMILY.body, color: "#E4E2D8" }}>
            We run the numbers. We don&apos;t make money from what you decide.
          </p>
        </div>
      </PhotoCarousel>

      <section className="w-full max-w-3xl px-6 pt-16 pb-12">
        <p style={{ ...body, fontSize: "18px", lineHeight: 1.8 }}>
          Most advice about a home comes from someone who gets paid when you act. An agent is paid when you sell, and a
          lender is paid when you borrow. Evalative is a second opinion from someone with nothing to gain either way.
        </p>
      </section>

      <section className="w-full max-w-5xl px-6 pb-16">
        <SectionHeading>The questions we answer</SectionHeading>
        <div className="grid md:grid-cols-3 gap-4">
          {QUESTIONS.map((q) => (
            <div key={q.question} className="rounded-sm border p-6" style={{ borderColor: COLORS.hairline, backgroundColor: "white" }}>
              <h3 className="text-lg mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                {q.question}
              </h3>
              <p className="text-sm leading-relaxed" style={{ ...body, color: COLORS.inkMuted }}>{q.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl px-6 pb-16">
        <SectionHeading>How it works</SectionHeading>
        <ol className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center mb-4 text-sm"
                style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}
              >
                {i + 1}
              </span>
              <h3 className="text-lg mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ ...body, color: COLORS.inkMuted }}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="w-full max-w-3xl px-6 pb-16">
        <SectionHeading>Why you can trust the answer</SectionHeading>
        <ul className="flex flex-col gap-3 mb-6">
          {NOT_US.map((line) => (
            <li key={line} className="flex gap-3" style={{ ...body, fontSize: "16px", lineHeight: 1.7 }}>
              <span style={{ color: COLORS.moss }}>✓</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p style={{ ...body, fontSize: "16px", lineHeight: 1.75 }}>
          Every result shows its working, so you can see exactly which numbers led to it. If you change a number, the
          answer updates straight away.
        </p>
      </section>

      <section className="w-full max-w-3xl px-6 pb-16">
        <div className="rounded-sm p-6" style={{ backgroundColor: COLORS.slateSoft }}>
          <h2 className="text-xl mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            What our numbers are, and aren&apos;t
          </h2>
          <p style={{ ...body, fontSize: "15px", lineHeight: 1.75 }}>
            Our results are estimates to help you decide. They are not an appraisal, a loan offer, or financial advice.
            Where we use example market data, the page says so. Before you commit to something big, check our numbers
            with a contractor, lender, or local agent.
          </p>
        </div>
      </section>

      <section className="w-full max-w-3xl px-6 pb-20">
        <div className="p-6 rounded-sm" style={{ backgroundColor: "white", border: `1px solid ${COLORS.hairline}` }}>
          <h2 className="text-xl mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            Join early
          </h2>
          <p className="mb-5" style={{ ...body, fontSize: "16px", lineHeight: 1.75 }}>
            We&apos;re a small team building this in the open before a wider launch. If you join now, you help decide what we
            build next, and you keep founding-member pricing that won&apos;t be offered again later.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 rounded-sm text-sm font-medium"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
          >
            See plans
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
