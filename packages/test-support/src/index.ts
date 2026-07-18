/**
 * Shared test helpers. Add builders/fakes as cross-workspace suites appear.
 */

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}
