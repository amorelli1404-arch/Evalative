"use client";

import { useMemo, useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import {
  calculateFinancing,
  calculateProjectROI,
  type FinancingInputs,
  type ProjectType,
} from "../../lib/premiumTypes";

const PROJECT_TYPES: ProjectType[] = ["kitchen", "bathroom", "addition", "curb_appeal"];

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function FinancialROIModeling({ purchasePrice = 425000 }: { purchasePrice?: number }) {
  const [customCosts, setCustomCosts] = useState<Partial<Record<ProjectType, number>>>({});

  const [financingInputs, setFinancingInputs] = useState<FinancingInputs>({
    purchasePrice,
    interestRatePercent: 6.5,
    loanTermYears: 30,
    downPaymentPercent: 20,
    annualHoa: 0,
    annualInsurance: 1800,
    annualMaintenancePercent: 1,
    annualPropertyTaxPercent: 1.1,
    monthlyRentalEstimate: 2400,
  });

  const roiBreakdown = PROJECT_TYPES.map((type) => calculateProjectROI(type, customCosts[type]));
  const financingOutput = useMemo(() => calculateFinancing(financingInputs), [financingInputs]);

  const updateField = <K extends keyof FinancingInputs>(key: K, value: number) => {
    setFinancingInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          ROI by project type
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roiBreakdown.map((project) => (
            <div key={project.type} className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
              <div className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted, letterSpacing: "0.05em" }}>
                {project.label}
              </div>
              <div className="text-2xl mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: project.roiPercent >= 100 ? COLORS.moss : COLORS.ochre }}>
                {project.roiPercent}%
              </div>
              <div className="text-xs mb-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                {formatCurrency(project.valueAdded)} added
              </div>
              <label className="block">
                <span className="text-[10px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                  Your cost estimate
                </span>
                <input
                  type="number"
                  defaultValue={project.costEstimate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCustomCosts((prev) => ({ ...prev, [project.type]: isNaN(val) ? undefined : val }));
                  }}
                  className="w-full px-2 py-1 text-sm rounded-sm border"
                  style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
          Financing calculator
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "interestRatePercent" as const, label: "Interest rate (%)", step: 0.1 },
              { key: "loanTermYears" as const, label: "Loan term (years)", step: 1 },
              { key: "downPaymentPercent" as const, label: "Down payment (%)", step: 1 },
              { key: "annualHoa" as const, label: "Annual HOA ($)", step: 50 },
              { key: "annualInsurance" as const, label: "Annual insurance ($)", step: 50 },
              { key: "annualMaintenancePercent" as const, label: "Maintenance (% of value/yr)", step: 0.1 },
              { key: "annualPropertyTaxPercent" as const, label: "Property tax (%/yr)", step: 0.1 },
              { key: "monthlyRentalEstimate" as const, label: "Est. monthly rent ($)", step: 50 },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="text-[10px] uppercase tracking-wide block mb-1" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                  {field.label}
                </span>
                <input
                  type="number"
                  step={field.step}
                  value={financingInputs[field.key]}
                  onChange={(e) => updateField(field.key, parseFloat(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 text-sm rounded-sm border"
                  style={{ borderColor: COLORS.hairline, fontFamily: FONT_FAMILY.mono }}
                />
              </label>
            ))}
          </div>

          <div className="rounded-sm p-5" style={{ backgroundColor: financingOutput.breakEven ? COLORS.mossSoft : COLORS.claySoft }}>
            <div className="flex justify-between mb-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              <span>Monthly mortgage</span>
              <span style={{ fontFamily: FONT_FAMILY.mono }}>{formatCurrency(financingOutput.monthlyMortgagePayment)}</span>
            </div>
            <div className="flex justify-between mb-2 text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              <span>HOA + insurance + tax + maintenance</span>
              <span style={{ fontFamily: FONT_FAMILY.mono }}>
                {formatCurrency(financingOutput.monthlyHoa + financingOutput.monthlyInsurance + financingOutput.monthlyPropertyTax + financingOutput.monthlyMaintenance)}
              </span>
            </div>
            <div className="h-px my-3" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
            <div className="flex justify-between mb-2 text-sm font-semibold" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              <span>Total monthly cost</span>
              <span style={{ fontFamily: FONT_FAMILY.mono }}>{formatCurrency(financingOutput.totalMonthlyCost)}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.ink }}>
              <span>Est. monthly rental yield</span>
              <span style={{ fontFamily: FONT_FAMILY.mono, fontWeight: 600 }}>
                {financingOutput.monthlyRentalYield >= 0 ? "+" : ""}
                {formatCurrency(financingOutput.monthlyRentalYield)}
              </span>
            </div>
            <p className="text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              {financingOutput.breakEven
                ? "Rental income covers the total monthly cost at these assumptions."
                : "Rental income doesn't cover the total monthly cost at these assumptions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
