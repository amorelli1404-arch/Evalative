"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

function SignUpCTA({ onClick }: { onClick?: () => void }) {
  return (
    <SignUpButton mode="modal">
      <button
        onClick={onClick}
        className="group px-6 py-2.5 text-sm font-semibold uppercase tracking-wide rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(212,175,55,0.45)] active:translate-y-0"
        style={{
          fontFamily: FONT_FAMILY.body,
          letterSpacing: "0.08em",
          background: `linear-gradient(135deg, #E7C463 0%, ${COLORS.gold} 100%)`,
          color: "#1A1A1A",
          boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
        }}
      >
        <span className="inline-flex items-center gap-1.5">
          Sign Up
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </span>
      </button>
    </SignUpButton>
  );
}

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [scrolled, setScrolled] = useState(alwaysSolid);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (alwaysSolid) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysSolid]);

  const isSolid = alwaysSolid || scrolled;
  const textColor = isSolid ? COLORS.ink : "#FFFFFF";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className="w-full fixed top-0 left-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isSolid ? "#FFFFFF" : "transparent",
        boxShadow: isSolid ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link href="/" aria-label="Evalative home" style={{ fontFamily: FONT_FAMILY.display, fontSize: "22px", fontWeight: 600, color: textColor, letterSpacing: "0.02em" }}>
          Evalative
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="text-sm uppercase tracking-wide transition-colors"
              style={{ fontFamily: FONT_FAMILY.body, color: textColor, letterSpacing: "0.08em" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="px-5 py-2 text-sm uppercase tracking-wide rounded-sm border transition-colors duration-150"
                style={{
                  fontFamily: FONT_FAMILY.body,
                  letterSpacing: "0.08em",
                  color: isSolid ? COLORS.ink : "#FFFFFF",
                  borderColor: isSolid ? COLORS.ink : "#FFFFFF",
                }}
              >
                Log In
              </button>
            </SignInButton>
            <SignUpCTA />
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              aria-current={pathname === "/dashboard" ? "page" : undefined}
              className="text-sm uppercase tracking-wide transition-colors"
              style={{ fontFamily: FONT_FAMILY.body, color: textColor, letterSpacing: "0.08em" }}
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span style={{ width: "22px", height: "2px", backgroundColor: textColor }} />
          <span style={{ width: "22px", height: "2px", backgroundColor: textColor }} />
          <span style={{ width: "22px", height: "2px", backgroundColor: textColor }} />
        </button>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Main navigation" className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: "#FFFFFF" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wide py-2"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink, letterSpacing: "0.08em" }}
            >
              {link.label}
            </Link>
          ))}
          <SignedOut>
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-2 text-sm uppercase tracking-wide rounded-sm border"
                  style={{ fontFamily: FONT_FAMILY.body, letterSpacing: "0.08em", color: COLORS.ink, borderColor: COLORS.ink }}
                >
                  Log In
                </button>
              </SignInButton>
              <SignUpCTA onClick={() => setMobileMenuOpen(false)} />
            </div>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              aria-current={pathname === "/dashboard" ? "page" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-wide py-2"
              style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink, letterSpacing: "0.08em" }}
            >
              Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <span className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                Account
              </span>
            </div>
          </SignedIn>
        </nav>
      )}
    </header>
  );
}
