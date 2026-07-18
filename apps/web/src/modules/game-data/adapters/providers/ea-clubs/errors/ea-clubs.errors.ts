import { domainError, type DomainError } from "@/shared/domain/domain-error.ts";

export type EaClubsHttpError = DomainError;

export function eaClubsHttpError(
  code: string,
  message: string,
  details?: Readonly<Record<string, unknown>>,
): EaClubsHttpError {
  return domainError(code, message, details);
}
