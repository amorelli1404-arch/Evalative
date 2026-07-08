"use client";

/**
 * app/properties/[propertyId]/DashboardClient.tsx
 *
 * Thin client-side wrapper around PropertyDashboard. Its only job is
 * translating the component's callback props into calls to the Server
 * Actions in actions.ts, and holding the small amount of local state
 * needed to show the freshly-recalculated evaluation without a full page
 * reload. All actual data fetching/mutation happens server-side in
 * actions.ts -- this component never talks to the FastAPI backend directly.
 */

import { useState } from "react";
import PropertyDashboard from "../../../components/PropertyDashboard";
import DisclaimerBanner from "../../../components/legal/DisclaimerBanner";
import type { ScenarioOverrideInput } from "../../../components/RawConfigPanel";
import { recalculateEvaluation, runNewScenario } from "./actions";
import type { ComparableSale, EvaluationOutput, FormattedCard, ScenarioType } from "../../../lib/types";

interface DashboardClientProps {
  propertyId: string;
  propertyAddressLabel: string;
  initialCard: FormattedCard;
  initialEvaluation: EvaluationOutput;
  initialComparableSales: ComparableSale[];
}

export default function DashboardClient({
  propertyId,
  propertyAddressLabel,
  initialCard,
  initialEvaluation,
  initialComparableSales,
}: DashboardClientProps) {
  const [card, setCard] = useState(initialCard);
  const [evaluation, setEvaluation] = useState(initialEvaluation);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestRecalculation = async (overrides: ScenarioOverrideInput) => {
    setIsRecalculating(true);
    setError(null);
    try {
      const result = await recalculateEvaluation(propertyId, evaluation.scenario_type, overrides);
      setCard(result.card);
      setEvaluation(result.evaluation);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong recalculating this scenario. Please try again."
      );
    } finally {
      setIsRecalculating(false);
    }
  };

  const handleRequestDifferentScenario = async () => {
    // A full scenario picker (letting the user choose among renovation_roi /
    // sell_vs_rent / rent_vs_buy / refinance) is a separate UI surface not
    // built yet -- for now this cycles to the next scenario type as a
    // reasonable default rather than leaving the button non-functional.
    const scenarioOrder: ScenarioType[] = ["renovation_roi", "sell_vs_rent", "rent_vs_buy", "refinance"];
    const currentIndex = scenarioOrder.indexOf(evaluation.scenario_type);
    const nextScenario = scenarioOrder[(currentIndex + 1) % scenarioOrder.length];

    setIsRecalculating(true);
    setError(null);
    try {
      const result = await runNewScenario(propertyId, nextScenario);
      setCard(result.card);
      setEvaluation(result.evaluation);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong running that scenario. Please try again."
      );
    } finally {
      setIsRecalculating(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="max-w-md mx-auto mb-4 p-3 rounded-sm border border-red-300 bg-red-50 text-red-800 text-[13px]">
          {error}
        </div>
      )}
      {isRecalculating && (
        <div className="max-w-md mx-auto mb-4 text-center text-[13px] text-gray-500">
          Recalculating...
        </div>
      )}
      <PropertyDashboard
        card={card}
        evaluation={evaluation}
        comparableSales={initialComparableSales}
        propertyAddressLabel={propertyAddressLabel}
        onRequestRecalculation={handleRequestRecalculation}
        onRequestDifferentScenario={handleRequestDifferentScenario}
      />
      <div className="max-w-md mx-auto mt-4 px-5">
        <DisclaimerBanner variant="compact" />
      </div>
    </div>
  );
}
