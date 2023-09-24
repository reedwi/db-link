import * as z from "zod"

export const recordSchema = z.object({
  connectionId: z.string().min(1),
  name: z.string().min(1).max(100),
  hubspotProperty: z.string().min(1).max(100),
  query: z.string().min(1).max(2000)
});
export type RecordFormValues = z.infer<typeof recordSchema>;
