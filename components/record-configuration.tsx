
"use client"

import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { getAllConnections, getHubspotPortalId, getRecord } from "@/lib/supabase-admin";
import { RecordForm } from "@/components/record-form";
import { Separator } from "@/components/ui/separator";
import { MiniHeader } from "@/components/mini-header";
import { QueryTestDataTable } from "@/components/query-test-data-table";
import { DatabaseConnection } from "@/types";
import { useState } from "react";
import { GenericRecord } from "@/types";


interface RecordConfigurationProps {
  formattedRecord?: any; 
  id?: string;
  portalId?: any;
  connections: Array<DatabaseConnection>;
}

export const RecordConfiguration: React.FC<RecordConfigurationProps> = ({
  formattedRecord,
  id,
  portalId,
  connections
}) => {

  const [recordData, setRecordData] = useState(formattedRecord);
  const handleRecordUpdate = (updatedRecord: GenericRecord) => {
    setRecordData(updatedRecord);
  };

  return (
    <>
      <RecordForm initialData={recordData} connections={connections} portalId={portalId} id={id} onUpdate={handleRecordUpdate}/>
      <Separator />
      <MiniHeader heading="Test Query" text="Run a test query so we can ensure we get data and can further configure"/>
      <QueryTestDataTable record={recordData} />
    </>
  )
}
