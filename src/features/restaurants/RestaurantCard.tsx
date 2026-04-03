import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { theme } from '@/src/theme';

import type { RestaurantListItem } from '@/src/features/restaurants/types';

type RestaurantCardProps = {
  restaurant: RestaurantListItem;
  saveLabel: string;
  savedLabel: string;
  featuredLabel: string;
  ratingLabel: string;
  onToggleSaved: (restaurantId: string, nextSaved: boolean) => void;
  isSavePending?: boolean;
};

export function RestaurantCard({
  restaurant,
  saveLabel,
  savedLabel,
  featuredLabel,
  ratingLabel,
  onToggleSaved,
  isSavePending = false,
}: RestaurantCardProps) {
  return (
    <Card style={styles.card}>
      {restaurant.imageUrl ? (
        <Image
          source={{ uri: restaurant.imageUrl }}
          contentFit="cover"
          style={styles.image}
          accessibilityLabel={restaurant.imageAlt ?? restaurant.name}
        />
      ) : (
        <View style={styles.imageFallback}>
          <Ionicons name="restaurant-outline" size={26} color={theme.colors.primary} />
        </View>
      )}

      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={styles.topCopy}>
            <AppText variant="subtitle">{restaurant.name}</AppText>
            <AppText variant="body" color={theme.colors.mutedText}>
              {restaurant.city}
              {restaurant.address ? ` · ${restaurant.address}` : ''}
            </AppText>
          </View>

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

        <View style={styles.metaRow}>
          {restaurant.isFeatured ? (
            <View style={[styles.badge, styles.featuredBadge]}>
              <AppText variant="caption" color={theme.colors.primary}>
                {featuredLabel}
              </AppText>
            </View>
          ) : null}
          {restaurant.cuisine ? (
            <View style={styles.badge}>
              <AppText variant="caption" color={theme.colors.mutedText}>
                {restaurant.cuisine}
              </AppText>
            </View>
          ) : null}
          {restaurant.priceRange ? (
            <View style={styles.badge}>
              <AppText variant="caption" color={theme.colors.mutedText}>
                {restaurant.priceRange}
              </AppText>
            </View>
          ) : null}
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
  imageFallback: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
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
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.surfaceMuted,
  },
  featuredBadge: {
    backgroundColor: theme.colors.primarySoft,
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
