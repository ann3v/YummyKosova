import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../theme';

type StatCardProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  value: string;
  label: string;
};

export function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Ionicons name={icon} size={26} color={theme.colors.danger} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadow.card,
  },
  value: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  label: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.mutedText,
  },
});
