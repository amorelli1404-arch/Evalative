"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createCheckoutSession } from "../lib/api";

export async function startCheckout(
  tier: "starter" | "homeowner_pro" | "investor",
  billingInterval: "month" | "year"
): Promise<{ checkoutUrl: string }> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-up");
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return createCheckoutSession(userId, {
    tier,
    billing_interval: billingInterval,
    success_url: `${siteUrl}/checkout/success`,
    cancel_url: `${siteUrl}/pricing`,
  });
}
