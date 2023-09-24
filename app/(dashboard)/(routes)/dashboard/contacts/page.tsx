// import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { getAllRecords, getHubspotPortalId } from "@/lib/supabase-admin";
import { RecordItem } from "@/components/record-item";
import { RecordCreateButton } from "@/components/record-create-button";

export const metadata = {
  title: "Contacts Configuration",
}


export default async function ContactsPage() {
  const { userId } = auth();

  const hubspotPortalId = await getHubspotPortalId(userId!);
  // Query for databases
  const records = await getAllRecords('contacts', hubspotPortalId);
  console.log(records)

  return (
    <DashboardShell>
      <DashboardHeader heading="Contact Cards" text="Manage your contact cards">
        <RecordCreateButton portalId={hubspotPortalId} recordType="contacts"/>
      </DashboardHeader>
      {records?.length ? (
          <div className="divide-y divide-border rounded-md border">
          {records.map((record) => (
            <RecordItem key={record.id} record={record} recordType="contacts"/>
          ))}
        </div>
      ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="user" />
            <EmptyPlaceholder.Title>No cards yet</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t configured any card connections yet, let&apos;s add one!
            </EmptyPlaceholder.Description>
            <RecordCreateButton variant="outline" portalId={hubspotPortalId} recordType="contacts"/>
          </EmptyPlaceholder>
        )} 
    </DashboardShell>
  )
}
