/**
 * lib/api.ts
 *
 * Thin, typed fetch layer over the FastAPI backend. Every function here
 * returns data already shaped to match lib/types.ts -- components never
 * call fetch() directly, so there is exactly one place that knows the
 * backend's URL structure and one place to add auth headers, error
 * handling, or retry logic later.
 *
 * AUTH NOTE: routes/evaluations.py and routes/properties.py currently
 * expect an X-Authenticated-User-Id header, which in the real system
 * should be set by server-side auth middleware after verifying a Clerk
 * session token -- NOT read from client-side state. The functions below
 * are written as server-side callable (e.g. from a Next.js Server
 * Component or Route Handler that has access to the verified Clerk
 * session), which is the correct place for that header to be attached.
 */

import type {
  ComparableSale,
  ConditionSurveyAnswers,
  EvaluationOutput,
  FormattedCard,
  ScenarioType,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit & { authenticatedUserId: string }
): Promise<T> {
  const { authenticatedUserId, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      "X-Authenticated-User-Id": authenticatedUserId,
      ...headers,
    },
    cache: "no-store", // evaluation/property data is per-user and changes frequently -- never let Next.js cache these across users
  });

  if (!response.ok) {
    const body = await response.text();
    throw new ApiError(response.status, `${response.status} ${response.statusText}: ${body}`);
  }

  return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export interface CreatePropertyInput {
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface PropertySummary {
  id: string;
  address_line1: string;
  city: string;
  state: string;
  zip_code: string;
  data_sync_status: "pending" | "synced" | "partial" | "failed" | "stale";
  primary_goal: string;
}

export async function createProperty(
  authenticatedUserId: string,
  input: CreatePropertyInput
): Promise<PropertySummary> {
  return apiFetch<PropertySummary>("/properties", {
    method: "POST",
    body: JSON.stringify(input),
    authenticatedUserId,
  });
}

export async function submitConditionSurvey(
  authenticatedUserId: string,
  propertyId: string,
  answers: ConditionSurveyAnswers
): Promise<PropertySummary> {
  return apiFetch<PropertySummary>(`/properties/${propertyId}/condition-survey`, {
    method: "PATCH",
    body: JSON.stringify(answers),
    authenticatedUserId,
  });
}

export async function getProperty(
  authenticatedUserId: string,
  propertyId: string
): Promise<PropertySummary> {
  return apiFetch<PropertySummary>(`/properties/${propertyId}`, {
    method: "GET",
    authenticatedUserId,
  });
}

/**
 * Polls the property's data_sync_status until it reaches a terminal state
 * ('synced' or 'failed'), or the timeout elapses. Intended to be called
 * from a client component right after createProperty(), to drive a
 * "syncing your property..." loading state in the onboarding flow before
 * the first evaluation can be requested.
 */
export async function pollUntilSynced(
  authenticatedUserId: string,
  propertyId: string,
  options: { intervalMs?: number; timeoutMs?: number } = {}
): Promise<PropertySummary> {
  const intervalMs = options.intervalMs ?? 3000;
  const timeoutMs = options.timeoutMs ?? 60000;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const property = await getProperty(authenticatedUserId, propertyId);
    if (property.data_sync_status === "synced" || property.data_sync_status === "failed") {
      return property;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new ApiError(408, `Property ${propertyId} did not finish syncing within ${timeoutMs}ms.`);
}

// ---------------------------------------------------------------------------
// Evaluations
// ---------------------------------------------------------------------------

export interface RunEvaluationInput {
  scenario_type: ScenarioType;
  renovation_category?: string;
  renovation_budget_override?: number;
  assumed_monthly_rent_override?: number;
  holding_period_years_override?: number;
}

export interface EvaluationResult {
  evaluation_id: string;
  evaluation: EvaluationOutput;
  card: FormattedCard;
}

/**
 * Runs a new evaluation and returns both the raw calculation
 * (EvaluationOutput, for Layer 2/3 rendering) and the AI-formatted card
 * (FormattedCard, for Layer 1 rendering). The backend response is a flat
 * object mixing both shapes (see routes/evaluations.py's
 * EvaluationResponse) -- this function reshapes it into the two-object
 * form the frontend components expect, so that reshaping logic lives in
 * exactly one place rather than being duplicated in every component that
 * calls this.
 */
export async function runEvaluation(
  authenticatedUserId: string,
  propertyId: string,
  input: RunEvaluationInput
): Promise<EvaluationResult> {
  const raw = await apiFetch<Record<string, unknown>>(`/properties/${propertyId}/evaluations`, {
    method: "POST",
    body: JSON.stringify(input),
    authenticatedUserId,
  });

  const evaluation: EvaluationOutput = {
    scenario_type: raw.scenario_type as ScenarioType,
    verdict: raw.verdict as EvaluationOutput["verdict"],
    confidence_score: Number(raw.confidence_score),
    roi_percent: raw.roi_percent !== null ? Number(raw.roi_percent) : null,
    cost_estimate: raw.cost_estimate !== null ? Number(raw.cost_estimate) : null,
    value_added: raw.value_added !== null ? Number(raw.value_added) : null,
    key_driver: raw.key_driver as string,
    data_freshness_days: raw.data_freshness_days as number,
    breakeven_years: raw.breakeven_years !== null ? Number(raw.breakeven_years) : null,
    projected_value_at_holding_period:
      raw.projected_value_at_holding_period !== null ? Number(raw.projected_value_at_holding_period) : null,
    calculation_version: raw.calculation_version as string,
  };

  const card = raw.card as FormattedCard;

  return {
    evaluation_id: raw.evaluation_id as string,
    evaluation,
    card,
  };
}

// ---------------------------------------------------------------------------
// Comparable sales
// ---------------------------------------------------------------------------

/**
 * NOTE: no backend route for this exists yet in what's been built so far
 * -- routes/evaluations.py computes and persists the evaluation but does
 * not yet expose the underlying comps list used by the AVM as its own
 * endpoint. This function is written against the shape DeepDiveBreakdown.tsx
 * expects, so the frontend integration is ready the moment a
 * GET /properties/{id}/comparable-sales route is added -- until then,
 * calling this will 404, and DeepDiveBreakdown should be passed an empty
 * array rather than calling this function.
 */
export async function getComparableSales(
  authenticatedUserId: string,
  propertyId: string
): Promise<ComparableSale[]> {
  return apiFetch<ComparableSale[]>(`/properties/${propertyId}/comparable-sales`, {
    method: "GET",
    authenticatedUserId,
  });
}
