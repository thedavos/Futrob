/**
 * Check Futrob permission for organization/competition/team scope.
 */
export async function requirePermission(_permission: string): Promise<never> {
  throw new Error("permissions: not implemented");
}
