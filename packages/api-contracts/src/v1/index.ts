export { apiErrorSchema, type ApiErrorBody } from "./errors.ts";
export { pingResponseSchema, type PingResponse } from "./meta/ping.response.ts";

/** Namespace placeholders — add competitions, encounters, results, teams as endpoints land. */
export const apiV1 = {
  version: "v1" as const,
};
