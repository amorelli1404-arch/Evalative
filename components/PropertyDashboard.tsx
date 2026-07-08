"use client";

/**
 * components/PropertyDashboard.tsx
 *
 * Composes VerdictCard (Layer 1), DeepDiveBreakdown (Layer 2), and
 * RawConfigPanel (Layer 3) into the single progressive-disclosure flow
 * described in the UX design: Layer 1 is the default and only view until
 * the user explicitly asks for more, at which point Layer 2 appears, and
 * Layer 3 only appears from an explicit action within Layer 2. Navigating
 * back always returns exactly one layer, never resets all the way to
 * Layer 1 -- this matches ordinary back-button expectations.
 *
 * This component owns view state only (which layer is showing). It does
 * NOT own data fetching -- evaluation, card, and comparableSales are
 * passed in as props, fetched by a parent server component / route loader
 * that calls the FastAPI evaluation endpoint. Keeping this component pure
 * presentation-plus-view-state makes it independently testable and reusable
 * between the Next.js web app and, with straightforward prop-compatible
 * adaptation, the React Native screens.
 */

import { useState } from "react";
import VerdictCard from "./VerdictCard";
import DeepDiveBreakdown from "./DeepDiveBreakdown";
import RawConfigPanel, { ScenarioOverrideInput } from "./RawConfigPanel";
import type { ComparableSale, EvaluationOutput, FormattedCard } from "../lib/types";

type DisclosureLayer = "verdict" | "breakdown" | "raw_config";

interface PropertyDashboardProps {
  card: FormattedCard;
  evaluation: EvaluationOutput;
  comparableSales: ComparableSale[];
  propertyAddressLabel: string;
  /** Triggered when the user submits an override on Layer 3. The parent is
   * responsible for calling the evaluation endpoint again with the new
   * ScenarioInputs and re-rendering this component with the fresh result
   * -- this component does not call the API directly. */
  onRequestRecalculation: (overrides: ScenarioOverrideInput) => void;
  /** Triggered from Layer 1's "Run a different scenario" link -- the
   * parent handles scenario-type switching (e.g. showing a scenario
   * picker), this component only surfaces the intent. */
  onRequestDifferentScenario: () => void;
}

export default function PropertyDashboard({
  card,
  evaluation,
  comparableSales,
  propertyAddressLabel,
  onRequestRecalculation,
  onRequestDifferentScenario,
}: PropertyDashboardProps) {
  const [layer, setLayer] = useState<DisclosureLayer>("verdict");

  return (
    <div className="flex flex-col items-center py-6">
      {layer === "verdict" && (
        <VerdictCard
          card={card}
          evaluation={evaluation}
          propertyAddressLabel={propertyAddressLabel}
          onSeeFullBreakdown={() => setLayer("breakdown")}
          onRunDifferentScenario={onRequestDifferentScenario}
        />
      )}

      {layer === "breakdown" && (
        <DeepDiveBreakdown
          evaluation={evaluation}
          comparableSales={comparableSales}
          onOpenRawConfig={() => setLayer("raw_config")}
          onClose={() => setLayer("verdict")}
        />
      )}

      {layer === "raw_config" && (
        <RawConfigPanel
          evaluation={evaluation}
          onSubmitOverride={(overrides) => {
            onRequestRecalculation(overrides);
            // Return to the verdict layer immediately -- the parent will
            // re-render this component with the new evaluation/card props
            // once the recalculation completes. We don't block here or
            // show a local loading state, since the parent owns that
            // (e.g. via a route-level loading.tsx or suspense boundary).
            setLayer("verdict");
          }}
          onClose={() => setLayer("breakdown")}
        />
      )}
    </div>
  );
}
