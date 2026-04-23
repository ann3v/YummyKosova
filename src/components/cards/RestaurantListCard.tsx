import { Feather, Ionicons } from '@expo/vector-icons';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Restaurant } from '../../data/mockData';
import { theme } from '../../theme';

type RestaurantListCardProps = {
  restaurant: Restaurant;
  onPress?: () => void;
  leading?: 'image' | 'pin';
  pinColor?: string;
  showOpenBadge?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function RestaurantListCard({
  restaurant,
  onPress,
  leading = 'image',
  pinColor = theme.colors.primary,
  showOpenBadge = true,
  style,
}: RestaurantListCardProps) {
  const isImage = leading === 'image';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}>
      {isImage ? (
        <View style={styles.imageWrap}>
          <Image source={{ uri: restaurant.image }} style={styles.image} />
          {showOpenBadge && restaurant.isOpen ? (
            <View style={styles.openBadge}>
              <Text style={styles.openText}>Open</Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={[styles.pinWrap, { backgroundColor: pinColor }]}>
          <Ionicons name="location-sharp" size={34} color={theme.colors.surface} />
        </View>
      )}

      <View style={styles.copy}>
        <Text numberOfLines={1} style={styles.name}>
          {restaurant.name}
        </Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

        <View style={styles.metaRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color={theme.colors.gold} />
            <Text style={styles.ratingValue}>{restaurant.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({restaurant.reviewCount})</Text>
            <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
          </View>

          <View style={styles.distanceRow}>
            <Feather name="navigation" size={16} color={theme.colors.danger} />
            <Text style={styles.distance}>{restaurant.distance}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadow.card,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  imageWrap: {
    width: 92,
    height: 92,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  openBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.success,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 5,
  },
  openText: {
    color: theme.colors.surface,
    fontWeight: '700',
    fontSize: theme.typography.sizes.caption,
  },
  pinWrap: {
    width: 60,
    height: 60,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  cuisine: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.mutedText,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
    flex: 1,
  },
  ratingValue: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  reviewCount: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.subtle,
  },
  priceRange: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.mutedText,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  distance: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.danger,
    fontWeight: '600',
  },
});
