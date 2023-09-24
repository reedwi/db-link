
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Contacts Card Configuration",
}


export default async function ContactPage() {
  const { userId } = auth();

  return (
    <DashboardShell>
      <DashboardHeader heading="Contact Card" text="Manage your contact card">
      </DashboardHeader> 
    </DashboardShell>
  )
}
