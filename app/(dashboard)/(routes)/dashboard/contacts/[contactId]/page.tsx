
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { getAllConnections, getHubspotPortalId, getRecord } from "@/lib/supabase-admin";
import { RecordForm } from "@/components/record-form";
import { Separator } from "@/components/ui/separator";
import { MiniHeader } from "@/components/mini-header";
import { QueryTestDataTable } from "@/components/query-test-data-table";
import { useState } from "react";
import { RecordConfiguration } from "@/components/record-configuration";

export const metadata = {
  title: "Contact Card Configuration",
}

export default async function ContactPage({
  params
}:{
    params: { contactId: string }
  }) {

    const { userId } = await auth();

    if (!userId) {
      redirectToSignIn();
    }

    const portalId = await getHubspotPortalId(userId!);

    const record = await getRecord('contacts', params.contactId)

    const formatRecord = (record: any) => {
      return {
        name: record.name || "",
        hubspotProperty: record.hubspot_property || "",
        connectionId: record.database_id || "",
        query: record.query || "",
        columnMap: record.column_map || {}
        // ... (add any other fields if necessary)
      };
    }

    const formattedRecord = formatRecord(record);
    
    const databaseConnections = await getAllConnections('databases', portalId);

  return (
    <DashboardShell>
      <DashboardHeader heading="Contact Card" text="Manage your contact card" />
      {/* <RecordConfiguration formattedRecord={formattedRecord} connections={databaseConnections} portalId={portalId} id={params.contactId}/> */}
      <RecordForm initialData={formattedRecord} connections={databaseConnections} portalId={portalId} id={params.contactId}/>
      <Separator />
      <MiniHeader heading="Test Query" text="Run a test query so we can ensure we get data and can further configure"/>
      <QueryTestDataTable record={formattedRecord} />

    </DashboardShell>
  )
}
