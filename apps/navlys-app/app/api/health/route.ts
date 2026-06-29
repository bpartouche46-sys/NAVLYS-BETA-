// app/api/health/route.ts — health check (200 OK + signature Supabase)
// Reconstitué VERBATIM depuis _APP_CLIENT_DOCUMENTATION_TECHNIQUE.md §10.
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createServerActionClient();
  const { error } = await supabase.from('cartographe_publications').select('id').limit(1);
  return NextResponse.json({
    status: error ? 'degraded' : 'ok',
    ts: new Date().toISOString(),
    error: error?.message ?? null,
  }, { status: error ? 503 : 200 });
}
