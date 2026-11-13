"use client";

/**
 * components/dashboard/AssumptionsContext.tsx
 *
 * Holds the one set of property numbers every dashboard tab works from,
 * plus the values derived from them (financing, capital-decision inputs)
 * so no tab recomputes or re-asks for them. Numbers are remembered in this
 * browser so a returning user doesn't have to type them again.
 */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  DEFAULT_ASSUMPTIONS,
  calculateFinancing,
  toCapitalInputs,
  toFinancingInputs,
  type CapitalDecisionInputs,
  type CompProperty,
  type FinancingInputs,
  type FinancingOutput,
  type PropertyAssumptions,
} from "../../lib/premiumTypes";
import { SAMPLE_COMPS } from "../../lib/sampleData";
import { NumberField } from "./ui";

type AssumptionKey = keyof PropertyAssumptions;

export const ASSUMPTION_FIELDS: Record<AssumptionKey, { label: string; step: number; min: number }> = {
  homeValue: { label: "Home value ($)", step: 5000, min: 0 },
  livingAreaSqft: { label: "Living area (sq ft)", step: 50, min: 1 },
  monthlyRent: { label: "Market rent ($/mo)", step: 50, min: 0 },
  interestRatePercent: { label: "Interest rate (%)", step: 0.1, min: 0 },
  loanTermYears: { label: "Loan term (years)", step: 1, min: 1 },
  downPaymentPercent: { label: "Down payment (%)", step: 1, min: 0 },
  annualHoa: { label: "Annual HOA ($)", step: 50, min: 0 },
  annualInsurance: { label: "Annual insurance ($)", step: 50, min: 0 },
  annualMaintenancePercent: { label: "Maintenance (% of value/yr)", step: 0.1, min: 0 },
  annualPropertyTaxPercent: { label: "Property tax (%/yr)", step: 0.1, min: 0 },
  annualAppreciationPercent: { label: "Appreciation (%/yr)", step: 0.1, min: -20 },
  holdingYears: { label: "Holding period (years)", step: 1, min: 1 },
  sellingCostPercent: { label: "Selling costs (%)", step: 0.5, min: 0 },
};

export const ASSUMPTION_GROUPS: { title: string; keys: AssumptionKey[] }[] = [
  { title: "The property", keys: ["homeValue", "livingAreaSqft", "monthlyRent"] },
  {
    title: "Financing & running costs",
    keys: ["interestRatePercent", "loanTermYears", "downPaymentPercent", "annualHoa", "annualInsurance", "annualMaintenancePercent", "annualPropertyTaxPercent"],
  },
  { title: "Your plans", keys: ["annualAppreciationPercent", "holdingYears", "sellingCostPercent"] },
];

const STORAGE_KEY = "evalative.dashboard.assumptions.v1";

function loadSaved(): PropertyAssumptions | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Record<AssumptionKey, unknown>>;
    const merged = { ...DEFAULT_ASSUMPTIONS };
    for (const key of Object.keys(DEFAULT_ASSUMPTIONS) as AssumptionKey[]) {
      const value = parsed[key];
      if (typeof value === "number" && Number.isFinite(value)) merged[key] = Math.max(ASSUMPTION_FIELDS[key].min, value);
    }
    return merged;
  } catch {
    return null;
  }
}

interface AssumptionsValue {
  assumptions: PropertyAssumptions;
  setAssumption: (key: AssumptionKey, value: number) => void;
  resetAssumptions: () => void;
  financingInputs: FinancingInputs;
  financing: FinancingOutput;
  capitalInputs: CapitalDecisionInputs;
  comps: CompProperty[];
  toggleComp: (id: string) => void;
}

const AssumptionsContext = createContext<AssumptionsValue | null>(null);

export function AssumptionsProvider({ children }: { children: ReactNode }) {
  const [assumptions, setAssumptions] = useState<PropertyAssumptions>(DEFAULT_ASSUMPTIONS);
  const [loaded, setLoaded] = useState(false);
  const [comps, setComps] = useState<CompProperty[]>(SAMPLE_COMPS);

  // Read saved numbers after mount so server and client render the same
  // defaults first (no hydration mismatch).
  useEffect(() => {
    const saved = loadSaved();
    if (saved) setAssumptions(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assumptions));
    } catch {
      // Storage blocked (private window etc.) -- the dashboard still works, it just won't remember.
    }
  }, [assumptions, loaded]);

  const value = useMemo<AssumptionsValue>(() => {
    const financingInputs = toFinancingInputs(assumptions);
    return {
      assumptions,
      setAssumption: (key, v) => setAssumptions((prev) => ({ ...prev, [key]: v })),
      resetAssumptions: () => setAssumptions(DEFAULT_ASSUMPTIONS),
      financingInputs,
      financing: calculateFinancing(financingInputs),
      capitalInputs: toCapitalInputs(assumptions),
      comps,
      toggleComp: (id) => setComps((prev) => prev.map((c) => (c.id === id ? { ...c, included: !c.included } : c))),
    };
  }, [assumptions, comps]);

  return <AssumptionsContext.Provider value={value}>{children}</AssumptionsContext.Provider>;
}

export function useAssumptions(): AssumptionsValue {
  const ctx = useContext(AssumptionsContext);
  if (!ctx) throw new Error("useAssumptions must be used inside <AssumptionsProvider>");
  return ctx;
}

/** Editable inputs for any subset of the shared assumptions. */
export function AssumptionFields({ keys, className = "grid grid-cols-2 gap-4" }: { keys: AssumptionKey[]; className?: string }) {
  const { assumptions, setAssumption } = useAssumptions();
  return (
    <div className={className}>
      {keys.map((key) => (
        <NumberField
          key={key}
          label={ASSUMPTION_FIELDS[key].label}
          value={assumptions[key]}
          step={ASSUMPTION_FIELDS[key].step}
          min={ASSUMPTION_FIELDS[key].min}
          onChange={(v) => setAssumption(key, v)}
        />
      ))}
    </div>
  );
}
