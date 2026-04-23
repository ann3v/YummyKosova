import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../theme';

type PillProps = {
  label: string;
  icon?: ReactNode;
  tone?: 'light' | 'soft' | 'success' | 'dark' | 'warning';
};

export function Pill({ label, icon, tone = 'soft' }: PillProps) {
  return (
    <View style={[styles.base, stylesByTone[tone]]}>
      {icon}
      <Text style={[styles.label, textByTone[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: theme.typography.sizes.label,
    fontWeight: '600',
  },
});

const stylesByTone = StyleSheet.create({
  light: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  soft: {
    backgroundColor: '#FFF0E9',
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  dark: {
    backgroundColor: 'rgba(17, 24, 39, 0.78)',
  },
  warning: {
    backgroundColor: theme.colors.goldSoft,
  },
});

const textByTone = StyleSheet.create({
  light: {
    color: theme.colors.surface,
  },
  soft: {
    color: theme.colors.danger,
  },
  success: {
    color: theme.colors.surface,
  },
  dark: {
    color: theme.colors.surface,
  },
  warning: {
    color: theme.colors.heading,
  },
});
