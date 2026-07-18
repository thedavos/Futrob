import type { HttpClient } from "../http.ts";

export function createResultsResource(_http: HttpClient) {
  return {};
}

export type ResultsResource = ReturnType<typeof createResultsResource>;
