import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import type { FeaturedMenuItem } from '../../data/mockData';
import { theme } from '../../theme';

type FeaturedMenuCardProps = {
  item: FeaturedMenuItem;
  width: number;
  onPress?: () => void;
};

export function FeaturedMenuCard({ item, width, onPress }: FeaturedMenuCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}>
      <ImageBackground source={{ uri: item.image }} style={styles.image} imageStyle={styles.imageRadius}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
        <View style={styles.timeBadge}>
          <Ionicons name="time-outline" size={16} color={theme.colors.surface} />
          <Text style={styles.timeText}>{item.availableUntil}</Text>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.originalPrice}>{item.originalPrice}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    ...theme.shadow.card,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  image: {
    height: 194,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
  },
  imageRadius: {
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
  discountBadge: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  discountText: {
    color: theme.colors.surface,
    fontWeight: '700',
    fontSize: theme.typography.sizes.subtitle,
  },
  timeBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: 'rgba(17, 24, 39, 0.72)',
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  timeText: {
    color: theme.colors.surface,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  name: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  restaurantName: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.mutedText,
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
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary,
  },
});
