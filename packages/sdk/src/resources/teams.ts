import type { HttpClient } from "../http.ts";

export function createTeamsResource(_http: HttpClient) {
  return {};
}

export type TeamsResource = ReturnType<typeof createTeamsResource>;
