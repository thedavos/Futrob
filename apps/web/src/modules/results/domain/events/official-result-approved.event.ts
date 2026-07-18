import type { DomainEvent } from "@/shared/domain/domain-event.ts";

export type OfficialResultApprovedEvent = DomainEvent<
  "results.official-result-approved",
  {
    readonly encounterId: string;
    readonly organizationId: string;
    readonly competitionId: string;
    readonly approvedBy: string;
  }
>;
