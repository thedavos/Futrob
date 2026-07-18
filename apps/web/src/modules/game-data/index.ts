export type { ExternalClub } from "@/modules/game-data/domain/entities/external-club.ts";
export type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
export type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";
export type { ExternalReference } from "@/modules/game-data/domain/value-objects/external-reference.ts";
export type { GameDataProviderPort } from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
export type { GameDataProviderRegistryPort } from "@/modules/game-data/domain/ports/game-data-provider-registry.port.ts";
export type { ProviderMatchRepository } from "@/modules/game-data/domain/ports/provider-match.repository.ts";

export { ListMatchesBetweenClubsUseCase } from "@/modules/game-data/application/list-matches-between-clubs/list-matches-between-clubs.use-case.ts";
export { SearchExternalClubsUseCase } from "@/modules/game-data/application/search-external-clubs/search-external-clubs.use-case.ts";
export { GetExternalClubUseCase } from "@/modules/game-data/application/get-external-club/get-external-club.use-case.ts";
export { GetRecentProviderMatchesUseCase } from "@/modules/game-data/application/get-recent-provider-matches/get-recent-provider-matches.use-case.ts";
