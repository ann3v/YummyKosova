import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppLogo } from '@/src/components/AppLogo';
import { AppText } from '@/src/components/AppText';
import { Screen } from '@/src/components/Screen';
import { theme } from '@/src/theme';

type LoadingStateProps = {
  title: string;
  message: string;
};

export function LoadingState({ title, message }: LoadingStateProps) {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.stack}>
        <AppLogo compact />
        <View style={styles.copy}>
          <AppText variant="display">{title}</AppText>
          <AppText variant="body" color={theme.colors.mutedText} style={styles.centered}>
            {message}
          </AppText>
        </View>
        <ActivityIndicator color={theme.colors.primary} size="small" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    alignItems: 'center',
    gap: theme.spacing.xl,
    maxWidth: 280,
  },
  copy: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  centered: {
    textAlign: 'center',
  },
});
