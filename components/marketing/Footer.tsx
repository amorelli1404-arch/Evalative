"use client";

import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
          <img src="/logo.png" alt="Evalative" className="h-12 w-auto mb-4 rounded-sm" />
          <h4 className="text-xs uppercase tracking-wide mb-4" style={{ fontFamily: FONT_FAMILY.body, color: "#D4AF37", letterSpacing: "0.1em" }}>
            Newsletter
          </h4>
          <p className="text-sm mb-3" style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8" }}>
            Market insights, occasionally.
          </p>
          {submitted ? (
            <p className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: "#D4AF37" }}>
              You're on the list.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-3 py-2 text-sm bg-transparent border rounded-l-sm outline-none"
                style={{ fontFamily: FONT_FAMILY.body, color: "#FFFFFF", borderColor: "#3A3A3A" }}
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-r-sm"
                style={{ fontFamily: FONT_FAMILY.body, backgroundColor: "#D4AF37", color: "#1A1A1A" }}
              >
                →
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#2A2A2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <TrustBadges variant="dark" />
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#2A2A2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: "#8A8A8A" }}>
            © {new Date().getFullYear()} Evalative
          </span>
          <div className="flex items-center gap-4">
            <select className="text-xs bg-transparent outline-none" style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8", borderColor: "#3A3A3A" }}>
              <option>English</option>
            </select>
            <select className="text-xs bg-transparent outline-none" style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8", borderColor: "#3A3A3A" }}>
              <option>USD</option>
            </select>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-6">
          <DisclaimerBanner variant="full" />
        </div>
      </div>
    </footer>
  );
}
