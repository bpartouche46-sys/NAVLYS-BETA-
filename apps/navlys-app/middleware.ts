// middleware.ts — reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §4.
// Gate launch + auth Supabase + redirection onboarding si profil manquant.
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

const PUBLIC_PATHS = [
  '/',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer-g1',
  '/auth/sign-in',
  '/auth/callback',
  '/auth/sign-out',
  '/api/health',
];

const ONBOARDING_PATHS = ['/onboarding'];   // tout ce qui commence par /onboarding
const PROTECTED_PATHS = ['/dashboard', '/laboratoire', '/profil', '/api'];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (pathname.startsWith('/_next')) return true;
  if (pathname.startsWith('/static')) return true;
  if (/\.(png|jpe?g|svg|webp|ico|mp4|webm|woff2?)$/.test(pathname)) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // ── Gate launch ────────────────────────────────────────────────────────────
  if (process.env.NEXT_PUBLIC_LAUNCH_UNLOCKED !== 'true') {
    // Avant l'ouverture (1er juillet 2026 00:00 Europe/Paris) : seul / (la page
    // countdown) est ouvert. NEXT_PUBLIC_LAUNCH_UNLOCKED reste 'false' tant que
    // Bruno ne décide pas la bascule (règle gravée n°3).
    if (pathname !== '/' && !pathname.startsWith('/_next') && !pathname.startsWith('/static')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return res;
  }

  // ── Public paths bypass ────────────────────────────────────────────────────
  if (isPublic(pathname)) return res;

  // ── Initialise Supabase server client lié à req/res cookies ────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  // ── Pas de session → vers sign-in ──────────────────────────────────────────
  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/sign-in';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // ── Sessionné mais sur /auth/* → vers dashboard ────────────────────────────
  if (pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ── Vérifier profil actif ──────────────────────────────────────────────────
  // Optimisation : 1 requête lite, cachée 60 s côté request.
  const { data: profile } = await supabase
    .from('profiles_user')
    .select('id, profil_id, expires_at')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();

  const needOnboarding = !profile;

  // ── Redirection vers onboarding si profil manquant ─────────────────────────
  if (needOnboarding && !ONBOARDING_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL('/onboarding/dream', req.url));
  }

  // ── Sessionné + profil OK mais sur /onboarding → vers dashboard ────────────
  if (!needOnboarding && pathname.startsWith('/onboarding')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // ── Re-questionnaire conseillé si expires_at dépassé ───────────────────────
  if (profile?.expires_at && new Date(profile.expires_at) < new Date()) {
    res.headers.set('x-navlys-requestionnaire-due', 'true');
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Exécuter sur toutes les routes sauf assets/_next/api-publics.
     * Note : on filtre encore plus finement dans la fonction.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|svg|webp|ico|mp4|webm|woff2?)$).*)',
  ],
};
