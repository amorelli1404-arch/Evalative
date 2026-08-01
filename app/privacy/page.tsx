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
    heading: "Overview",
    body: [
      "Evalative (\"we\", \"us\") provides automated property evaluation reports. This policy explains what information we collect when you use our site and subscription service, how we use it, and the choices you have. It applies to evalative.com and the app itself.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Account information: your email address, and billing details handled by our payment processor (we do not store full card numbers ourselves).",
      "Property information you submit: addresses you enter for evaluation, along with any condition survey answers you provide about a property.",
      "Usage data: pages viewed, features used, and general device/browser information, collected to keep the product working and to understand which features are actually useful.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "To generate and refresh your property evaluations and Decision Journal.",
      "To operate your subscription: billing, renewals, and support requests.",
      "To improve the product — understanding which scenarios, market areas, or features get used helps us prioritize what we build next.",
      "To send you service updates. Marketing email (like the newsletter) is opt-in and can be unsubscribed from at any time.",
    ],
  },
  {
    heading: "What we never do",
    body: [
      "We never sell the addresses you evaluate, or your contact information, to real estate agents, lenders, or other lead-gen buyers. That's not a side policy — it's the reason this product exists as a paid subscription instead of a free, ad- and lead-supported tool.",
    ],
  },
  {
    heading: "Data sources & third parties",
    body: [
      "To generate evaluations, we draw on MLS feeds, public tax assessor and deed records, local permit data, and current mortgage rate feeds, along with a payment processor for billing and standard infrastructure providers for hosting and analytics. These providers process data on our behalf under their own security and confidentiality obligations — none of them receive your information for their own marketing use.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain your account and evaluation history for as long as your account is active, so your Decision Journal stays intact. If you delete your account, we remove your personal information and submitted property data within a reasonable period, except where we're required to retain limited billing records for legal or tax purposes.",
    ],
  },
  {
    heading: "Your rights & choices",
    body: [
      "You can access, correct, or delete your account information at any time from your account settings, or by contacting us. Depending on where you live, you may have additional rights over your personal data under applicable privacy law — reach out and we'll help.",
    ],
  },
  {
    heading: "Cookies & analytics",
    body: [
      "We use essential cookies to keep you logged in, and basic analytics to understand aggregate usage of the site. We don't use third-party ad-tracking cookies.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use bank-grade SSL encryption in transit and follow standard industry practices to protect data at rest. No system is perfectly secure, but we treat your property and account data as sensitive by default.",
    ],
  },
  {
    heading: "Children's privacy",
    body: ["Evalative is not directed to children under 16, and we don't knowingly collect information from them."],
  },
  {
    heading: "Changes to this policy",
    body: ["If we make material changes to this policy, we'll post the update here and adjust the date below."],
  },
  {
    heading: "Contact us",
    body: ["Questions about this policy or your data can be sent to privacy@evalative.com."],
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ backgroundColor: COLORS.paper, minHeight: "100vh" }} className="flex flex-col items-center">
      <Header alwaysSolid />

      <div className="w-full" style={{ backgroundColor: COLORS.ink, paddingTop: "88px" }}>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <span className="text-xs uppercase tracking-wide mb-3 block" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.gold }}>
            Legal
          </span>
          <h1 className="text-3xl sm:text-4xl leading-tight" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: "#FFFFFF" }}>
            Privacy Policy
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
