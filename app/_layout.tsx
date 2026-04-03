import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/src/features/auth/AuthProvider';
import { I18nProvider } from '@/src/i18n/I18nProvider';
import { AppStateProvider, useAppState } from '@/src/lib/app-state';
import { navigationTheme, theme } from '@/src/theme';

void SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isBootstrapping } = useAppState();
  const { isAuthReady } = useAuth();

  useEffect(() => {
    if (!isBootstrapping && isAuthReady) {
      void SplashScreen.hideAsync();
    }
  }, [isAuthReady, isBootstrapping]);

  if (isBootstrapping || !isAuthReady) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={navigationTheme}>
          <I18nProvider>
            <AuthProvider>
              <AppStateProvider>
                <RootNavigator />
              </AppStateProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
