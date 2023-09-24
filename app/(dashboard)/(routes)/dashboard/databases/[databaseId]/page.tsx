

import { redirect } from "next/navigation"

import { auth, redirectToSignIn } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { DatabaseForm } from "../components/database-form";
import { getHubspotPortalId, getRecord } from "@/lib/supabase-admin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatabaseConnectionTestCard } from "../components/database-connection-test-card";

export const metadata = {
  title: "Individual Database Connection",
  description: "Manage specific database connection",
}

export default async function DatabaseEditorPage({
  params
}: {
  params: { databaseId: string }
}) {
  const { userId } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  const portalId = await getHubspotPortalId(userId!);

  const databaseRecord = await getRecord('decrypted_databases', params.databaseId)
  let formattedRecord = databaseRecord;
  formattedRecord.password = databaseRecord.decrypted_password;
  formattedRecord.databaseName = databaseRecord.database_name;


  return (
    <DashboardShell>
      <DashboardHeader
        heading="Database Connection"
        text="Manage your individual database connection."
      />
      <div className="grid gap-10">
        <DatabaseForm initialData={formattedRecord} portalId={portalId} create={false} id={params.databaseId}/>
      </div>
      <Separator />
      <div className="grid gap-10">
        <DatabaseConnectionTestCard database={databaseRecord}/>
      </div>
    </DashboardShell>
  )
}