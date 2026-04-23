import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../theme';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: 'gradient' | 'outline' | 'muted' | 'white';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function PrimaryButton({
  label,
  onPress,
  icon,
  variant = 'gradient',
  disabled = false,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const content = (
    <View style={styles.inner}>
      {icon}
      <Text
        style={[
          styles.label,
          variant === 'outline' && styles.outlineLabel,
          (variant === 'muted' || disabled) && styles.mutedLabel,
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );

  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [pressed && styles.pressed, style]}>
      {variant === 'gradient' && !disabled ? (
        <LinearGradient colors={theme.gradients.warm} style={styles.gradient}>
          {content}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.fallback,
            variant === 'outline' && styles.outline,
            variant === 'muted' && styles.muted,
            variant === 'white' && styles.white,
            disabled && styles.disabled,
          ]}>
          {content}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    minHeight: 60,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  fallback: {
    minHeight: 60,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '700',
    color: theme.colors.surface,
  },
  outline: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  white: {
    backgroundColor: theme.colors.surface,
    ...theme.shadow.card,
  },
  muted: {
    backgroundColor: '#D7DAE4',
  },
  disabled: {
    backgroundColor: '#D7DAE4',
  },
  outlineLabel: {
    color: theme.colors.primary,
  },
  mutedLabel: {
    color: '#5E6473',
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
