"use client";

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../lib/design-tokens";
import type { ConditionSurveyAnswers } from "../lib/types";

interface ConditionWizardProps {
  onComplete: (answers: ConditionSurveyAnswers) => void;
}

const CONDITION_OPTIONS = [
  { value: "never_updated", label: "Never updated" },
  { value: "0_5yr", label: "Updated in the last 5 years" },
  { value: "5_15yr", label: "Updated 5-15 years ago" },
  { value: "15yr_plus", label: "Updated more than 15 years ago" },
];
const OCCUPANCY_OPTIONS = [
  { value: "owner_occupied", label: "I live here and own it" },
  { value: "rental_owned", label: "I own it and rent it out" },
  { value: "renting", label: "I rent this property" },
];
const GOAL_OPTIONS = [
  { value: "renovation_evaluation", label: "Deciding whether to renovate" },
  { value: "sell_vs_rent", label: "Deciding whether to sell or rent it out" },
  { value: "rent_vs_buy", label: "Deciding whether to buy" },
];

function ChoiceList({ options, selected, onSelect }: { options: { value: string; label: string }[]; selected: string | null; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-4 py-3 rounded-sm border text-[14px]"
            style={{
              borderColor: isSelected ? COLORS.ink : COLORS.hairline,
              backgroundColor: isSelected ? COLORS.ink : "white",
              color: isSelected ? COLORS.paper : COLORS.ink,
              fontFamily: FONT_FAMILY.body,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ConditionWizard({ onComplete }: ConditionWizardProps) {
  const [answers, setAnswers] = useState<ConditionSurveyAnswers>({
    kitchen_condition: null,
    bathroom_condition: null,
    roof_age_years: null,
    hvac_age_years: null,
    occupancy_type: null,
    primary_goal: null,
  });
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { key: "primary_goal" as const, question: "What are you trying to figure out?", options: GOAL_OPTIONS },
    { key: "occupancy_type" as const, question: "What's your relationship to this property?", options: OCCUPANCY_OPTIONS },
    { key: "kitchen_condition" as const, question: "When was the kitchen last updated?", options: CONDITION_OPTIONS },
  ];

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const handleSelect = (value: string) => {
    const updated = { ...answers, [currentStep.key]: value } as ConditionSurveyAnswers;
    setAnswers(updated);
    if (isLastStep) {
      onComplete(updated);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  return (
    <div className="w-full max-w-md rounded-sm border p-6" style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}>
      <div className="flex items-center gap-1 mb-6">
        {steps.map((_, i) => (
          <div key={i} className="h-[3px] flex-1 rounded-full" style={{ backgroundColor: i <= stepIndex ? COLORS.ink : COLORS.hairline }} />
        ))}
      </div>
      <span className="text-[11px] uppercase tracking-wide block mb-2" style={{ fontFamily: FONT_FAMILY.mono, color: COLORS.inkMuted }}>
        Question {stepIndex + 1} of {steps.length}
      </span>
      <h2 className="text-[18px] mb-5" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
        {currentStep.question}
      </h2>
      <ChoiceList options={currentStep.options} selected={answers[currentStep.key]} onSelect={handleSelect} />
      {stepIndex > 0 && (
        <button onClick={() => setStepIndex((i) => Math.max(0, i - 1))} className="mt-5 text-[13px] underline" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
          ← Back
        </button>
      )}
    </div>
  );
}
