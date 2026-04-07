import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type ImageFallbackProps = {
  title?: string;
  iconSize?: number;
  compact?: boolean;
};

export function ImageFallback({
  title,
  iconSize = 26,
  compact = false,
}: ImageFallbackProps) {
  return (
    <View style={[styles.container, compact ? styles.compactContainer : undefined]}>
      <Ionicons name="image-outline" size={iconSize} color={theme.colors.primary} />
      {title ? (
        <AppText
          variant="caption"
          color={theme.colors.mutedText}
          numberOfLines={compact ? 1 : 2}
          style={styles.title}>
          {title}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.md,
  },
  compactContainer: {
    gap: theme.spacing.xs,
    padding: theme.spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
});
