import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
// import { PostItem } from "@/components/post-item"
import { DatabaseCreateButton } from "@/components/database-create-button";
import { DashboardShell } from "@/components/shell"
import { getHubspotPortalId } from "@/lib/supabaseAdmin";
// import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Dashboard",
}

export default async function DatabasePage() {
  const { userId } = await auth();

  if (!userId) {
    redirectToSignIn();
  }

  // Query for databases
  
  return (
    <DashboardShell>
      <DashboardHeader heading="Database Connections" text="View or Edit Database Connections">
        <DatabaseCreateButton />
      </DashboardHeader>
      {/* {propo?.length ? (
        <ProposalClient data={formattedProposals}/>
      ) : ( */}
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="database" />
            <EmptyPlaceholder.Title>No database connections yet</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t configured any database connections yet, let&apos;s add one!
            </EmptyPlaceholder.Description>
            <DatabaseCreateButton variant="outline" />
          </EmptyPlaceholder>
        {/* )} */}
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