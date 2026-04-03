import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingHorizontal: 0,
  },
};

const textColors: Record<ButtonVariant, string> = {
  primary: theme.colors.surface,
  secondary: theme.colors.text,
  ghost: theme.colors.primary,
};

export function AppButton({
  label,
  variant = 'primary',
  fullWidth = true,
  isLoading = false,
  style,
  disabled,
  ...props
}: AppButtonProps) {
  const textColor = textColors[variant];

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        !fullWidth ? styles.autoWidth : undefined,
        disabled || isLoading ? styles.disabled : undefined,
        pressed ? styles.pressed : undefined,
        style,
      ]}
      disabled={disabled || isLoading}
      {...props}>
      <View style={styles.content}>
        {isLoading ? <ActivityIndicator size="small" color={textColor} /> : null}
        <AppText variant="label" color={textColor}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: theme.radius.round,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  autoWidth: {
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
