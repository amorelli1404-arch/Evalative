"use client";

/**
 * components/legal/ConsentGate.tsx
 *
 * Blocks signup completion until the user explicitly checks both consent
 * boxes. Deliberately two SEPARATE checkboxes (ToS, Privacy Policy) rather
 * than one combined "I agree to everything" checkbox -- this produces two
 * distinct, individually auditable consent timestamps matching the
 * tos_accepted_at / privacy_policy_accepted_at columns on the `users`
 * table (schema/001_users.sql), which is the pattern regulators and
 * auditors expect to see for CCPA/privacy compliance rather than a single
 * bundled consent event.
 *
 * The marketing opt-in is a THIRD, separately unchecked-by-default box --
 * marketing consent must never be bundled with required ToS/Privacy
 * acceptance, since making it appear mandatory (even visually) undermines
 * the "opt-in" nature CCPA requires.
 */

import { useState } from "react";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export interface ConsentGateResult {
  tos_accepted_at: string; // ISO datetime, captured client-side at the moment of check, re-verified server-side at submission
  privacy_policy_accepted_at: string;
  marketing_opt_in_at: string | null; // null if the user left this unchecked
}

interface ConsentGateProps {
  tosUrl: string;
  privacyPolicyUrl: string;
  onAccept: (result: ConsentGateResult) => void;
}

export default function ConsentGate({ tosUrl, privacyPolicyUrl, onAccept }: ConsentGateProps) {
  const [tosChecked, setTosChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  const canProceed = tosChecked && privacyChecked;

  const handleSubmit = () => {
    if (!canProceed) return;
    const now = new Date().toISOString();
    onAccept({
      tos_accepted_at: now,
      privacy_policy_accepted_at: now,
      marketing_opt_in_at: marketingChecked ? now : null,
    });
  };

  return (
    <div
      className="w-full max-w-md rounded-sm border p-6"
      style={{ backgroundColor: COLORS.paper, borderColor: COLORS.hairline }}
    >
      <h2
        className="text-[18px] mb-4"
        style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.display, fontWeight: 600 }}
      >
        Before you continue
      </h2>

      <label className="flex items-start gap-3 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={tosChecked}
          onChange={(e) => setTosChecked(e.target.checked)}
          className="mt-1"
          required
        />
        <span className="text-[14px]" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
          I have read and agree to the{" "}
          <a href={tosUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: COLORS.ink }}>
            Terms of Service
          </a>
          .
        </span>
      </label>

      <label className="flex items-start gap-3 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={privacyChecked}
          onChange={(e) => setPrivacyChecked(e.target.checked)}
          className="mt-1"
          required
        />
        <span className="text-[14px]" style={{ color: COLORS.ink, fontFamily: FONT_FAMILY.body }}>
          I have read and agree to the{" "}
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: COLORS.ink }}>
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <div className="h-px w-full my-4" style={{ backgroundColor: COLORS.hairline }} />

      <label className="flex items-start gap-3 mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={marketingChecked}
          onChange={(e) => setMarketingChecked(e.target.checked)}
          className="mt-1"
        />
        <span className="text-[14px]" style={{ color: COLORS.inkMuted, fontFamily: FONT_FAMILY.body }}>
          Send me occasional emails about product updates and market insights. (Optional -- you can
          change this anytime in account settings.)
        </span>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!canProceed}
        className="w-full py-2 rounded-sm text-[14px]"
        style={{
          backgroundColor: canProceed ? COLORS.ink : COLORS.hairline,
          color: canProceed ? COLORS.paper : COLORS.inkMuted,
          fontFamily: FONT_FAMILY.body,
          fontWeight: 500,
          cursor: canProceed ? "pointer" : "not-allowed",
        }}
      >
        Continue
      </button>
    </div>
  );
}
