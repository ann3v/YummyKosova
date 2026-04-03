import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <View style={styles.container}>
      {([
        { label: 'EN', value: 'en' },
        { label: 'SQ', value: 'sq' },
      ] as const).map((item) => {
        const selected = language === item.value;

        return (
          <Pressable
            key={item.value}
            onPress={() => setLanguage(item.value)}
            style={[styles.option, selected ? styles.optionSelected : undefined]}>
            <AppText
              variant="label"
              color={selected ? theme.colors.surface : theme.colors.text}>
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.round,
    padding: theme.spacing.xs,
  },
  option: {
    minWidth: 48,
    minHeight: 36,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary,
  },
});
