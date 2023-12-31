import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
  ],
  sidebarNav: [
    {
      title: "Set up",
      href: "/dashboard",
      icon: "page",
    },
    {
      title: "Database Connections",
      href: "/dashboard/databases",
      icon: "settings",
    },
    {
      title: "Contacts",
      href: "/dashboard/contacts",
      icon: "user",
    },
    {
      title: "Companies",
      href: "/dashboard/companies",
      icon: "company",
    },
    {
      title: "Deals",
      href: "/dashboard/deals",
      icon: "money",
    },
    {
      title: "Tickets",
      href: "/dashboard/tickets",
      icon: "help",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },

  ],
}