import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
    }
    if (!key) {
      throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is required.");
    }

    _supabase = createClient(url, key);
  }
  return _supabase;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is required.");
    }
    if (!key) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is required.");
    }

    _supabaseAdmin = createClient(url, key);
  }
  return _supabaseAdmin;
}
