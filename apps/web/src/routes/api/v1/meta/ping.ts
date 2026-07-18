import { createFileRoute } from "@tanstack/react-router";
import { pingResponseSchema } from "@futrob/api-contracts";
import { jsonResponse } from "@/shared/infrastructure/http/api-response.ts";

export const Route = createFileRoute("/api/v1/meta/ping")({
  server: {
    handlers: {
      GET: async () => {
        const body = pingResponseSchema.parse({
          ok: true,
          service: "futrob",
          apiVersion: "v1",
        });
        return jsonResponse(body);
      },
    },
  },
});
