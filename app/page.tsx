"use client";

/**
 * app/page.tsx
 *
 * The homepage, and currently the only fully working route in this
 * deployment. Runs the real ConditionWizard and PropertyDashboard
 * components (VerdictCard / DeepDiveBreakdown / RawConfigPanel underneath)
 * against mock data from lib/mockEvaluation.ts -- NOT the FastAPI backend,
 * which isn't deployed yet. This gives the site something genuinely
 * clickable and correct on day one.
 *
 * NEXT STEP TO GO LIVE FOR REAL: deploy the FastAPI backend (see
 * backend/Dockerfile + docker-compose.yml), set NEXT_PUBLIC_API_BASE_URL
 * to point at it, wire up real Clerk auth in
 * app/properties/[propertyId]/page.tsx and actions.ts (currently stubbed
 * to throw on purpose), and swap this page's mock evaluation calls for
 * lib/api.ts's real runEvaluation().
 */

import { useState } from "react";
import ConditionWizard from "../components/ConditionWizard";
import PropertyDashboard from "../components/PropertyDashboard";
import DisclaimerBanner from "../components/legal/DisclaimerBanner";
import { computeMockEvaluation, MOCK_COMPARABLE_SALES } from "../lib/mockEvaluation";
import type { ConditionSurveyAnswers } from "../lib/types";

type Step = "address" | "wizard" | "loading" | "dashboard";

export default function HomePage() {
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
    <main style={{ backgroundColor: "#F2F1EC", minHeight: "100vh" }} className="flex flex-col items-center py-10 px-4">
      {step === "address" && (
        <div className="w-full max-w-md rounded-sm border p-6" style={{ backgroundColor: "white", borderColor: "#D8D5CC" }}>
          <h1 className="text-xl font-semibold mb-1" style={{ color: "#1C1F1D" }}>
            Let&apos;s take a look at your property
          </h1>
          <p className="text-sm mb-5" style={{ color: "#5B5F5A" }}>
            We&apos;ll pull public records automatically -- just enter the address.
          </p>
          <div className="flex flex-col gap-3 mb-5">
            <input
              placeholder="Street address"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              className="w-full px-3 py-2 rounded-sm border text-sm"
              style={{ borderColor: "#D8D5CC" }}
            />
            <div className="flex gap-2">
              <input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="flex-1 px-3 py-2 rounded-sm border text-sm"
                style={{ borderColor: "#D8D5CC" }}
              />
              <input
                placeholder="State"
                maxLength={2}
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })}
                className="w-16 px-3 py-2 rounded-sm border text-sm"
                style={{ borderColor: "#D8D5CC" }}
              />
              <input
                placeholder="ZIP"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                className="w-24 px-3 py-2 rounded-sm border text-sm"
                style={{ borderColor: "#D8D5CC" }}
              />
            </div>
          </div>
          <button
            onClick={handleAddressSubmit}
            className="w-full py-2 rounded-sm text-sm font-medium"
            style={{ backgroundColor: "#1C1F1D", color: "#F2F1EC" }}
          >
            Continue
          </button>
        </div>
      )}

      {step === "wizard" && <ConditionWizard onComplete={handleWizardComplete} />}

      {step === "loading" && (
        <div className="flex flex-col items-center gap-3 py-16">
          <p className="text-xs uppercase tracking-wide" style={{ color: "#5B5F5A" }}>
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
    </main>
  );
}
