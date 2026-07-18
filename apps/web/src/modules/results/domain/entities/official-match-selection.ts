import type { EncounterId } from "@/shared/domain/identifiers.ts";
import type { ExternalReference } from "@/modules/game-data";
import type { SelectionStatus } from "@/modules/results/domain/value-objects/selection-status.ts";

export interface OfficialSlotSelection {
  readonly officialSlot: 1 | 2;
  readonly providerMatchRef: ExternalReference;
}

export interface OfficialMatchSelection {
  readonly id: string;
  readonly encounterId: EncounterId;
  readonly status: SelectionStatus;
  readonly slots: readonly OfficialSlotSelection[];
  readonly proposedByActorId: string;
  readonly proposedAt: Date;
}
