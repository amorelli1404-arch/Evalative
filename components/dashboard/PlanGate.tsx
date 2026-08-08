"use client";

import Link from "next/link";
import { Show } from "@clerk/nextjs";
import { COLORS, FONT_FAMILY } from "../../lib/design-tokens";

export default function PlanGate({
  when,
  planLabel,
  children,
}: {
  when: (has: (check: { plan: string }) => boolean) => boolean;
  planLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Show
      when={when}
      fallback={
        <div className="w-full max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl mb-3" style={{ fontFamily: FONT_FAMILY.display, fontWeight: 600, color: COLORS.ink }}>
            {planLabel} plan required
          </h1>
          <p className="text-sm mb-6" style={{ fontFamily: FONT_FAMILY.body, color: COLORS.inkMuted }}>
            Subscribe to unlock this dashboard.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 rounded-sm text-sm font-medium"
            style={{ fontFamily: FONT_FAMILY.body, backgroundColor: COLORS.ink, color: "#FFFFFF" }}
          >
            View plans
          </Link>
        </div>
      }
    >
      {children}
    </Show>
  );
}
