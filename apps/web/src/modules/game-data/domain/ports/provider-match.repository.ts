import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export interface ProviderMatchRepository {
  upsertMany(matches: readonly ProviderMatch[]): Promise<void>;

  listBetweenClubs(input: {
    readonly providerKey: GameDataProviderKey;
    readonly homeExternalClubId: string;
    readonly awayExternalClubId: string;
    readonly from: Date;
    readonly to: Date;
  }): Promise<ProviderMatch[]>;
}
