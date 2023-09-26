import Link from "next/link"

import { DatabaseConnection } from "@/types"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { DatabaseOperations } from "./database-operations"


interface DatabaseItemProps {
  database: Pick<DatabaseConnection, "id" | "type" | "username" | "database_name" |"created_at" | "name">
}

export function DatabaseItem({ database }: DatabaseItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/databases/${database.id}`}
          className="font-semibold hover:underline"
        >
          {database.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {database.username}
          </p>
          <p className="text-sm text-muted-foreground">
            {database.type}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(database.created_at?.toString())}
          </p>
        </div>
      </div>
      <DatabaseOperations database={{ id: database.id, database_name: database.database_name }} />
    </div>
  )
}

DatabaseItem.Skeleton = function DatabaseItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}