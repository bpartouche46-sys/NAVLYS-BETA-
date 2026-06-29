// app/(onboarding)/profile/page.tsx — Écran 3, profil attribué
// Reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §4.
import { getActiveProfile } from '@/lib/data/profiles';
import { redirect } from 'next/navigation';
import { ProfileReveal } from '@/components/onboarding/ProfileReveal';

export default async function ProfilePage() {
  const p = await getActiveProfile();
  if (!p) redirect('/onboarding/dream');
  return <ProfileReveal profile={p} />;
}
