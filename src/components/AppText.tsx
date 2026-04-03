import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import { theme } from '@/src/theme';

type TextVariant = 'display' | 'title' | 'subtitle' | 'body' | 'label' | 'caption' | 'eyebrow';

type AppTextProps = TextProps & {
  variant?: TextVariant;
  color?: string;
};

const variantStyles: Record<TextVariant, TextStyle> = {
  display: {
    fontSize: theme.typography.sizes.display,
    lineHeight: theme.typography.lineHeights.display,
    fontWeight: '800',
  },
  title: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: theme.typography.sizes.subtitle,
    lineHeight: theme.typography.lineHeights.subtitle,
    fontWeight: '700',
  },
  body: {
    fontSize: theme.typography.sizes.body,
    lineHeight: theme.typography.lineHeights.body,
    fontWeight: '400',
  },
  label: {
    fontSize: theme.typography.sizes.label,
    lineHeight: theme.typography.lineHeights.label,
    fontWeight: '600',
  },
  caption: {
    fontSize: theme.typography.sizes.caption,
    lineHeight: theme.typography.lineHeights.caption,
    fontWeight: '400',
  },
  eyebrow: {
    fontSize: theme.typography.sizes.eyebrow,
    lineHeight: theme.typography.lineHeights.eyebrow,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
};

export function AppText({
  variant = 'body',
  color = theme.colors.text,
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text style={[styles.base, variantStyles[variant], { color }, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.fontFamily,
  },
});
