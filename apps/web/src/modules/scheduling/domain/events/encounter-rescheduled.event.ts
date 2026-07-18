import type { DomainEvent } from "@/shared/domain/domain-event.ts";
import type { RescheduleScope } from "@/modules/scheduling/domain/value-objects/reschedule-scope.ts";

export type EncounterRescheduledEvent = DomainEvent<
  "scheduling.encounter-rescheduled",
  {
    readonly encounterId: string;
    readonly previousStartAt: string;
    readonly newStartAt: string;
    readonly scope: RescheduleScope;
    readonly approvedBy: string;
  }
>;
