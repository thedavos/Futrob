import { z } from "zod";

export const pingResponseSchema = z.object({
  ok: z.literal(true),
  service: z.literal("futrob"),
  apiVersion: z.literal("v1"),
});

export type PingResponse = z.infer<typeof pingResponseSchema>;
