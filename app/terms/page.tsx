"use client";

import Header from "../../components/marketing/Header";
import Footer from "../../components/marketing/Footer";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

interface Section {
  heading: string;
  body: string[];
}

const SECTIONS: Section[] = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "By creating an account or using Evalative, you agree to these Terms of Service. If you don't agree, please don't use the service.",
    ],
  },
  {
    heading: "2. What Evalative is — and isn't",
    body: [
      "Evalative provides automated, data-driven property evaluations covering renovation, sell-vs-rent, rent-vs-buy, and refinance scenarios. It is not an appraisal performed by a licensed appraiser and does not comply with USPAP. It is not personalized financial, investment, tax, or legal advice, and Evalative is not a registered investment advisor, licensed appraiser, or real estate broker.",
      "Figures shown are modeled estimates based on public records and market data. They may differ from actual market value or actual outcomes. Always confirm significant decisions with a licensed real estate professional, appraiser, lender, or financial advisor before acting.",
    ],
  },
  {
    heading: "3. Accounts",
    body: [
      "You're responsible for the accuracy of the information you provide and for keeping your account credentials secure. Notify us promptly if you suspect unauthorized use of your account.",
    ],
  },
  {
    heading: "4. Subscriptions & billing",
    body: [
      "Pro and Max are paid monthly subscriptions that renew automatically until cancelled. Founding member pricing, where offered, is locked in for as long as your subscription stays active without a lapse. Prices shown are in USD and exclude applicable taxes unless stated otherwise.",
    ],
  },
  {
    heading: "5. Free tier",
    body: [
      "The Free tier includes a limited number of one-time evaluations with no credit card required. We may adjust the scope of the Free tier going forward, but changes won't retroactively remove evaluations you've already run.",
    ],
  },
  {
    heading: "6. Cancellation & refunds",
    body: [
      "You can cancel your subscription at any time from your account settings; cancellation takes effect at the end of your current billing period, and you keep access until then. New Pro subscriptions are covered by a 14-day full refund policy from the date of purchase — contact us to request one.",
    ],
  },
  {
    heading: "7. Acceptable use",
    body: [
      "Don't use Evalative to scrape, resell, or redistribute our data or reports at scale, attempt to reverse-engineer our evaluation methodology for a competing product, or interfere with the normal operation of the service.",
    ],
  },
  {
    heading: "8. Disclaimer of warranties",
    body: [
      "The service is provided \"as is\" without warranties of any kind, express or implied, including accuracy, merchantability, or fitness for a particular purpose. We work to keep data current and models sound, but we don't guarantee any particular evaluation, verdict, or outcome.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, Evalative and its team aren't liable for indirect, incidental, or consequential damages arising from your use of the service, including decisions made based on an evaluation. Our total liability for any claim is limited to the amount you paid us in the twelve months before the claim arose.",
    ],
  },
  {
    heading: "10. Changes to the service or these terms",
    body: [
      "We may update features, pricing for new subscribers, or these terms over time. We'll post material changes here with an updated date, and continued use of the service after a change constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "11. Governing law",
    body: ["These terms are governed by the laws of the jurisdiction in which Evalative is incorporated, without regard to conflict-of-law principles."],
  },
  {
    heading: "12. Contact",
    body: ["Questions about these terms can be sent to support@evalative.com."],
  },
];

export default function TermsPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />

      <div className="w-full" style={{ backgroundColor: COLORS.ink, paddingTop: "88px" }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <span className="text-xs uppercase tracking-wide mb-3 block" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold }}>
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#FFFFFF" }}>
            Terms of Service
          </h1>
          <p className="mt-3 text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: "#D8D6CC" }}>
            Last updated: August 1, 2026
          </p>
        </div>
      </div>

      <section className="w-full max-w-3xl px-6 py-16">
        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                {section.heading}
              </h2>
              <div className="flex flex-col gap-3">
                {section.body.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
