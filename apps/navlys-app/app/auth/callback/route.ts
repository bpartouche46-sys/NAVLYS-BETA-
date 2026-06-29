// app/auth/callback/route.ts — reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §5.
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = createServerActionClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
