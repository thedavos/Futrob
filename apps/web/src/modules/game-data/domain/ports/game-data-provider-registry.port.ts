import type {
  GameDataProviderCapabilities,
  GameDataProviderPort,
} from "@/modules/game-data/domain/ports/game-data-provider.port.ts";
import type { GameDataProviderKey } from "@/modules/game-data/domain/value-objects/provider-key.ts";

export interface GameDataProviderRegistryPort {
  get(providerKey: GameDataProviderKey): GameDataProviderPort;
  findSupporting(capability: keyof GameDataProviderCapabilities): GameDataProviderPort[];
  list(): GameDataProviderPort[];
}
