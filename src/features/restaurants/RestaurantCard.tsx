import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { RestaurantBadge } from '@/src/features/restaurants/RestaurantBadge';
import { RestaurantImageView } from '@/src/features/restaurants/RestaurantImageView';
import { theme } from '@/src/theme';

import type { RestaurantListItem } from '@/src/features/restaurants/types';

type RestaurantCardProps = {
  restaurant: RestaurantListItem;
  saveLabel: string;
  savedLabel: string;
  featuredLabel: string;
  ratingLabel: string;
  onPress?: (restaurant: RestaurantListItem) => void;
  onToggleSaved: (restaurantId: string, nextSaved: boolean) => void;
  isSavePending?: boolean;
};

export function RestaurantCard({
  restaurant,
  saveLabel,
  savedLabel,
  featuredLabel,
  ratingLabel,
  onPress,
  onToggleSaved,
  isSavePending = false,
}: RestaurantCardProps) {
  return (
    <Card style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={restaurant.name}
        disabled={!onPress}
        onPress={() => onPress?.(restaurant)}
        style={({ pressed }) => [pressed ? styles.cardPressed : undefined]}>
        <RestaurantImageView
          imageUrl={restaurant.imageUrl}
          accessibilityLabel={restaurant.imageAlt ?? restaurant.name}
          fallbackTitle={restaurant.name}
          style={styles.image}
        />
      </Pressable>

      <View style={styles.body}>
        <View style={styles.topRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={restaurant.name}
            disabled={!onPress}
            onPress={() => onPress?.(restaurant)}
            style={({ pressed }) => [styles.topCopy, pressed ? styles.copyPressed : undefined]}>
            <AppText variant="subtitle">{restaurant.name}</AppText>
            <AppText variant="body" color={theme.colors.mutedText}>
              {restaurant.city}
              {restaurant.address ? ` · ${restaurant.address}` : ''}
            </AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={restaurant.isSaved ? savedLabel : saveLabel}
            disabled={isSavePending}
            onPress={() => onToggleSaved(restaurant.id, !restaurant.isSaved)}
            style={({ pressed }) => [
              styles.saveButton,
              restaurant.isSaved ? styles.saveButtonActive : undefined,
              isSavePending ? styles.saveButtonDisabled : undefined,
              pressed ? styles.saveButtonPressed : undefined,
            ]}>
            <Ionicons
              name={restaurant.isSaved ? 'bookmark' : 'bookmark-outline'}
              size={18}
              color={restaurant.isSaved ? theme.colors.surface : theme.colors.primary}
            />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={restaurant.name}
          disabled={!onPress}
          onPress={() => onPress?.(restaurant)}
          style={({ pressed }) => [styles.contentPressable, pressed ? styles.copyPressed : undefined]}>
          <View style={styles.metaRow}>
            {restaurant.isFeatured ? (
              <RestaurantBadge label={featuredLabel} tone="accent" />
            ) : null}
            {restaurant.cuisine ? <RestaurantBadge label={restaurant.cuisine} /> : null}
            {restaurant.priceRange ? <RestaurantBadge label={restaurant.priceRange} /> : null}
          </View>

          {restaurant.description ? (
            <AppText numberOfLines={3} variant="body" color={theme.colors.mutedText}>
              {restaurant.description}
            </AppText>
          ) : null}

          <View style={styles.footer}>
            <View style={styles.footerInfo}>
              <Ionicons name="star" size={14} color={theme.colors.gold} />
              <AppText variant="caption" color={theme.colors.text}>
                {ratingLabel}: {restaurant.rating?.toFixed(1) ?? 'N/A'}
              </AppText>
            </View>

            <AppText variant="caption" color={theme.colors.primary}>
              {restaurant.isSaved ? savedLabel : saveLabel}
            </AppText>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    padding: 0,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.surfaceMuted,
  },
  body: {
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  contentPressable: {
    gap: theme.spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  topCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.round,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  saveButtonDisabled: {
    opacity: 0.55,
  },
  saveButtonPressed: {
    opacity: 0.85,
  },
  cardPressed: {
    opacity: 0.92,
  },
  copyPressed: {
    opacity: 0.82,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});
