import * as z from "zod"

const DatabaseTypeEnum = z.enum(["PostgreSQL", "MySQL", "SQL Server"])
export const databaseTypeOptions = DatabaseTypeEnum.options;
export type DatabaseTypeEnum = z.infer<typeof DatabaseTypeEnum>;
export const databaseConnectionSchema = z.object({
  type: DatabaseTypeEnum,
  name: z.string().min(1).max(100),
  username: z.string().min(1).max(100),
  databaseName: z.string().min(1).max(100),
  password: z.string().min(1).max(100),
  port: z.number().min(0),
  host: z.string().min(1).max(100)
});
export type DatabaseConnectionFormValues = z.infer<typeof databaseConnectionSchema>;
