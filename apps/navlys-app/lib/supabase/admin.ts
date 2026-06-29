// lib/supabase/admin.ts — usage exclusivement server-side, pour opérations qui contournent RLS
// Reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §3.
// G1 sécurité : SUPABASE_SERVICE_ROLE_KEY ne doit JAMAIS apparaître dans un bundle client.
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  if (typeof window !== 'undefined') {
    throw new Error('admin client invoked client-side — security boundary breached');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
