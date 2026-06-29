// app/(onboarding)/layout.tsx — reconstitué VERBATIM depuis _APP_CLIENT_ONBOARDING_7_SCREENS.md §1.
import { ReactNode } from 'react';
import { DisclaimerBanner } from '@/components/onboarding/DisclaimerBanner';
import { ProgressTopBar } from '@/components/onboarding/ProgressTopBar';

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--color-night)] text-[var(--color-pearl)] flex flex-col">
      <ProgressTopBar />
      <main className="flex-1 mx-auto w-full max-w-md px-4 py-6 flex flex-col"
            role="main" aria-label="Parcours onboarding NAVLYS">
        {children}
      </main>
      <DisclaimerBanner />
    </div>
  );
}
