import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/src/features/auth/AuthProvider';
import { useAppState } from '@/src/lib/app-state';

export default function OnboardingLayout() {
  const { hasCompletedOnboarding } = useAppState();
  const { session } = useAuth();

  if (hasCompletedOnboarding) {
    return <Redirect href={session ? '/(tabs)' : '/sign-in'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
