import type { HttpClient } from "../http.ts";

export function createOrganizationsResource(_http: HttpClient) {
  return {};
}

export type OrganizationsResource = ReturnType<typeof createOrganizationsResource>;
