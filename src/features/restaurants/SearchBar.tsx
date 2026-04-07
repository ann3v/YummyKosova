import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type SearchBarProps = {
  value: string;
  label: string;
  placeholder: string;
  hint?: string;
  clearLabel: string;
  onChangeText: (value: string) => void;
  onClear: () => void;
};

export function SearchBar({
  value,
  label,
  placeholder,
  hint,
  clearLabel,
  onChangeText,
  onClear,
}: SearchBarProps) {
  return (
    <View style={styles.wrapper}>
      <AppText variant="label">{label}</AppText>
      <View style={styles.inputWrap}>
        <Ionicons name="search-outline" size={18} color={theme.colors.mutedText} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.mutedText}
          style={styles.input}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={clearLabel}
            onPress={onClear}
            style={({ pressed }) => [styles.clearButton, pressed ? styles.clearPressed : undefined]}>
            <Ionicons name="close" size={16} color={theme.colors.mutedText} />
          </Pressable>
        ) : null}
      </View>
      {hint ? (
        <AppText variant="caption" color={theme.colors.mutedText}>
          {hint}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  inputWrap: {
    minHeight: 52,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 52,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.text,
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
  },
  clearPressed: {
    opacity: 0.8,
  },
});
