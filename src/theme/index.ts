import type { Theme } from '@react-navigation/native';

import { colors, radius, shadow, spacing, typography } from './tokens';

export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadow,
};

export const navigationTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.gold,
  },
  fonts: {
    regular: {
      fontFamily: typography.fontFamily,
      fontWeight: '400',
    },
    medium: {
      fontFamily: typography.fontFamily,
      fontWeight: '500',
    },
    bold: {
      fontFamily: typography.fontFamily,
      fontWeight: '700',
    },
    heavy: {
      fontFamily: typography.fontFamily,
      fontWeight: '800',
    },
  },
};

export * from './tokens';
