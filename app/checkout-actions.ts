"use server";

import { createCheckoutSession } from "../lib/api";

async function getAuthenticatedUserId(): Promise<string> {
  throw new Error(
    "getAuthenticatedUserId() is not implemented -- wire this to your Clerk server-side " +
      "session verification before checkout can run for a real user."
  );
}

export async function startCheckout(
  tier: "starter" | "homeowner_pro" | "investor",
  billingInterval: "month" | "year"
): Promise<{ checkoutUrl: string }> {
  const userId = await getAuthenticatedUserId();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return createCheckoutSession(userId, {
    tier,
    billing_interval: billingInterval,
    success_url: `${siteUrl}/checkout/success`,
    cancel_url: `${siteUrl}/pricing`,
  });
}
