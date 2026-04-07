import { Pressable, StyleSheet } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function FilterChip({
  label,
  selected,
  onPress,
}: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : undefined,
        pressed ? styles.chipPressed : undefined,
      ]}>
      <AppText
        variant="label"
        color={selected ? theme.colors.surface : theme.colors.text}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: theme.radius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipPressed: {
    opacity: 0.88,
  },
});
