import { pingResponseSchema, type PingResponse } from "@futrob/api-contracts";
import type { HttpClient } from "../http.ts";

export function createMetaResource(http: HttpClient) {
  return {
    /**
     * Placeholder health check against GET /meta/ping (to be implemented on the server).
     */
    async ping(): Promise<PingResponse> {
      return http.request({
        path: "/meta/ping",
        method: "GET",
        parse: (data) => pingResponseSchema.parse(data),
      });
    },
  };
}

export type MetaResource = ReturnType<typeof createMetaResource>;
