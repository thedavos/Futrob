import { SelectOfficialMatchesUseCase } from "@/modules/results";
import type { EncounterReaderPort } from "@/modules/results";
import type { EventPublisherPort } from "@/shared/application/event-publisher.ts";

export interface ResultsModuleDependencies {
  readonly encounterReader: EncounterReaderPort;
  readonly eventPublisher: EventPublisherPort;
}

export function createResultsModule(deps: ResultsModuleDependencies) {
  return {
    selectOfficialMatches: new SelectOfficialMatchesUseCase({
      encounterReader: deps.encounterReader,
      eventPublisher: deps.eventPublisher,
    }),
  };
}

export type ResultsModule = ReturnType<typeof createResultsModule>;
