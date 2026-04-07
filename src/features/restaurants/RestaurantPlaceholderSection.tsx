import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { theme } from '@/src/theme';

type RestaurantPlaceholderSectionProps = {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  note?: string;
};

export function RestaurantPlaceholderSection({
  icon,
  title,
  description,
  note,
}: RestaurantPlaceholderSectionProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color={theme.colors.primary} />
      </View>
      <View style={styles.copy}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {description}
        </AppText>
        {note ? (
          <AppText variant="caption" color={theme.colors.primary}>
            {note}
          </AppText>
        ) : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  copy: {
    gap: theme.spacing.sm,
  },
});
