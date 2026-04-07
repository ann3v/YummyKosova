import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '@/src/features/auth/AuthProvider';
import { useI18n } from '@/src/i18n/I18nProvider';
import { useAppState } from '@/src/lib/app-state';
import { theme } from '@/src/theme';

export default function TabLayout() {
  const { messages } = useI18n();
  const { hasCompletedOnboarding } = useAppState();
  const { session, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return null;
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/(onboarding)" />;
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: messages.tabs.discover,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: messages.tabs.search,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: messages.tabs.map,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: messages.tabs.saved,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: messages.tabs.profile,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="restaurants/[slug]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
