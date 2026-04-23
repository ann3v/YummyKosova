import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../theme';

type SectionTitleProps = {
  title: string;
  icon?: ReactNode;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionTitle({ title, icon, actionLabel, onActionPress }: SectionTitleProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titleWrap}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  title: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  action: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.danger,
  },
});
