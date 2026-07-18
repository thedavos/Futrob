import type { Result } from "@/shared/domain/result.ts";
import type { ExternalClub } from "@/modules/game-data/domain/entities/external-club.ts";
import type { GameDataProviderRegistryPort } from "@/modules/game-data/domain/ports/game-data-provider-registry.port.ts";
import type {
  ProviderError,
  SearchExternalClubsInput,
} from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export class SearchExternalClubsUseCase {
  constructor(private readonly registry: GameDataProviderRegistryPort) {}

  execute(
    providerKey: GameDataProviderKey,
    input: SearchExternalClubsInput,
  ): Promise<Result<ExternalClub[], ProviderError>> {
    const provider = this.registry.get(providerKey);
    return provider.searchClubs(input);
  }
}
