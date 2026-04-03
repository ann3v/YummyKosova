import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type NoticeBannerProps = {
  message: string;
  variant?: 'error' | 'success' | 'info';
};

const variants = {
  error: {
    backgroundColor: '#FBEAE5',
    borderColor: '#F2C6BA',
    textColor: theme.colors.danger,
  },
  success: {
    backgroundColor: '#EAF7F4',
    borderColor: '#B9DED5',
    textColor: theme.colors.accent,
  },
  info: {
    backgroundColor: theme.colors.surfaceMuted,
    borderColor: theme.colors.border,
    textColor: theme.colors.text,
  },
} as const;

export function NoticeBanner({
  message,
  variant = 'info',
}: NoticeBannerProps) {
  const stylesForVariant = variants[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: stylesForVariant.backgroundColor,
          borderColor: stylesForVariant.borderColor,
        },
      ]}>
      <AppText variant="caption" color={stylesForVariant.textColor}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});
