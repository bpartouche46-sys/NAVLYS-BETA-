// app/auth/sign-out/route.ts — reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §5.
import { NextResponse } from 'next/server';
import { createServerActionClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const supabase = createServerActionClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', req.url));
}
