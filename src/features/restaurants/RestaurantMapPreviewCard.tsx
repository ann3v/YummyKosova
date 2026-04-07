import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { RestaurantBadge } from '@/src/features/restaurants/RestaurantBadge';
import { RestaurantImageView } from '@/src/features/restaurants/RestaurantImageView';
import { theme } from '@/src/theme';

import type { RestaurantMapItem } from '@/src/features/restaurants/types';

type RestaurantMapPreviewCardProps = {
  restaurant: RestaurantMapItem;
  featuredLabel: string;
  detailsLabel: string;
  onOpenDetails: () => void;
};

export function RestaurantMapPreviewCard({
  restaurant,
  featuredLabel,
  detailsLabel,
  onOpenDetails,
}: RestaurantMapPreviewCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.row}>
        <RestaurantImageView
          imageUrl={restaurant.imageUrl}
          accessibilityLabel={restaurant.imageAlt ?? restaurant.name}
          fallbackTitle={restaurant.name}
          fallbackCompact
          style={styles.image}
        />

        <View style={styles.content}>
          <View style={styles.copy}>
            <AppText variant="subtitle">{restaurant.name}</AppText>
            <AppText variant="body" color={theme.colors.mutedText}>
              {restaurant.city}
              {restaurant.address ? ` · ${restaurant.address}` : ''}
            </AppText>
          </View>

          <View style={styles.metaRow}>
            {restaurant.isFeatured ? (
              <RestaurantBadge label={featuredLabel} tone="accent" />
            ) : null}
            {restaurant.cuisine ? <RestaurantBadge label={restaurant.cuisine} /> : null}
            {restaurant.priceRange ? <RestaurantBadge label={restaurant.priceRange} /> : null}
          </View>
        </View>
      </View>

      <AppButton
        label={detailsLabel}
        variant="primary"
        fullWidth={false}
        onPress={onOpenDetails}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
  },
  content: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  copy: {
    gap: theme.spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
