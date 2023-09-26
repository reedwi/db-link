import { DashboardHeader } from "@/components/header"
import { RecordItem } from "@/components/record-item"
import { RecordCreateButton } from "@/components/record-create-button"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Contact Cards" text="Manage your contact cards">
      {/* <RecordCreateButton portalId={hubspotPortalId} recordType="contacts"/> */}
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <RecordItem.Skeleton />
        <RecordItem.Skeleton />
        <RecordItem.Skeleton />
        <RecordItem.Skeleton />
        <RecordItem.Skeleton />
      </div>
    </DashboardShell>
  )
}