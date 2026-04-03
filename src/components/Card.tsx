import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/src/theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'accent';
};

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.base, variant === 'accent' ? styles.accent : undefined, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
  },
  accent: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
