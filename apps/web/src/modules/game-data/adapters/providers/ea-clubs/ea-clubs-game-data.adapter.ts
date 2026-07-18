import { err, ok, type Result } from "@/shared/domain/result.ts";
import { domainError } from "@/shared/domain/domain-error.ts";
import type { ExternalClub } from "@/modules/game-data/domain/entities/external-club.ts";
import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type {
  GameDataProviderPort,
  GetExternalClubInput,
  GetRecentMatchesInput,
  ProviderError,
  SearchExternalClubsInput,
} from "@/modules/game-data/domain/ports/game-data-provider.port.ts";

/**
 * EA Clubs adapter — the only place that may know proclubs.ea.com shapes.
 * Implementation intentionally stubbed until HTTP client + schemas land.
 */
export class EaClubsGameDataAdapter implements GameDataProviderPort {
  readonly key = "ea-clubs" as const;

  readonly capabilities = {
    searchClubs: true,
    getClubInfo: true,
    getRecentMatches: true,
    getPlayerStats: true,
    getTeamStats: true,
  } as const;

  constructor(
    private readonly deps: {
      readonly fetcher: typeof fetch;
      readonly baseUrl: string;
      readonly timeoutMs: number;
    },
  ) {}

  async searchClubs(
    _input: SearchExternalClubsInput,
  ): Promise<Result<ExternalClub[], ProviderError>> {
    return err(
      domainError(
        "game_data.provider_not_implemented",
        "EaClubsGameDataAdapter.searchClubs is not implemented yet",
      ),
    );
  }

  async getClubInfo(_input: GetExternalClubInput): Promise<Result<ExternalClub, ProviderError>> {
    return err(
      domainError(
        "game_data.provider_not_implemented",
        "EaClubsGameDataAdapter.getClubInfo is not implemented yet",
      ),
    );
  }

  async getRecentMatches(
    _input: GetRecentMatchesInput,
  ): Promise<Result<ProviderMatch[], ProviderError>> {
    void this.deps;
    return ok([]);
  }
}
