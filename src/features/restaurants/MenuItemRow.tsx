import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { RestaurantBadge } from '@/src/features/restaurants/RestaurantBadge';
import { theme } from '@/src/theme';

import type { MenuItem } from '@/src/features/restaurants/types';

type MenuItemRowProps = {
  item: MenuItem;
  isLast?: boolean;
};

export function MenuItemRow({
  item,
  isLast = false,
}: MenuItemRowProps) {
  return (
    <View style={[styles.row, !isLast ? styles.rowBorder : undefined]}>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          contentFit="cover"
          style={styles.image}
          accessibilityLabel={item.imageAlt ?? item.name}
        />
      ) : null}

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleWrap}>
            <AppText variant="label">{item.name}</AppText>
            {item.availabilityLabel ? (
              <RestaurantBadge label={item.availabilityLabel} tone="accent" />
            ) : null}
          </View>
          <AppText variant="label" color={theme.colors.primary}>
            {item.priceLabel}
          </AppText>
        </View>

        {item.description ? (
          <AppText variant="caption" color={theme.colors.mutedText} numberOfLines={3}>
            {item.description}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  },
  content: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  titleWrap: {
    flex: 1,
    gap: theme.spacing.xs,
  },
});
