import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseBrowser = () =>
  createClient(url, anon, { auth: { persistSession: true, autoRefreshToken: true } });

export const supabaseAdmin = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !url) {
    throw new Error("Supabase server environment variables are not configured.");
  }
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
};