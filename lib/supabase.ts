import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Extend the Window type for TypeScript in the same file
declare global {
  interface Window {
    supabase?: SupabaseClient;
  }
}

let supabase: SupabaseClient;

// Check if code is running in the browser
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  // If supabase isn't initialized on window, create it
  if (!window.supabase) {
      console.log("Initializing Supabase on client");
      supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
      window.supabase = supabase;
  } else {
      supabase = window.supabase;
  }
} else {
  // Handle server-side initialization if necessary
  // Currently, we don't initialize Supabase on the server side in this snippet
  supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

}

export default supabase;
