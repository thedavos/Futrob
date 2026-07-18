import { z } from "zod";

export const apiErrorSchema = z.object({
  code: z.string(),
  messageKey: z.string(),
  requestId: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type ApiErrorBody = z.infer<typeof apiErrorSchema>;
