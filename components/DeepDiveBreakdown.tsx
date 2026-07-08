"use client";

/**
 * components/DeepDiveBreakdown.tsx
 *
 * Layer 2 of the progressive disclosure system. Unlike VerdictCard, this
 * component renders directly from the raw EvaluationOutput numbers and
 * ComparableSale data -- this is the intentional "for users who want more"
 * layer, so precision and completeness matter more here than in Layer 1.
 * Still no financial jargon in labels (no "cap rate," "NPV") per the
 * system prompt's plain-language rule, which applies to the whole product,
 * not just the AI-generated card.
 */

import { COLORS, FONT_FAMILY, KEY_DRIVER_LABEL, SENTIMENT_STYLE, VERDICT_SENTIMENT } from "../lib/design-tokens";
import type { ComparableSale, EvaluationOutput } from "../lib/types";

interface DeepDiveBreakdownProps {
  evaluation: EvaluationOutput;
  comparableSales: ComparableSale[];
  onOpenRawConfig: () => void;
  onClose: () => void;
}

function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function CostValueBar({ cost, valueAdded }: { cost: number; valueAdded: number }) {
  const max = Math.max(cost, valueAdded);
  const costPct = (cost / max) * 100;
  const valuePct = (valueAdded / max) * 100;

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[12px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
            Cost
          </span>
          <span
            className="text-[13px] tabular-nums"
            style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}
          >
            {formatCurrency(cost)}
          </span>
        </div>
        <div className="h-2 rounded-full w-full" style={{ backgroundColor: COLORS.hairline }}>
          <div
            className="h-2 rounded-full"
            style={{ width: `${costPct}%`, backgroundColor: COLORS.slate }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[12px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
            Value added
          </span>
          <span
            className="text-[13px] tabular-nums"
            style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}
          >
            {formatCurrency(valueAdded)}
          </span>
        </div>
        <div className="h-2 rounded-full w-full" style={{ backgroundColor: COLORS.hairline }}>
          <div
            className="h-2 rounded-full"
            style={{ width: `${valuePct}%`, backgroundColor: COLORS.moss }}
          />
        </div>
      </div>
    </div>
  );
}

function ComparableSalesTable({ sales }: { sales: ComparableSale[] }) {
  if (sales.length === 0) {
    return (
      <p className="text-[13px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
        No comparable sales available in the last 90 days.
      </p>
    );
  }

  return (
    <div className="border rounded-sm overflow-hidden" style={{ borderColor: COLORS.hairline }}>
      <table className="w-full text-left">
        <thead>
          <tr style={{ backgroundColor: COLORS.hairline }}>
            <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
              Location
            </th>
            <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
              Sale price
            </th>
            <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
              Sqft
            </th>
            <th className="px-3 py-2 text-[11px] uppercase tracking-wide font-normal" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
              Sold
            </th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <tr key={i} style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
              <td className="px-3 py-2 text-[13px]" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
                {sale.address_label}
              </td>
              <td className="px-3 py-2 text-[13px] tabular-nums" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}>
                {formatCurrency(sale.sale_price)}
              </td>
              <td className="px-3 py-2 text-[13px] tabular-nums" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}>
                {sale.living_area_sqft.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-[13px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
                {new Date(sale.sale_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DeepDiveBreakdown({
  evaluation,
  comparableSales,
  onOpenRawConfig,
  onClose,
}: DeepDiveBreakdownProps) {
  const sentiment = VERDICT_SENTIMENT[evaluation.verdict];
  const style = SENTIMENT_STYLE[sentiment];
  const driverLabel = KEY_DRIVER_LABEL[evaluation.key_driver] ?? evaluation.key_driver.replace(/_/g, " ");

  return (
    <div
      className="w-full max-w-md rounded-sm border p-5"
      style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-[16px]"
          style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.display, fontWeight: 600 }}
        >
          Full breakdown
        </h3>
        <button
          onClick={onClose}
          className="text-[13px]"
          style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
        >
          ← Back
        </button>
      </div>

      {/* Driver explanation */}
      <div className="mb-5 pb-5 border-b" style={{ borderColor: COLORS.hairline }}>
        <span className="text-[11px] uppercase tracking-wide" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
          Primary driver
        </span>
        <p className="text-[14px] mt-1" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
          {driverLabel}
        </p>
      </div>

      {/* Cost vs value visualization -- only rendered when both figures exist,
          i.e. renovation_roi scenarios. */}
      {evaluation.cost_estimate !== null && evaluation.value_added !== null && (
        <div className="mb-5 pb-5 border-b" style={{ borderColor: COLORS.hairline }}>
          <span className="text-[11px] uppercase tracking-wide block mb-3" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
            Cost vs. value
          </span>
          <CostValueBar cost={evaluation.cost_estimate} valueAdded={evaluation.value_added} />
        </div>
      )}

      {/* Breakeven timeline -- rendered only for refinance scenarios */}
      {evaluation.breakeven_years !== null && (
        <div className="mb-5 pb-5 border-b" style={{ borderColor: COLORS.hairline }}>
          <span className="text-[11px] uppercase tracking-wide block mb-1" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
            Time to break even
          </span>
          <span className="text-[18px] tabular-nums" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.mono }}>
            {evaluation.breakeven_years.toFixed(1)} years
          </span>
        </div>
      )}

      {/* Comparable sales */}
      <div className="mb-5 pb-5 border-b" style={{ borderColor: COLORS.hairline }}>
        <span className="text-[11px] uppercase tracking-wide block mb-3" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.mono }}>
          Comparable sales, last 90 days
        </span>
        <ComparableSalesTable sales={comparableSales} />
      </div>

      {/* Confidence detail */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[13px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
          Confidence in this estimate
        </span>
        <span
          className="text-[13px] px-2 py-[2px] rounded-sm tabular-nums"
          style={{ color: style.fg, backgroundColor: style.bg, fontFamily: FONT_FAMILY.mono }}
        >
          {Math.round(evaluation.confidence_score * 100)}%
        </span>
      </div>

      <button
        onClick={onOpenRawConfig}
        className="text-[13px] underline underline-offset-2"
        style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}
      >
        View raw data & methodology →
      </button>
    </div>
  );
}
