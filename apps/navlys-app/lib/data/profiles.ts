// lib/data/profiles.ts — helper de données profil actif
// Reconstitué VERBATIM depuis _APP_CLIENT_MIDDLEWARE_AUTH.md §6.
import { createServerActionClient } from '@/lib/supabase/server';

export async function getActiveProfile() {
  const supabase = createServerActionClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles_user')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .maybeSingle();
  if (error) {
    console.error('[getActiveProfile]', error);
    return null;
  }
  return data;
}
