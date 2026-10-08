"use client";

import Link from "next/link";
import { FONT_FAMILY } from "../../lib/design-tokens";
import DisclaimerBanner from "../legal/DisclaimerBanner";
import TrustBadges from "./TrustBadges";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Support",
    links: [{ label: "FAQ", href: "/faq" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#111111" }} className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-wide mb-4" style={{ fontFamily: FONT_FAMILY.body, color: "#D4AF37", letterSpacing: "0.1em" }}>
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:text-white"
                    style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <img src="/logo.png" alt="Evalative" loading="lazy" decoding="async" className="h-12 w-auto mb-4 rounded-sm" />
          <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8" }}>
            Independent, data-driven evaluations of your property decisions.
          </p>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#2A2A2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <TrustBadges variant="dark" />
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#2A2A2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: "#8A8A8A" }}>
            © {new Date().getFullYear()} Evalative
          </span>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <DisclaimerBanner variant="full" />
        </div>
      </div>
    </footer>
  );
}
