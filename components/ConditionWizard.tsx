"use client";

/**
 * components/ConditionWizard.tsx
 *
 * The structured onboarding survey described in the product roadmap:
 * fixed dropdown/choice questions, never a free-text field, so the answers
 * feed roi_engine.py as clean categorical variables rather than requiring
 * NLP parsing of prose. Six questions total, one visible at a time, to
 * keep the "short and simple" philosophy consistent even during
 * onboarding -- no long form dumped on the user at once.
 */

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../lib/design-tokens";
import type { ConditionSurveyAnswers } from "../lib/types";

interface ConditionWizardProps {
  onComplete: (answers: ConditionSurveyAnswers) => void;
}

type ChoiceOption<T extends string> = { value: T; label: string };

const CONDITION_OPTIONS: ChoiceOption<NonNullable<ConditionSurveyAnswers["kitchen_condition"]>>[] = [
  { value: "never_updated", label: "Never updated" },
  { value: "0_5yr", label: "Updated in the last 5 years" },
  { value: "5_15yr", label: "Updated 5-15 years ago" },
  { value: "15yr_plus", label: "Updated more than 15 years ago" },
];

const OCCUPANCY_OPTIONS: ChoiceOption<NonNullable<ConditionSurveyAnswers["occupancy_type"]>>[] = [
  { value: "owner_occupied", label: "I live here and own it" },
  { value: "rental_owned", label: "I own it and rent it out" },
  { value: "renting", label: "I rent this property" },
];

const GOAL_OPTIONS: ChoiceOption<NonNullable<ConditionSurveyAnswers["primary_goal"]>>[] = [
  { value: "renovation_evaluation", label: "Deciding whether to renovate" },
  { value: "sell_vs_rent", label: "Deciding whether to sell or rent it out" },
  { value: "rent_vs_buy", label: "Deciding whether to buy" },
];

const AGE_OPTIONS: ChoiceOption<string>[] = [
  { value: "0", label: "Brand new / within 1 year" },
  { value: "5", label: "About 5 years old" },
  { value: "10", label: "About 10 years old" },
  { value: "15", label: "About 15 years old" },
  { value: "20", label: "20+ years old" },
  { value: "unknown", label: "Not sure" },
];

interface WizardStep {
  key: keyof ConditionSurveyAnswers;
  question: string;
  render: (
    value: ConditionSurveyAnswers[keyof ConditionSurveyAnswers],
    onSelect: (value: string) => void
  ) => React.ReactNode;
}

function ChoiceList<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: ChoiceOption<T>[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-4 py-3 rounded-sm border text-[14px] transition-colors"
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

  const steps: WizardStep[] = [
    {
      key: "primary_goal",
      question: "What are you trying to figure out?",
      render: (_value, onSelect) => (
        <ChoiceList options={GOAL_OPTIONS} selected={answers.primary_goal} onSelect={onSelect} />
      ),
    },
    {
      key: "occupancy_type",
      question: "What's your relationship to this property?",
      render: (_value, onSelect) => (
        <ChoiceList options={OCCUPANCY_OPTIONS} selected={answers.occupancy_type} onSelect={onSelect} />
      ),
    },
    {
      key: "kitchen_condition",
      question: "When was the kitchen last updated?",
      render: (_value, onSelect) => (
        <ChoiceList options={CONDITION_OPTIONS} selected={answers.kitchen_condition} onSelect={onSelect} />
      ),
    },
    {
      key: "bathroom_condition",
      question: "When were the bathrooms last updated?",
      render: (_value, onSelect) => (
        <ChoiceList options={CONDITION_OPTIONS} selected={answers.bathroom_condition} onSelect={onSelect} />
      ),
    },
    {
      key: "roof_age_years",
      question: "How old is the roof?",
      render: (_value, onSelect) => (
        <ChoiceList options={AGE_OPTIONS} selected={answers.roof_age_years?.toString() ?? null} onSelect={onSelect} />
      ),
    },
    {
      key: "hvac_age_years",
      question: "How old is the heating/cooling system?",
      render: (_value, onSelect) => (
        <ChoiceList options={AGE_OPTIONS} selected={answers.hvac_age_years?.toString() ?? null} onSelect={onSelect} />
      ),
    },
  ];

  const currentStep = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const handleSelect = (rawValue: string) => {
    const parsedValue: string | number | null =
      currentStep.key === "roof_age_years" || currentStep.key === "hvac_age_years"
        ? rawValue === "unknown"
          ? null
          : parseInt(rawValue, 10)
        : rawValue;

    const updated = { ...answers, [currentStep.key]: parsedValue } as ConditionSurveyAnswers;
    setAnswers(updated);

    if (isLastStep) {
      onComplete(updated);
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  return (
    <div
      className="w-full max-w-md rounded-sm border p-6"
      style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}
    >
      {/* Progress indicator -- plain tick marks, consistent with the
          confidence gauge's visual language, not a generic progress bar. */}
      <div className="flex items-center gap-1 mb-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full"
            style={{ backgroundColor: i <= stepIndex ? COLORS.ink : COLORS.hairline }}
          />
        ))}
      </div>

      <span className="text-[11px] uppercase tracking-wide block mb-2" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
        Question {stepIndex + 1} of {steps.length}
      </span>

      <h2
        className="text-[18px] mb-5"
        style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.display, fontWeight: 600 }}
      >
        {currentStep.question}
      </h2>

      {currentStep.render(answers[currentStep.key], handleSelect)}

      {stepIndex > 0 && (
        <button
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          className="mt-5 text-[13px] underline underline-offset-2"
          style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
        >
          ← Back
        </button>
      )}
    </div>
  );
}
