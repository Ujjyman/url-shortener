import { z } from "zod";

export const createUrlSchema = z.object({
  destination: z.string().url(),
  customSlug: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9-_]{3,30}$/)
    .optional()
});
