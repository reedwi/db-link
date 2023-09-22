import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
// import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import { getHubspotPortalId } from "@/lib/supabaseAdmin";
// import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirectToSignIn();
  }


  const portalId = getHubspotPortalId(userId!);

  if (portalId === null) {
    // show install hubspot app
  }
  
  return (
    <DashboardShell>
      <DashboardHeader heading="HubSpot db Link" text="Get setup with db Link">
        {/* <ProposalCreateButton /> */}
      </DashboardHeader>
      {/* {propo?.length ? (
        <ProposalClient data={formattedProposals}/>
      ) : ( */}
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No proposals generated</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t installed the HubSpot app yet. Let&apos;s start there!
            </EmptyPlaceholder.Description>
            {/* <ProposalCreateButton variant="outline" /> */}
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