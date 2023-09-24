import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
// import { PostItem } from "@/components/post-item"
import { DatabaseCreateButton } from "./components/database-create-button";
import { DashboardShell } from "@/components/shell"
import { getAllConnections, getHubspotPortalId } from "@/lib/supabase-admin";
import axios from "axios";
import { DatabaseItem } from "./components/database-item";
// import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Database Connections",
}

export default async function DatabasePage() {
  const { userId } = auth();

  const hubspotPortalId = await getHubspotPortalId(userId!);
  // Query for databases
  const databaseRecords = await getAllConnections('databases', hubspotPortalId);

  return (
    <DashboardShell>
      <DashboardHeader heading="Database Connections" text="View, create, edit or delete Database Connections">
        <DatabaseCreateButton portalId={hubspotPortalId}/>
      </DashboardHeader>
      {databaseRecords?.length ? (
          <div className="divide-y divide-border rounded-md border">
          {databaseRecords.map((db) => (
            <DatabaseItem key={db.id} database={db} />
          ))}
        </div>
      ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="database" />
            <EmptyPlaceholder.Title>No database connections yet</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t configured any database connections yet, let&apos;s add one!
            </EmptyPlaceholder.Description>
            <DatabaseCreateButton variant="outline" portalId={hubspotPortalId}/>
          </EmptyPlaceholder>
        )} 
    </DashboardShell>
  )
}



{/* <div>
{proposals?.length ? (
  <div className="divide-y divide-border rounded-md border">
    {proposals.map((proposal) => (
      <ProposalItem key={proposal.id} proposal={proposal} />
    ))}
  </div>
) */}