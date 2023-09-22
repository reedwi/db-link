
import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database

declare global {
  var supabase: SupabaseClient | undefined
};

const supabase = globalThis.supabase || createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export default supabase;