"use client";

import { useEffect, useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

type TabId = "verdict" | "journal" | "deep_dive";

const TABS: { id: TabId; label: string }[] = [
  { id: "verdict", label: "The Verdict Card" },
  { id: "journal", label: "Decision Journal" },
  { id: "deep_dive", label: "Quarterly Deep-Dive PDF" },
];

const JOURNAL_ENTRIES = [
  { month: "March 2026", equityChange: "Baseline", rate: "6.8%", note: "Initial verdict: Renovate now — kitchen remodel projected at 108% ROI." },
  { month: "April 2026", equityChange: "+$3,100", rate: "6.7%", note: "Local comps ticked up. Verdict held steady." },
  { month: "May 2026", equityChange: "+$2,400", rate: "6.9%", note: "Rate rose slightly; recoup margin narrowed but stayed favorable." },
  { month: "June 2026", equityChange: "+$5,800", rate: "6.6%", note: "Rate dropped. Verdict reaffirmed with higher confidence (84% → 89%)." },
];

const HOTSPOTS = [
  { id: 1, top: "18%", left: "12%", title: "Confidence Score", body: "84% confidence — derived from comparable-sale density, data recency, and cross-scenario model agreement for this address." },
  { id: 2, top: "42%", left: "68%", title: "Projected Value Added", body: "The modeled dollar value this decision adds, net of estimated project or transaction costs, compared to doing nothing." },
  { id: 3, top: "72%", left: "20%", title: "Comparable Sales", body: "The three most recent, closest comparable sales used to ground this quarter's number — with distance and sale date shown." },
];

export default function SampleReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<TabId>("verdict");
  const [activeHotspot, setActiveHotspot] = useState<number>(1);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeHotspotData = HOTSPOTS.find((h) => h.id === activeHotspot)!;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sample report preview"
      style={{ backgroundColor: "rgba(20,20,20,0.6)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-sm"
        style={{ backgroundColor: "#FFFFFF" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 pt-6 pb-2 sticky top-0 z-10" style={{ backgroundColor: "#FFFFFF" }}>
          <div>
            <span className="text-xs uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
              Sample report
            </span>
            <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "22px", fontWeight: 600, color: COLORS.ink }}>
              What you actually get
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sample report"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-150 hover:bg-black/5"
            style={{ color: COLORS.ink }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-6">
          <div className="flex gap-1 overflow-x-auto border-b" style={{ borderColor: COLORS.hairline }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-3 py-3 text-xs sm:text-sm whitespace-nowrap transition-colors duration-150"
                style={{
                  fontFamily: FONT_FAMILY.body,
                  color: tab === t.id ? COLORS.ink : COLORS.inkMuted,
                  borderBottom: tab === t.id ? `2px solid ${COLORS.moss}` : "2px solid transparent",
                  fontWeight: tab === t.id ? 600 : 400,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {tab === "verdict" && (
            <div className="max-w-md mx-auto rounded-sm overflow-hidden" style={{ border: `1px solid ${COLORS.hairline}` }}>
              <div style={{ height: "3px", backgroundColor: COLORS.moss }} />
              <div className="px-5 pt-4 pb-5">
                <h3 className="text-[20px] mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                  🟢 Worth it right now
                </h3>
                <div className="rounded-sm px-4 py-3 mb-4" style={{ backgroundColor: COLORS.mossSoft }}>
                  <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "15px", color: COLORS.ink }}>
                    Est. $31,600 value added vs. $28,000 cost (113% return)
                  </span>
                </div>
                <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                  Your local market is appreciating faster than the national average, which is boosting
                  returns on this kind of project above what&apos;s typical elsewhere.
                </p>
                <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                  Next: Get 2-3 contractor quotes now to lock in current pricing.
                </p>
                <div className="flex items-center gap-4 pt-3" style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
                  <span className="flex items-center gap-1 text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    Updated 3d ago
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z" /></svg>
                    84% confidence
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "journal" && (
            <div className="max-w-lg mx-auto">
              <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                Every month, we re-run the numbers and log what changed — so you can see whether the
                verdict still holds before you act on it.
              </p>
              <div className="flex flex-col">
                {JOURNAL_ENTRIES.map((entry, i) => (
                  <div key={entry.month} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS.moss }} />
                      {i < JOURNAL_ENTRIES.length - 1 && <div className="w-px flex-1" style={{ backgroundColor: COLORS.hairline }} />}
                    </div>
                    <div className="pb-6">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <span className="text-sm font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                          {entry.month}
                        </span>
                        <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.moss }}>
                          Equity {entry.equityChange}
                        </span>
                        <span className="text-xs" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
                          Rate {entry.rate}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                        {entry.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "deep_dive" && (
            <div className="grid md:grid-cols-[1fr_260px] gap-6">
              <div
                className="relative rounded-sm mx-auto w-full max-w-sm aspect-[8.5/11] p-5"
                style={{ border: `1px solid ${COLORS.hairline}`, backgroundColor: "#FDFCF9" }}
              >
                <span className="text-[9px] uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
                  Q2 2026 Deep-Dive · 412 Maple St
                </span>
                <div className="mt-3 h-3 rounded-sm" style={{ backgroundColor: COLORS.hairline, width: "70%" }} />
                <div className="mt-2 h-2 rounded-sm" style={{ backgroundColor: COLORS.hairline, width: "45%" }} />
                <div className="mt-5 flex items-end gap-1.5 h-16">
                  {[40, 55, 48, 70, 62, 80].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: COLORS.mossSoft }} />
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-1.5">
                  <div className="h-2 rounded-sm" style={{ backgroundColor: COLORS.hairline, width: "90%" }} />
                  <div className="h-2 rounded-sm" style={{ backgroundColor: COLORS.hairline, width: "85%" }} />
                  <div className="h-2 rounded-sm" style={{ backgroundColor: COLORS.hairline, width: "60%" }} />
                </div>
                <div className="mt-5 grid grid-cols-3 gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-8 rounded-sm" style={{ backgroundColor: COLORS.hairline }} />
                  ))}
                </div>

                {HOTSPOTS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(h.id)}
                    aria-label={`Show explanation for ${h.title}`}
                    className="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-transform duration-150 hover:scale-110"
                    style={{
                      top: h.top,
                      left: h.left,
                      backgroundColor: activeHotspot === h.id ? COLORS.moss : COLORS.gold,
                      color: "#FFFFFF",
                      fontFamily: FONT_FAMILY.mono,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                    }}
                  >
                    {h.id}
                  </button>
                ))}
              </div>

              <div className="rounded-sm p-4" style={{ backgroundColor: COLORS.mossSoft, height: "fit-content" }}>
                <span className="text-[11px] uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.moss }}>
                  Hotspot {activeHotspotData.id}
                </span>
                <h4 className="text-sm mb-2" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                  {activeHotspotData.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
                  {activeHotspotData.body}
                </p>
                <p className="text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                  Tap another numbered marker to explore more of the page.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 pt-2 text-center">
          <span className="text-xs" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            Sample data shown for illustration — your report is built from your own property.
          </span>
        </div>
      </div>
    </div>
  );
}
