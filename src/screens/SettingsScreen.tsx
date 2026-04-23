import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  accountLinks,
  notificationOptions,
  settingsLanguages,
  type LanguageOption,
  type NotificationOption,
  type QuickLink,
} from '../data/mockData';
import { OptionListCard } from '../components/cards/OptionListCard';
import { IconCircleButton } from '../components/common/IconCircleButton';
import { SectionTitle } from '../components/common/SectionTitle';
import { ToggleSwitch } from '../components/common/ToggleSwitch';
import { useAuth } from '../features/auth/AuthProvider';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { theme } from '../theme';

type SettingsScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

function LanguageCard({
  languages,
  onSelect,
}: {
  languages: LanguageOption[];
  onSelect: (languageId: string) => void;
}) {
  return (
    <View style={styles.card}>
      {languages.map((language, index) => (
        <Pressable
          key={language.id}
          onPress={() => onSelect(language.id)}
          style={[
            styles.languageRow,
            index < languages.length - 1 && styles.rowBorder,
            language.selected && styles.selectedRow,
          ]}>
          <View style={styles.languageLeft}>
            <Text style={styles.flag}>{language.flag}</Text>
            <Text style={styles.languageLabel}>{language.label}</Text>
          </View>

          {language.selected ? (
            <View style={styles.radioSelected}>
              <View style={styles.radioInner} />
            </View>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

function NotificationCard({
  items,
  onToggle,
}: {
  items: NotificationOption[];
  onToggle: (itemId: string) => void;
}) {
  return (
    <View style={styles.card}>
      {items.map((item, index) => (
        <View key={item.id} style={[styles.notificationRow, index < items.length - 1 && styles.rowBorder]}>
          <View style={styles.notificationCopy}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
          </View>

          <ToggleSwitch value={item.enabled} onValueChange={() => onToggle(item.id)} />
        </View>
      ))}
    </View>
  );
}

export function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { signOut } = useAuth();
  const [languages, setLanguages] = useState(settingsLanguages);
  const [notifications, setNotifications] = useState(notificationOptions);

  const handleAccountPress = async (item: QuickLink) => {
    if (item.id !== 'logout') {
      return;
    }

    try {
      await signOut();
    } catch (error) {
      Alert.alert('Sign out failed', error instanceof Error ? error.message : 'Unable to sign out.');
    }
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <GradientHeaderShell>
        <View style={styles.headerRow}>
          <IconCircleButton onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={theme.colors.surface} />
          </IconCircleButton>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>
      </GradientHeaderShell>

      <View style={styles.section}>
        <SectionTitle
          title="Gjuha / Language"
          icon={<Ionicons name="globe-outline" size={22} color={theme.colors.danger} />}
        />
        <LanguageCard
          languages={languages}
          onSelect={(languageId) =>
            setLanguages((current) =>
              current.map((language) => ({
                ...language,
                selected: language.id === languageId,
              }))
            )
          }
        />
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Njoftimet"
          icon={<Ionicons name="notifications-outline" size={22} color={theme.colors.danger} />}
        />
        <NotificationCard
          items={notifications}
          onToggle={(itemId) =>
            setNotifications((current) =>
              current.map((item) => (item.id === itemId ? { ...item, enabled: !item.enabled } : item))
            )
          }
        />
      </View>

      <View style={styles.section}>
        <SectionTitle
          title="Llogaria"
          icon={<Ionicons name="person-circle-outline" size={22} color={theme.colors.heading} />}
        />
        <OptionListCard items={accountLinks} onItemPress={handleAccountPress} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>YUMMY KOSOVA</Text>
        <Text style={styles.footerVersion}>Version 1.0.0</Text>
        <Text style={styles.footerNote}>© 2026 Yummy Kosova. All rights reserved.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: theme.colors.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    flex: 1,
    marginLeft: theme.spacing.lg,
  },
  headerSpacer: {
    width: 48,
  },
  section: {
    gap: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  languageRow: {
    minHeight: 82,
    paddingHorizontal: theme.spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedRow: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  languageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  flag: {
    fontSize: 22,
  },
  languageLabel: {
    fontSize: 17,
    lineHeight: 22,
    color: theme.colors.heading,
  },
  radioSelected: {
    width: 30,
    height: 30,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.surface,
  },
  notificationRow: {
    minHeight: 100,
    paddingHorizontal: theme.spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  notificationCopy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  notificationTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: theme.colors.heading,
  },
  notificationSubtitle: {
    fontSize: 14,
    lineHeight: 19,
    color: theme.colors.mutedText,
  },
  footer: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xxl,
  },
  footerBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  footerVersion: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.mutedText,
  },
  footerNote: {
    fontSize: 14,
    color: theme.colors.subtle,
    textAlign: 'center',
  },
});
