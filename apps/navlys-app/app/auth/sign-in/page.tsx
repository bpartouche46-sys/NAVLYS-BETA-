// app/auth/sign-in/page.tsx — reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §5.
'use client';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const supabase = createBrowserSupabaseClient();

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        shouldCreateUser: true,
      },
    });
    if (!error) setSent(true);
  }

  return (
    <main className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] flex items-center justify-center p-4">
      <form onSubmit={send} className="w-full max-w-sm flex flex-col gap-4">
        <h1 className="font-[var(--font-display)] text-2xl text-[var(--color-bronze)]">🧭 NAVLYS · Connexion</h1>
        {sent ? (
          <p className="font-[var(--font-body)] text-base text-[var(--color-ice)]">
            📨 Lien envoyé à <strong>{email}</strong>. Ouvre ton email et clique pour entrer dans l&apos;app.
          </p>
        ) : (
          <>
            <label className="font-[var(--font-ui)] text-sm" htmlFor="email">Email</label>
            <input id="email" type="email" required value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="px-4 py-3 rounded-xl bg-[var(--color-night)] border border-[var(--color-bronze)]/40
                              text-[var(--color-pearl)] focus:outline focus:outline-2 focus:outline-[var(--color-ice)]" />
            <button type="submit"
                    className="py-3 rounded-xl bg-[var(--color-bronze)] text-[var(--color-night)] font-semibold">
              Envoyer le lien magique
            </button>
          </>
        )}
      </form>
    </main>
  );
}
