import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type AppLogoProps = {
  compact?: boolean;
};

export function AppLogo({ compact = false }: AppLogoProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.markWrap, compact ? styles.markWrapCompact : undefined]}>
        <Image
          source={require('@/assets/images/icon.png')}
          contentFit="contain"
          style={[styles.mark, compact ? styles.markCompact : undefined]}
        />
      </View>
      {!compact ? (
        <View>
          <AppText variant="subtitle">YummyKosova</AppText>
          <AppText variant="caption" color={theme.colors.mutedText}>
            Logo placeholder
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  markWrap: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markWrapCompact: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.xl,
  },
  mark: {
    width: 28,
    height: 28,
  },
  markCompact: {
    width: 40,
    height: 40,
  },
});
