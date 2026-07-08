"use client";

import { forwardRef, useState } from "react";
import ConditionWizard from "../ConditionWizard";
import PropertyDashboard from "../PropertyDashboard";
import DisclaimerBanner from "../legal/DisclaimerBanner";
import { computeMockEvaluation, MOCK_COMPARABLE_SALES } from "../../lib/mockEvaluation";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import type { ConditionSurveyAnswers } from "../../lib/types";

type Step = "address" | "wizard" | "loading" | "dashboard";

/**
 * components/marketing/InteractiveDemo.tsx
 *
 * The working demo flow (address -> condition wizard -> verdict card ->
 * breakdown -> raw config), extracted from the original standalone
 * app/page.tsx so it can sit as a section within the full landing page
 * rather than being the entire homepage. Still runs on mock data from
 * lib/mockEvaluation.ts -- see that file's header comment for the swap-in
 * path once the real backend + auth are live.
 *
 * forwardRef so the Hero's "Run a free evaluation" button can scroll this
 * section into view.
 */
const InteractiveDemo = forwardRef<HTMLDivElement>(function InteractiveDemo(_props, ref) {
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState({ line1: "", city: "", state: "", zip: "" });
  const [category, setCategory] = useState("minor_kitchen_remodel");
  const [{ evaluation, card }, setResult] = useState(() => computeMockEvaluation("minor_kitchen_remodel"));

  const handleAddressSubmit = () => {
    if (address.line1 && address.city && address.state && address.zip) {
      setStep("wizard");
    }
  };

  const handleWizardComplete = (answers: ConditionSurveyAnswers) => {
    const resolvedCategory = answers.kitchen_condition === "never_updated" ? "major_kitchen_remodel" : "minor_kitchen_remodel";
    setCategory(resolvedCategory);
    setStep("loading");
    setTimeout(() => {
      setResult(computeMockEvaluation(resolvedCategory));
      setStep("dashboard");
    }, 900);
  };

  const handleRecalculation = (overrides: { renovation_budget_override?: number }) => {
    setResult(computeMockEvaluation(category, overrides.renovation_budget_override));
  };

  const handleNewProperty = () => {
    setAddress({ line1: "", city: "", state: "", zip: "" });
    setStep("address");
  };

  return (
    <section ref={ref} className="w-full py-14 px-4 border-t" style={{ borderColor: COLORS.hairline }}>
      <div className="max-w-md mx-auto mb-8 text-center">
        <span
          className="text-xs uppercase tracking-wide block mb-2"
          style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}
        >
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
              <input
                placeholder="Street address"
                value={address.line1}
                onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                className="w-full px-3 py-2 rounded-sm border text-sm"
                style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.body }}
              />
              <div className="flex gap-2">
                <input
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-sm border text-sm"
                  style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.body }}
                />
                <input
                  placeholder="State"
                  maxLength={2}
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })}
                  className="w-16 px-3 py-2 rounded-sm border text-sm"
                  style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
                />
                <input
                  placeholder="ZIP"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  className="w-24 px-3 py-2 rounded-sm border text-sm"
                  style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
                />
              </div>
            </div>
            <button
              onClick={handleAddressSubmit}
              className="w-full py-2 rounded-sm text-sm font-medium"
              style={{ backgroundColor: COLORS.ink, color: COLORS.paper, fontFamily: FONT_FAMILY.body }}
            >
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
          <div className="w-full">
            <PropertyDashboard
              card={card}
              evaluation={evaluation}
              comparableSales={MOCK_COMPARABLE_SALES}
              propertyAddressLabel={`${address.line1}, ${address.city}, ${address.state}`}
              onRequestRecalculation={handleRecalculation}
              onRequestDifferentScenario={handleNewProperty}
            />
            <div className="max-w-md mx-auto mt-4 px-5">
              <DisclaimerBanner variant="compact" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default InteractiveDemo;
