const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, options: RequestInit & { authenticatedUserId: string }): Promise<T> {
  const { authenticatedUserId, headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      "X-Authenticated-User-Id": authenticatedUserId,
      ...headers,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const body = await response.text();
    throw new ApiError(response.status, `${response.status} ${response.statusText}: ${body}`);
  }
  return response.json() as Promise<T>;
}

export interface CreateCheckoutSessionInput {
  tier: "starter" | "homeowner_pro" | "investor";
  billing_interval: "month" | "year";
  success_url: string;
  cancel_url: string;
}

export async function createCheckoutSession(
  authenticatedUserId: string,
  input: CreateCheckoutSessionInput
): Promise<{ checkoutUrl: string }> {
  const result = await apiFetch<{ checkout_url: string }>("/checkout/create-session", {
    method: "POST",
    body: JSON.stringify(input),
    authenticatedUserId,
  });
  return { checkoutUrl: result.checkout_url };
}
