import * as z from "zod"


export const rowSchema = z.object({
  label: z.string().min(1),
  columnName: z.string().min(1),
  type: z.string().min(1) // or z.enum(["type1", "type2", ...]) if you have specific type values
});

export const dynamicFormSchema = z.object({
  rows: z.array(rowSchema).max(10)
});

