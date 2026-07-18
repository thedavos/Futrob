import type { CompetitionId, EncounterId, TeamId } from "@/shared/domain/identifiers.ts";

export interface OfficialMatchSlot {
  readonly slotNumber: 1 | 2;
  readonly scheduledStartAt: Date;
  readonly status: "scheduled" | "completed" | "voided";
}

export interface Encounter {
  readonly id: EncounterId;
  readonly competitionId: CompetitionId;
  readonly roundId: string;
  readonly homeTeamId: TeamId;
  readonly awayTeamId: TeamId;
  readonly scheduledStartAt: Date;
  readonly slots: readonly OfficialMatchSlot[];
}
