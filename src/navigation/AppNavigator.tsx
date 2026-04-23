import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '../features/auth/AuthProvider';
import { ChatAssistantModal } from '../components/common/ChatAssistantModal';
import { navigationTheme } from '../theme';
import { AuthNavigator } from './AuthNavigator';
import { TabsNavigator } from './TabsNavigator';
import { theme } from '../theme';

export function AppNavigator() {
  const { isAuthReady, session } = useAuth();

  return (
    <NavigationContainer theme={navigationTheme}>
      {!isAuthReady ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading YummyKosova...</Text>
        </View>
      ) : (
        <>
          {session ? <TabsNavigator /> : <AuthNavigator />}
          {session ? <ChatAssistantModal /> : null}
        </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.mutedText,
  },
});
