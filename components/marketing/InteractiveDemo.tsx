"use client";

import { forwardRef, useState } from "react";
import ConditionWizard from "../ConditionWizard";
import DisclaimerBanner from "../legal/DisclaimerBanner";
import { computeMockEvaluation } from "../../lib/mockEvaluation";
import { COLORS, FONT_FAMILY, SENTIMENT_STYLE, VERDICT_SENTIMENT } from "../../lib/design-tokens";
import type { ConditionSurveyAnswers } from "../../lib/types";

type Step = "address" | "wizard" | "loading" | "dashboard";

const InteractiveDemo = forwardRef<HTMLDivElement>(function InteractiveDemo(_props, ref) {
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState({ line1: "", city: "", state: "", zip: "" });
  const [{ evaluation, card }, setResult] = useState(() => computeMockEvaluation("minor_kitchen_remodel"));

  const handleAddressSubmit = () => {
    if (address.line1 && address.city && address.state && address.zip) setStep("wizard");
  };

  const handleWizardComplete = (answers: ConditionSurveyAnswers) => {
    const category = answers.kitchen_condition === "never_updated" ? "major_kitchen_remodel" : "minor_kitchen_remodel";
    setStep("loading");
    setTimeout(() => {
      setResult(computeMockEvaluation(category));
      setStep("dashboard");
    }, 900);
  };

  const sentiment = SENTIMENT_STYLE[VERDICT_SENTIMENT[evaluation.verdict]];

  return (
    <section ref={ref} className="w-full py-14 px-4 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="max-w-md mx-auto mb-8 text-center">
        <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
          Try it now
        </span>
        <h2 style={{ fontFamily: FONT_FAMILY.display, fontSize: "22px", fontWeight: 600, color: COLORS.ink }}>
          See what a verdict looks like
        </h2>
        <p className="mt-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
          This runs on sample data so you can see the format — no account needed.
        </p>
      </div>

      <div className="flex flex-col items-center">
        {step === "address" && (
          <div className="w-full max-w-md rounded-sm border p-6" style={{ backgroundColor: "white", borderColor: COLORS.hairline }}>
            <h3 className="text-lg mb-1" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
              Let&apos;s take a look at your property
            </h3>
            <p className="text-sm mb-5" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              We&apos;ll pull public records automatically — just enter the address.
            </p>
            <div className="flex flex-col gap-3 mb-5">
              <input placeholder="Street address" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className="w-full px-3 py-2 rounded-sm border text-sm" style={{ borderColor: COLORS.hairline }} />
              <div className="flex gap-2">
                <input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="flex-1 px-3 py-2 rounded-sm border text-sm" style={{ borderColor: COLORS.hairline }} />
                <input placeholder="State" maxLength={2} value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })} className="w-16 px-3 py-2 rounded-sm border text-sm" style={{ borderColor: COLORS.hairline }} />
                <input placeholder="ZIP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="w-24 px-3 py-2 rounded-sm border text-sm" style={{ borderColor: COLORS.hairline }} />
              </div>
            </div>
            <button onClick={handleAddressSubmit} className="w-full py-2 rounded-sm text-sm font-medium" style={{ backgroundColor: COLORS.ink, color: COLORS.paper }}>
              Continue
            </button>
          </div>
        )}

        {step === "wizard" && <ConditionWizard onComplete={handleWizardComplete} />}

        {step === "loading" && (
          <div className="flex flex-col items-center gap-3 py-16">
            <p className="text-xs uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
              Running the numbers...
            </p>
          </div>
        )}

        {step === "dashboard" && (
          <div className="w-full max-w-md rounded-sm border overflow-hidden" style={{ backgroundColor: "white", borderColor: COLORS.hairline }}>
            <div style={{ height: "3px", backgroundColor: sentiment.fg }} />
            <div className="px-5 pt-4 pb-5">
              <h2 className="text-[20px] mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
                {card.verdict_line}
              </h2>
              <div className="rounded-sm px-4 py-3 mb-4" style={{ backgroundColor: sentiment.bg }}>
                <span style={{ fontFamily: FONT_FAMILY.mono, fontSize: "15px", color: COLORS.ink }}>{card.number_line}</span>
              </div>
              <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>{card.reason_text}</p>
              <p className="text-sm mb-4" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>Next: {card.next_step}</p>
              <button onClick={() => { setAddress({ line1: "", city: "", state: "", zip: "" }); setStep("address"); }} className="text-sm underline" style={{ color: COLORS.inkMuted }}>
                Start over
              </button>
              <div className="mt-4">
                <DisclaimerBanner variant="compact" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default InteractiveDemo;
