import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { theme } from '@/src/theme';

type RestaurantBadgeProps = {
  label: string;
  tone?: 'default' | 'accent';
};

export function RestaurantBadge({
  label,
  tone = 'default',
}: RestaurantBadgeProps) {
  return (
    <View style={[styles.badge, tone === 'accent' ? styles.badgeAccent : undefined]}>
      <AppText
        variant="caption"
        color={tone === 'accent' ? theme.colors.primary : theme.colors.mutedText}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.surfaceMuted,
  },
  badgeAccent: {
    backgroundColor: theme.colors.primarySoft,
  },
});
