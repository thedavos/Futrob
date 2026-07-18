import type { HttpClient } from "../http.ts";

export function createEncountersResource(_http: HttpClient) {
  return {};
}

export type EncountersResource = ReturnType<typeof createEncountersResource>;
