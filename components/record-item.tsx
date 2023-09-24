// "use client"

import Link from "next/link"

import { DatabaseConnection } from "@/types/supabase"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { RecordOperations } from "@/components/record-operations"
// import { usePathname } from "next/navigation"

interface Record {
  id: string
  name: string
  created_at: string
  databases: DatabaseConnection
}

interface RecordItemProps {
  record: Record
  recordType: string
}

export function RecordItem({ record, recordType }: RecordItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/${recordType}/${record.id}`}
          className="font-semibold hover:underline"
        >
          {record.name || "Unnamed Card"}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {record.databases?.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDate(record.created_at?.toString())}
          </p>
        </div>
      </div>
      <RecordOperations record={{ id: record.id }} recordType={recordType} />
    </div>
  )
}

RecordItem.Skeleton = function RecordItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}