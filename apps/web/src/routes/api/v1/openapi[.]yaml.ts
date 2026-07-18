import { createFileRoute } from "@tanstack/react-router";
import { getOpenApiYamlText } from "@futrob/api-contracts";
import { textResponse } from "@/shared/infrastructure/http/api-response.ts";

export const Route = createFileRoute("/api/v1/openapi.yaml")({
  server: {
    handlers: {
      GET: async () => textResponse(getOpenApiYamlText(), "application/yaml; charset=utf-8"),
    },
  },
});
