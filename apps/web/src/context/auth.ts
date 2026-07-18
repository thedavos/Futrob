/**
 * Resolve Better Auth session → ActorId.
 * Implementation lands with identity module + Better Auth adapter.
 */
export async function requireAuthenticatedActor(): Promise<never> {
  throw new Error("auth: not implemented");
}
