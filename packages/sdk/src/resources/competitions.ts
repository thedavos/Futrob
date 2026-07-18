import type { HttpClient } from "../http.ts";

/**
 * Stub resource — wire methods when `@futrob/api-contracts` v1 competitions schemas exist.
 */
export function createCompetitionsResource(_http: HttpClient) {
  return {
    // create, get, list, publish…
  };
}

export type CompetitionsResource = ReturnType<typeof createCompetitionsResource>;
