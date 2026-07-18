import type { ProviderMatch } from "@/modules/game-data";
import type { EncounterId } from "@/shared/domain/identifiers.ts";

export interface ProviderMatchReaderPort {
  listCandidatesForEncounter(encounterId: EncounterId): Promise<ProviderMatch[]>;
}
