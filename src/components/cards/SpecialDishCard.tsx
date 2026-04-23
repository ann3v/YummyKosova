import { Image, StyleSheet, Text, View } from 'react-native';

import type { Restaurant } from '../../data/mockData';
import { theme } from '../../theme';

type SpecialDishCardProps = {
  restaurant: Restaurant;
};

export function SpecialDishCard({ restaurant }: SpecialDishCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.todaySpecial.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.todaySpecial.name}</Text>
        <Text style={styles.description}>{restaurant.todaySpecial.description}</Text>

        <View style={styles.footer}>
          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>{restaurant.todaySpecial.originalPrice}</Text>
            <Text style={styles.price}>{restaurant.todaySpecial.price}</Text>
          </View>

          <View style={styles.discountBadge}>
            <Text style={styles.discount}>{restaurant.todaySpecial.discount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    flexDirection: 'row',
    ...theme.shadow.card,
  },
  image: {
    width: 130,
    height: 152,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.mutedText,
  },
  footer: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  originalPrice: {
    fontSize: theme.typography.sizes.display,
    color: theme.colors.subtle,
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  discountBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  discount: {
    color: theme.colors.surface,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: '700',
  },
});
