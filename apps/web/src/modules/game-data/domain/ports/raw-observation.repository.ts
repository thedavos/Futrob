import type { RawProviderObservation } from "@/modules/game-data/domain/entities/raw-provider-observation.ts";

export interface RawObservationRepository {
  append(observation: RawProviderObservation): Promise<void>;
}
