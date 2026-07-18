import type { Result } from "@/shared/domain/result.ts";
import type { ProviderMatch } from "@/modules/game-data/domain/entities/provider-match.ts";
import type { GameDataProviderRegistryPort } from "@/modules/game-data/domain/ports/game-data-provider-registry.port.ts";
import type {
  GetRecentMatchesInput,
  ProviderError,
} from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export class GetRecentProviderMatchesUseCase {
  constructor(private readonly registry: GameDataProviderRegistryPort) {}

  execute(
    providerKey: GameDataProviderKey,
    input: GetRecentMatchesInput,
  ): Promise<Result<ProviderMatch[], ProviderError>> {
    const provider = this.registry.get(providerKey);
    return provider.getRecentMatches(input);
  }
}
