// lib/supabase/client.ts — composants client uniquement
// Reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §3.
'use client';
import { createBrowserClient } from '@supabase/ssr';

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
