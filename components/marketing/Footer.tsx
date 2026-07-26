"use client";

import { useState } from "react";
import { FONT_FAMILY } from "../../lib/design-tokens";
import DisclaimerBanner from "../legal/DisclaimerBanner";

const COLUMNS = [
  { title: "Company", links: ["About", "Pricing", "Careers"] },
  { title: "Support", links: ["Help Center", "Contact Us", "FAQ"] },
  { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Disclosures"] },
  { title: "Follow Us", links: ["Instagram", "LinkedIn", "X"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer style={{ backgroundColor: "#111111" }} className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs uppercase tracking-wide mb-4" style={{ fontFamily: FONT_FAMILY.body, color: "#D4AF37", letterSpacing: "0.1em" }}>
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: "#B8B8B8" }}>
                    {link}
                  </a>
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
