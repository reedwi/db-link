export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          clerk_id: string | null
          created_at: string
          email: string | null
          first_name: string | null
          hubspot_access_token: string | null
          hubspot_portal_id: number | null
          hubspot_refresh_token: string | null
          id: string
          last_name: string | null
          status: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          hubspot_access_token?: string | null
          hubspot_portal_id?: number | null
          hubspot_refresh_token?: string | null
          id?: string
          last_name?: string | null
          status?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          hubspot_access_token?: string | null
          hubspot_portal_id?: number | null
          hubspot_refresh_token?: string | null
          id?: string
          last_name?: string | null
          status?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          column_map: Json | null
          created_at: string
          database_id: string | null
          hubspot_portal_id: number | null
          hubspot_property: string | null
          id: string
          query: string | null
        }
        Insert: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Update: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "decrypted_databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "accounts"
            referencedColumns: ["hubspot_portal_id"]
          },
          {
            foreignKeyName: "companies_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "decrypted_accounts"
            referencedColumns: ["hubspot_portal_id"]
          }
        ]
      }
      contacts: {
        Row: {
          column_map: Json | null
          created_at: string
          database_id: string | null
          hubspot_portal_id: number | null
          hubspot_property: string | null
          id: string
          query: string | null
        }
        Insert: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Update: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "decrypted_databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "accounts"
            referencedColumns: ["hubspot_portal_id"]
          },
          {
            foreignKeyName: "contacts_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "decrypted_accounts"
            referencedColumns: ["hubspot_portal_id"]
          }
        ]
      }
      databases: {
        Row: {
          connection_status:
            | Database["public"]["Enums"]["connection_status"]
            | null
          connection_message: string | null
          created_at: string
          database_name: string | null
          host: string | null
          hubspot_portal_id: number | null
          id: string
          password: string | null
          port: number | null
          type: string | null
          username: string | null
          name: string | null
        }
        Insert: {
          connection_status?:
            | Database["public"]["Enums"]["connection_status"]
            | null
          connection_message?: string | null
          created_at?: string
          database_name?: string | null
          host?: string | null
          hubspot_portal_id?: number | null
          id?: string
          password?: string | null
          port?: number | null
          type?: string | null
          username?: string | null
          name?: string | null
        }
        Update: {
          connection_status?:
            | Database["public"]["Enums"]["connection_status"]
            | null
          connection_message?: string | null
          created_at?: string
          database_name?: string | null
          host?: string | null
          hubspot_portal_id?: number | null
          id?: string
          password?: string | null
          port?: number | null
          type?: string | null
          username?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "databases_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "accounts"
            referencedColumns: ["hubspot_portal_id"]
          },
          {
            foreignKeyName: "databases_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "decrypted_accounts"
            referencedColumns: ["hubspot_portal_id"]
          }
        ]
      }
      deals: {
        Row: {
          column_map: Json | null
          created_at: string
          database_id: string | null
          hubspot_portal_id: number | null
          hubspot_property: string | null
          id: string
          query: string | null
        }
        Insert: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Update: {
          column_map?: Json | null
          created_at?: string
          database_id?: string | null
          hubspot_portal_id?: number | null
          hubspot_property?: string | null
          id?: string
          query?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_database_id_fkey"
            columns: ["database_id"]
            referencedRelation: "decrypted_databases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "accounts"
            referencedColumns: ["hubspot_portal_id"]
          },
          {
            foreignKeyName: "deals_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "decrypted_accounts"
            referencedColumns: ["hubspot_portal_id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price: number | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: []
      }
      wrappers_fdw_stats: {
        Row: {
          bytes_in: number | null
          bytes_out: number | null
          create_times: number | null
          created_at: string
          fdw_name: string
          metadata: Json | null
          rows_in: number | null
          rows_out: number | null
          updated_at: string
        }
        Insert: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Update: {
          bytes_in?: number | null
          bytes_out?: number | null
          create_times?: number | null
          created_at?: string
          fdw_name?: string
          metadata?: Json | null
          rows_in?: number | null
          rows_out?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      decrypted_accounts: {
        Row: {
          clerk_id: string | null
          created_at: string | null
          decrypted_hubspot_access_token: string | null
          email: string | null
          first_name: string | null
          hubspot_access_token: string | null
          hubspot_portal_id: number | null
          hubspot_refresh_token: string | null
          id: string | null
          last_name: string | null
          status: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string | null
          decrypted_hubspot_access_token?: never
          email?: string | null
          first_name?: string | null
          hubspot_access_token?: string | null
          hubspot_portal_id?: number | null
          hubspot_refresh_token?: string | null
          id?: string | null
          last_name?: string | null
          status?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string | null
          decrypted_hubspot_access_token?: never
          email?: string | null
          first_name?: string | null
          hubspot_access_token?: string | null
          hubspot_portal_id?: number | null
          hubspot_refresh_token?: string | null
          id?: string | null
          last_name?: string | null
          status?: string | null
        }
        Relationships: []
      }
      decrypted_databases: {
        Row: {
          connection_status:
            | Database["public"]["Enums"]["connection_status"]
            | null
          created_at: string | null
          database_name: string | null
          decrypted_password: string | null
          host: string | null
          hubspot_portal_id: number | null
          id: string | null
          password: string | null
          port: number | null
          type: string | null
          username: string | null
        }
        Insert: {
          connection_status?:
            | Database["public"]["Enums"]["connection_status"]
            | null
          created_at?: string | null
          database_name?: string | null
          decrypted_password?: never
          host?: string | null
          hubspot_portal_id?: number | null
          id?: string | null
          password?: string | null
          port?: number | null
          type?: string | null
          username?: string | null
        }
        Update: {
          connection_status?:
            | Database["public"]["Enums"]["connection_status"]
            | null
          created_at?: string | null
          database_name?: string | null
          decrypted_password?: never
          host?: string | null
          hubspot_portal_id?: number | null
          id?: string | null
          password?: string | null
          port?: number | null
          type?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "databases_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "accounts"
            referencedColumns: ["hubspot_portal_id"]
          },
          {
            foreignKeyName: "databases_hubspot_portal_id_fkey"
            columns: ["hubspot_portal_id"]
            referencedRelation: "decrypted_accounts"
            referencedColumns: ["hubspot_portal_id"]
          }
        ]
      }
    }
    Functions: {
      airtable_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      airtable_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      airtable_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      big_query_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      big_query_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      big_query_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      click_house_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      click_house_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      click_house_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      firebase_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      firebase_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      firebase_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      logflare_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      logflare_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      logflare_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      s3_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      s3_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      s3_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
      stripe_fdw_handler: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      stripe_fdw_meta: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          version: string
          author: string
          website: string
        }[]
      }
      stripe_fdw_validator: {
        Args: {
          options: string[]
          catalog: unknown
        }
        Returns: undefined
      }
    }
    Enums: {
      connection_status: "valid" | "invalid"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type ConnectionStatus = Database["public"]["Enums"]["connection_status"]
export type DatabaseConnection = Database["public"]["Tables"]["databases"]["Row"]
export type Deal = Database["public"]["Tables"]["deals"]["Row"]
export type Contact = Database["public"]["Tables"]["contacts"]["Row"]
export type Company = Database["public"]["Tables"]["companies"]["Row"]