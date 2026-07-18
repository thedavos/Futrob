import {
  getClubMatchesQuerySchema,
  getClubMatchesResponseSchema,
  getClubQuerySchema,
  getClubResponseSchema,
  searchClubsQuerySchema,
  searchClubsResponseSchema,
  type GetClubMatchesQueryInput,
  type GetClubMatchesResponse,
  type GetClubQueryInput,
  type GetClubResponse,
  type SearchClubsQueryInput,
  type SearchClubsResponse,
} from "@futrob/api-contracts";
import type { HttpClient } from "../http.ts";

function toQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function createGameDataResource(http: HttpClient) {
  return {
    clubs: {
      async search(input: SearchClubsQueryInput): Promise<SearchClubsResponse> {
        const query = searchClubsQuerySchema.parse(input);
        return http.request({
          path: `/game-data/clubs/search${toQuery(query)}`,
          method: "GET",
          parse: (data) => searchClubsResponseSchema.parse(data),
        });
      },

      async retrieve(
        externalClubId: string,
        input: GetClubQueryInput = {},
      ): Promise<GetClubResponse> {
        const query = getClubQuerySchema.parse(input);
        return http.request({
          path: `/game-data/clubs/${encodeURIComponent(externalClubId)}${toQuery(query)}`,
          method: "GET",
          parse: (data) => getClubResponseSchema.parse(data),
        });
      },

      async matches(
        externalClubId: string,
        input: GetClubMatchesQueryInput = {},
      ): Promise<GetClubMatchesResponse> {
        const query = getClubMatchesQuerySchema.parse(input);
        return http.request({
          path: `/game-data/clubs/${encodeURIComponent(externalClubId)}/matches${toQuery(query)}`,
          method: "GET",
          parse: (data) => getClubMatchesResponseSchema.parse(data),
        });
      },
    },
  };
}

export type GameDataResource = ReturnType<typeof createGameDataResource>;
