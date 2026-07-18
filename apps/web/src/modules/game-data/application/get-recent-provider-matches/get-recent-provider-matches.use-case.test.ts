import { describe, expect, it } from "vite-plus/test";
import { ok } from "@/shared/domain/result.ts";
import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type { GameDataProviderPort } from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
import type { GameDataProviderRegistryPort } from "@/modules/game-data/domain/ports/game-data-provider-registry.port.ts";
import { GetRecentProviderMatchesUseCase } from "@/modules/game-data/application/get-recent-provider-matches/get-recent-provider-matches.use-case.ts";

describe("GetRecentProviderMatchesUseCase", () => {
  it("delegates to the registry provider", async () => {
    const match = {
      id: "ea-clubs:1",
      provider: { key: "ea-clubs" as const, externalMatchId: "1" },
      game: { edition: "fc26", platform: "common-gen5", mode: "friendlyMatch" },
      occurredAt: new Date(0),
      home: { externalClubId: "1", name: "A", goals: 1 },
      away: { externalClubId: "2", name: "B", goals: 0 },
      players: [],
      metadata: {
        durationSeconds: null,
        wasDisconnected: false,
        winnerByForfeit: false,
        completeness: "complete" as const,
      },
    } satisfies ProviderMatch;

    const provider: GameDataProviderPort = {
      key: "ea-clubs",
      capabilities: {
        searchClubs: true,
        getClubInfo: true,
        getRecentMatches: true,
        getPlayerStats: false,
        getTeamStats: false,
      },
      searchClubs: async () => ok([]),
      getClubInfo: async () => {
        throw new Error("unused");
      },
      getRecentMatches: async () => ok([match]),
    };

    const registry: GameDataProviderRegistryPort = {
      get: () => provider,
      findSupporting: () => [provider],
      list: () => [provider],
    };

    const useCase = new GetRecentProviderMatchesUseCase(registry);
    const result = await useCase.execute("ea-clubs", {
      externalClubId: "1",
      platform: "common-gen5",
      gameEdition: "fc26",
      matchType: "friendlyMatch",
      maxResultCount: 10,
    });

    expect(result).toEqual(ok([match]));
  });
});
