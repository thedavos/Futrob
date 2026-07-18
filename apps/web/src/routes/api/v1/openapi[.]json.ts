import { createFileRoute } from "@tanstack/react-router";
import { getOpenApiJsonText } from "@futrob/api-contracts";
import { textResponse } from "@/shared/infrastructure/http/api-response.ts";

export const Route = createFileRoute("/api/v1/openapi.json")({
  server: {
    handlers: {
      GET: async () => textResponse(getOpenApiJsonText(), "application/json; charset=utf-8"),
    },
  },
});
