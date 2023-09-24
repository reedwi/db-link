import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
// import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import { getHubspotPortalId } from "@/lib/supabase-admin";
import { Button } from "@/components/ui/button";
// import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirectToSignIn();
  }


  const portalId = await getHubspotPortalId(userId!);
  console.log(portalId);

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
            <EmptyPlaceholder.Title>HubSpot App Not Installed</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You haven&apos;t installed the HubSpot app yet. Let&apos;s start there!
            </EmptyPlaceholder.Description>
            <Button><a href="https://en.wikipedia.org/wiki/Next.js">Install in HubSpot</a></Button>
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