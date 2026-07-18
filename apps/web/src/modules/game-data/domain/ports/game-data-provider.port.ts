import type { Result } from "@/shared/domain/result.ts";
import type { DomainError } from "@/shared/domain/domain-error.ts";
import type { ExternalClub } from "@/modules/game-data/domain/entities/external-club.ts";
import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export interface GameDataProviderCapabilities {
  readonly searchClubs: boolean;
  readonly getClubInfo: boolean;
  readonly getRecentMatches: boolean;
  readonly getPlayerStats: boolean;
  readonly getTeamStats: boolean;
}

export interface SearchExternalClubsInput {
  readonly query: string;
  readonly platform: string;
  readonly gameEdition: string;
}

export interface GetExternalClubInput {
  readonly externalClubId: string;
  readonly platform: string;
  readonly gameEdition: string;
}

export interface GetRecentMatchesInput {
  readonly externalClubId: string;
  readonly platform: string;
  readonly gameEdition: string;
  readonly matchType: string;
  readonly maxResultCount: number;
}

export type ProviderError = DomainError;

export interface GameDataProviderPort {
  readonly key: GameDataProviderKey;
  readonly capabilities: GameDataProviderCapabilities;

  searchClubs(input: SearchExternalClubsInput): Promise<Result<ExternalClub[], ProviderError>>;

  getClubInfo(input: GetExternalClubInput): Promise<Result<ExternalClub, ProviderError>>;

  getRecentMatches(input: GetRecentMatchesInput): Promise<Result<ProviderMatch[], ProviderError>>;
}
