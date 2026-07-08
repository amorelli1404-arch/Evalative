"use server";

/**
 * app/properties/[propertyId]/actions.ts
 *
 * Server Actions run on the server, where it's safe to attach the
 * X-Authenticated-User-Id header from a verified session -- this is why
 * RawConfigPanel's override submission goes through a Server Action rather
 * than a direct client-side fetch to the FastAPI backend, which would
 * require exposing user identity handling to the browser.
 */

import { revalidatePath } from "next/cache";
import { runEvaluation, type RunEvaluationInput, type EvaluationResult } from "../../../lib/api";
import type { ScenarioType } from "../../../lib/types";

/**
 * AUTH NOTE: getAuthenticatedUserId() below is a placeholder for wherever
 * your Clerk server-side session verification lives (e.g. Clerk's own
 * `auth()` helper from `@clerk/nextjs/server`). It is written as its own
 * function specifically so swapping in real Clerk verification means
 * changing one function body, not every call site in this file.
 */
async function getAuthenticatedUserId(): Promise<string> {
  throw new Error(
    "getAuthenticatedUserId() is not implemented -- wire this to your Clerk server-side " +
      "session verification (e.g. `const { userId } = auth()` from '@clerk/nextjs/server') " +
      "before this action can run against a real user."
  );
}

export async function recalculateEvaluation(
  propertyId: string,
  scenarioType: ScenarioType,
  overrides: {
    renovation_category?: string;
    renovation_budget_override?: number;
    assumed_monthly_rent_override?: number;
    holding_period_years_override?: number;
  }
): Promise<EvaluationResult> {
  const userId = await getAuthenticatedUserId();

  const input: RunEvaluationInput = {
    scenario_type: scenarioType,
    ...overrides,
  };

  const result = await runEvaluation(userId, propertyId, input);

  // Invalidates the Next.js cache for this property's page so the next
  // navigation/refresh reflects the new evaluation -- necessary because
  // the initial page load (page.tsx) is a Server Component that fetched
  // data at request time, and Server Actions don't automatically refresh
  // the page that invoked them.
  revalidatePath(`/properties/${propertyId}`);

  return result;
}

export async function runNewScenario(
  propertyId: string,
  scenarioType: ScenarioType
): Promise<EvaluationResult> {
  const userId = await getAuthenticatedUserId();
  const result = await runEvaluation(userId, propertyId, { scenario_type: scenarioType });
  revalidatePath(`/properties/${propertyId}`);
  return result;
}
