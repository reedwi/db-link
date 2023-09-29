
import type { Icon } from "lucide-react"

import { Icons } from "@/components/ui/icons"
import { Database } from "./supabase"


export type GenericRecord = {
  name: string;
  hubspotProperty: string;
  connectionId: string;
  query: string;
}
export type ConnectionStatus = Database["public"]["Enums"]["connection_status"]
export type DatabaseConnection = Database["public"]["Tables"]["databases"]["Row"]
export type DecryptedDatabaseConnection = Database["public"]["Views"]["decrypted_databases"]["Row"]
export type Deal = Database["public"]["Tables"]["deals"]["Row"]
export type Contact = Database["public"]["Tables"]["contacts"]["Row"]
export type Company = Database["public"]["Tables"]["companies"]["Row"]

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    airi: string
  }
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}