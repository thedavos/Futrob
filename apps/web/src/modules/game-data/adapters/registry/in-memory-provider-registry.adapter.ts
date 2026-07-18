import type {
  GameDataProviderCapabilities,
  GameDataProviderPort,
} from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
import type { GameDataProviderRegistryPort } from "@/modules/game-data/domain/ports/game-data-provider-registry.port.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export class InMemoryGameDataProviderRegistry implements GameDataProviderRegistryPort {
  private readonly providers = new Map<GameDataProviderKey, GameDataProviderPort>();

  constructor(providers: readonly GameDataProviderPort[]) {
    for (const provider of providers) {
      this.providers.set(provider.key, provider);
    }
  }

  get(key: GameDataProviderKey): GameDataProviderPort {
    const provider = this.providers.get(key);
    if (!provider) {
      throw new Error(`Provider not registered: ${key}`);
    }
    return provider;
  }

  findSupporting(capability: keyof GameDataProviderCapabilities): GameDataProviderPort[] {
    return [...this.providers.values()].filter((provider) => provider.capabilities[capability]);
  }

  list(): GameDataProviderPort[] {
    return [...this.providers.values()];
  }
}
