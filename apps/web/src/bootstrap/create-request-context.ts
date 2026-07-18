import type { ActorId, OrganizationId } from "@/shared/domain/identifiers.ts";
import type { AppContext } from "@/bootstrap/create-app-context.ts";
import { createModules, type AppModules } from "@/di/create-modules.ts";
import type { EventPublisherPort } from "@/shared/application/event-publisher.ts";
import type { EncounterReaderPort } from "@/modules/results";
import type { ProviderMatchRepository } from "@/modules/game-data";

export interface RequestIdentity {
  readonly actorId: ActorId;
  readonly organizationId: OrganizationId;
}

export interface RequestContext {
  readonly app: AppContext;
  readonly identity: RequestIdentity;
  readonly modules: AppModules;
}

/** Temporary no-op publisher until outbox/queue adapter exists. */
class NoopEventPublisher implements EventPublisherPort {
  async publish(): Promise<void> {}
  async publishMany(): Promise<void> {}
}

class UnimplementedEncounterReader implements EncounterReaderPort {
  async getById() {
    return null;
  }
}

class UnimplementedProviderMatchRepository implements ProviderMatchRepository {
  async upsertMany(): Promise<void> {}
  async listBetweenClubs() {
    return [];
  }
}

export function createRequestContext(input: {
  readonly app: AppContext;
  readonly identity: RequestIdentity;
  readonly fetcher?: typeof fetch;
}): RequestContext {
  const modules = createModules({
    config: input.app.config,
    fetcher: input.fetcher ?? fetch,
    eventPublisher: new NoopEventPublisher(),
    encounterReader: new UnimplementedEncounterReader(),
    providerMatches: new UnimplementedProviderMatchRepository(),
  });

  return {
    app: input.app,
    identity: input.identity,
    modules,
  };
}
