import { HttpClient, type HttpClientOptions } from "./http.ts";
import { createCompetitionsResource } from "./resources/competitions.ts";
import { createEncountersResource } from "./resources/encounters.ts";
import { createMetaResource } from "./resources/meta.ts";
import { createOrganizationsResource } from "./resources/organizations.ts";
import { createResultsResource } from "./resources/results.ts";
import { createTeamsResource } from "./resources/teams.ts";

export type CreateFutrobClientOptions = HttpClientOptions;

export function createFutrobClient(options: CreateFutrobClientOptions) {
  const http = new HttpClient(options);

  return {
    meta: createMetaResource(http),
    organizations: createOrganizationsResource(http),
    competitions: createCompetitionsResource(http),
    teams: createTeamsResource(http),
    encounters: createEncountersResource(http),
    results: createResultsResource(http),
  };
}

export type FutrobClient = ReturnType<typeof createFutrobClient>;
