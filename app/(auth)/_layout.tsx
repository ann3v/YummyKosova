import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/src/features/auth/AuthProvider';
import { useAppState } from '@/src/lib/app-state';

export default function AuthLayout() {
  const { hasCompletedOnboarding } = useAppState();
  const { session, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
