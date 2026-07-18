/**
 * Resolve active organization membership for the current request context.
 */
export async function requireActiveOrganization(): Promise<never> {
  throw new Error("organization: not implemented");
}
