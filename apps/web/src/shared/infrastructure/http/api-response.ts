import type { ApiErrorBody } from "@futrob/api-contracts";
import type { DomainError } from "@/shared/domain/domain-error.ts";

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export function textResponse(body: string, contentType: string, status = 200): Response {
  return new Response(body, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store",
    },
  });
}

export function apiErrorResponse(status: number, body: ApiErrorBody): Response {
  return jsonResponse(body, status);
}

export function domainErrorToHttp(error: DomainError): Response {
  const status = statusForDomainCode(error.code);
  return apiErrorResponse(status, {
    code: error.code,
    messageKey: `errors.${error.code}`,
    details: error.details,
  });
}

function statusForDomainCode(code: string): number {
  if (code.includes("not_found")) {
    return 404;
  }
  if (code.includes("schema") || code.includes("unsupported") || code.includes("validation")) {
    return 400;
  }
  if (code.includes("timeout") || code.includes("http_error") || code.includes("network")) {
    return 502;
  }
  return 500;
}

export function queryRecord(url: URL): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of url.searchParams.entries()) {
    out[key] = value;
  }
  return out;
}
