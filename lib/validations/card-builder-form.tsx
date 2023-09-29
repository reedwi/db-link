import * as z from "zod"


export const rowSchema = z.object({
  label: z.string().min(1),
  columnName: z.string().min(1),
  type: z.enum(["STRING", "STATUS", "NUMERIC", "CURRENCY", "DATE", "EMAIL"])
});

export const dynamicFormSchema = z.object({
  rows: z.array(rowSchema).max(10)
});


