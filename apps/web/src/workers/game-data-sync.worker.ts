/**
 * Queue consumer: sync provider matches for an encounter window.
 * Invokes game-data application use cases via job composition root.
 */
export async function handleGameDataSyncJob(_message: unknown): Promise<void> {
  throw new Error("game-data-sync.worker: not implemented");
}
