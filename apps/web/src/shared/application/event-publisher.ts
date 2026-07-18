import type { DomainEvent } from "@/shared/domain/domain-event.ts";

export interface EventPublisherPort {
  publish(event: DomainEvent): Promise<void>;
  publishMany(events: readonly DomainEvent[]): Promise<void>;
}
