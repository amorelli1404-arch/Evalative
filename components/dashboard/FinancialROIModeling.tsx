"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";
import { PROJECT_TYPES, calculateProjectROI, type ProjectType } from "../../lib/premiumTypes";
import { AssumptionFields, useAssumptions } from "./AssumptionsContext";
import { Eyebrow, NumberField, SectionTitle, StatRow, formatCurrency, formatSignedCurrency } from "./ui";

export default function FinancialROIModeling() {
  const { financing } = useAssumptions();
  const [customCosts, setCustomCosts] = useState<Partial<Record<ProjectType, number>>>({});
  const roiBreakdown = PROJECT_TYPES.map((type) => calculateProjectROI(type, customCosts[type]));

  return (
    <div className="flex flex-col gap-10">
      <div>
        <SectionTitle>ROI by project type</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roiBreakdown.map((project) => (
            <div key={project.type} className="rounded-sm border p-4" style={{ borderColor: COLORS.hairline }}>
              <Eyebrow>{project.label}</Eyebrow>
              <div className="text-2xl mb-1" style={{ fontFamily: FONT_FAMILY.mono, color: project.roiPercent >= 100 ? COLORS.moss : COLORS.ochre }}>
                {project.roiPercent}%
              </div>
              <div className="text-xs mb-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
                {formatCurrency(project.valueAdded)} added
              </div>
              <NumberField
                label="Your cost estimate"
                value={project.costEstimate}
                step={500}
                min={0}
                onChange={(v) => setCustomCosts((prev) => ({ ...prev, [project.type]: v }))}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Financing calculator</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <AssumptionFields
            keys={["homeValue", "monthlyRent", "interestRatePercent", "loanTermYears", "downPaymentPercent", "annualHoa", "annualInsurance", "annualMaintenancePercent", "annualPropertyTaxPercent"]}
          />

          <div className="rounded-sm p-5" style={{ backgroundColor: financing.breakEven ? COLORS.mossSoft : COLORS.claySoft }}>
            <StatRow label="Loan amount" value={formatCurrency(financing.loanAmount)} />
            <StatRow label="Monthly mortgage" value={formatCurrency(financing.monthlyMortgagePayment)} />
            <StatRow label="Property tax" value={formatCurrency(financing.monthlyPropertyTax)} />
            <StatRow label="Insurance + HOA" value={formatCurrency(financing.monthlyInsurance + financing.monthlyHoa)} />
            <StatRow label="Maintenance" value={formatCurrency(financing.monthlyMaintenance)} />
            <div className="h-px my-3" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
            <StatRow label="Total monthly cost" value={formatCurrency(financing.totalMonthlyCost)} strong />
            <StatRow label="Monthly cash flow if rented" value={formatSignedCurrency(financing.monthlyRentalYield)} strong />
            <p className="text-xs mt-3" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
              {financing.breakEven
                ? "Rental income covers the total monthly cost at these assumptions."
                : "Rental income doesn't cover the total monthly cost at these assumptions."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
