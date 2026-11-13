"use client";

/**
 * components/dashboard/ui.tsx
 *
 * The small building blocks every dashboard tab shares, so each tab only
 * describes what it shows rather than restating the same styling.
 */

import type { ReactNode } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatSignedCurrency(value: number): string {
  return `${value >= 0 ? "+" : "−"}${formatCurrency(Math.abs(value))}`;
}

export function SectionTitle({ children, className = "mb-4" }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-lg ${className}`} style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
      {children}
    </h3>
  );
}

export function Eyebrow({ children, className = "mb-2" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`block text-xs uppercase tracking-wide ${className}`}
      style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, letterSpacing: "0.05em" }}
    >
      {children}
    </span>
  );
}

export function MaxBadge() {
  return (
    <span
      className="inline-block text-[10px] uppercase tracking-wide px-2 py-1 rounded-sm mb-1"
      style={{ backgroundColor: COLORS.goldSoft, color: COLORS.ink, fontFamily: FONT_FAMILY.body, letterSpacing: "0.06em" }}
    >
      Max exclusive
    </span>
  );
}

/** Title block for the Max-only engines: badge, heading and one-line description. */
export function EngineHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <MaxBadge />
      <SectionTitle className="mb-1">{title}</SectionTitle>
      <p className="text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        {description}
      </p>
    </div>
  );
}

export function NumberField({
  label, value, step, min, onChange,
}: { label: string; value: number; step: number; min: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
        {label}
      </span>
      <input
        type="number"
        step={step}
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseFloat(e.target.value) || 0))}
        className="w-full px-2 py-1.5 text-sm rounded-sm border"
        style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
      />
    </label>
  );
}

export function RangeField({
  label, display, value, min, max, step, onChange,
}: { label: string; display: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <Eyebrow className="">{label}</Eyebrow>
        <span className="text-sm" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.ink }}>{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
        style={{ accentColor: COLORS.gold }}
      />
    </div>
  );
}

/** "+2.5%" for signed slider readouts. */
export function signedPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value}%`;
}

export function StatRow({
  label, value, strong = false, color = COLORS.ink,
}: { label: string; value: ReactNode; strong?: boolean; color?: string }) {
  return (
    <div className="flex justify-between gap-4 mb-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink, fontWeight: strong ? 600 : 400 }}>
      <span>{label}</span>
      <span style={{ fontFamily: FONT_FAMILY.mono, color }}>{value}</span>
    </div>
  );
}

export function Meter({ percent, thin = false }: { percent: number; thin?: boolean }) {
  const height = thin ? "h-1.5" : "h-2";
  return (
    <div className={`${height} rounded-full w-full`} style={{ backgroundColor: COLORS.hairline }}>
      <div className={`${height} rounded-full transition-all`} style={{ width: `${Math.min(100, Math.max(0, percent))}%`, backgroundColor: COLORS.gold }} />
    </div>
  );
}

export function Panel({
  children, tone = "plain", padding = "p-5",
}: { children: ReactNode; tone?: "plain" | "gold"; padding?: string }) {
  return (
    <div
      className={`rounded-sm ${padding} ${tone === "plain" ? "border" : ""}`}
      style={tone === "plain" ? { borderColor: COLORS.hairline } : { backgroundColor: COLORS.goldSoft }}
    >
      {children}
    </div>
  );
}
