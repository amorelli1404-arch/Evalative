"use client";

/**
 * components/VerdictCard.tsx
 *
 * Layer 1 of the progressive disclosure system -- the default view, and the
 * only thing shown until the user explicitly asks for more. Renders
 * EXCLUSIVELY from the AI-formatted FormattedCard text fields (never raw
 * EvaluationOutput numbers directly) -- the four fields are already the
 * validated, plain-language output of the AI guardrail pipeline, so this
 * component's job is purely presentational.
 *
 * Signature visual element: the confidence gauge rendered as a small tick
 * ruler (not a percentage badge or a progress bar), reinforcing the
 * "instrument reading" visual language from the design token system.
 */

import { COLORS, FONT_FAMILY, SENTIMENT_STYLE, VERDICT_SENTIMENT } from "../lib/design-tokens";
import type { EvaluationOutput, FormattedCard } from "../lib/types";

interface VerdictCardProps {
  card: FormattedCard;
  /** Only used for: (1) determining sentiment color, (2) driving the
   * confidence gauge and freshness stamp. Text is never read from this
   * object in this component -- see the Layer 2 component for that. */
  evaluation: Pick<EvaluationOutput, "verdict" | "confidence_score" | "data_freshness_days">;
  propertyAddressLabel: string;
  onSeeFullBreakdown: () => void;
  onRunDifferentScenario: () => void;
}

function ConfidenceGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(1, score));
  const filledTicks = Math.round(clamped * 5);
  const ticks = Array.from({ length: 5 }, (_, i) => i < filledTicks);

  return (
    <div className="flex items-center gap-2" aria-label={`Confidence: ${Math.round(clamped * 100)} percent`}>
      <div className="flex items-end gap-[3px]" role="img">
        {ticks.map((filled, i) => (
          <div
            key={i}
            className="w-[3px] rounded-[1px]"
            style={{
              height: `${6 + i * 3}px`,
              backgroundColor: filled ? COLORS.ink : COLORS.hairline,
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] uppercase tracking-wide"
        style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
      >
        {Math.round(clamped * 100)}% confidence
      </span>
    </div>
  );
}

function FreshnessStamp({ days }: { days: number }) {
  const label = days === 0 ? "Updated today" : days === 1 ? "Updated yesterday" : `Updated ${days}d ago`;
  return (
    <span
      className="text-[11px] uppercase tracking-wide"
      style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
    >
      {label}
    </span>
  );
}

export default function VerdictCard({
  card,
  evaluation,
  propertyAddressLabel,
  onSeeFullBreakdown,
  onRunDifferentScenario,
}: VerdictCardProps) {
  const sentiment = VERDICT_SENTIMENT[evaluation.verdict];
  const style = SENTIMENT_STYLE[sentiment];

  return (
    <div
      className="w-full max-w-md rounded-sm border overflow-hidden"
      style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}
    >
      {/* Sentiment indicator bar -- a thin top bar rather than a full
          colored banner or badge, keeping the loud color minimal and
          deliberate per the design token system's restraint principle. */}
      <div className="h-[3px] w-full" style={{ backgroundColor: style.fg }} />

      <div className="px-5 pt-4 pb-5">
        {/* Header row: address + freshness stamp, styled like a sample tag */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[13px] truncate"
            style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
          >
            {propertyAddressLabel}
          </span>
          <FreshnessStamp days={evaluation.data_freshness_days} />
        </div>

        {/* [VERDICT] */}
        <h2
          className="text-[20px] leading-snug mb-3"
          style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.display, fontWeight: 600 }}
        >
          {card.verdict_line}
        </h2>

        {/* [THE NUMBER] -- rendered in monospace, the signature "measured
            data" treatment, inside a bordered panel to read as a readout
            rather than inline prose. */}
        <div
          className="rounded-sm px-4 py-3 mb-4 border"
          style={{ backgroundColor: style.bg, borderColor: style.fg + "33" }}
        >
          <span
            className="text-[15px] tabular-nums"
            style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}
          >
            {card.number_line}
          </span>
        </div>

        {/* [THE REASON] */}
        <p
          className="text-[14px] leading-relaxed mb-4"
          style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}
        >
          {card.reason_text}
        </p>

        <div className="h-px w-full mb-4" style={{ backgroundColor: COLORS.hairline }} />

        {/* [THE NEXT STEP] */}
        <div className="flex items-start gap-2 mb-5">
          <span
            className="text-[13px] uppercase tracking-wide shrink-0 mt-[1px]"
            style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}
          >
            Next →
          </span>
          <p className="text-[14px]" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
            {card.next_step}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <ConfidenceGauge score={evaluation.confidence_score} />
          <div className="flex gap-4">
            <button
              onClick={onRunDifferentScenario}
              className="text-[13px] underline underline-offset-2"
              style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
            >
              Run a different scenario
            </button>
            <button
              onClick={onSeeFullBreakdown}
              className="text-[13px] font-medium underline underline-offset-2"
              style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}
            >
              See full breakdown →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
