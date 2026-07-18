import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type { ProviderMatchRepository } from "@/modules/game-data/domain/ports/provider-match.repository.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export interface ListMatchesBetweenClubsInput {
  readonly providerKey: GameDataProviderKey;
  readonly homeExternalClubId: string;
  readonly awayExternalClubId: string;
  readonly from: Date;
  readonly to: Date;
}

export class ListMatchesBetweenClubsUseCase {
  constructor(private readonly providerMatches: ProviderMatchRepository) {}

  execute(input: ListMatchesBetweenClubsInput): Promise<ProviderMatch[]> {
    return this.providerMatches.listBetweenClubs(input);
  }
}
