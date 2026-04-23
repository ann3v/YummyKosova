import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ActiveOffer } from '../../data/mockData';
import { theme } from '../../theme';

type OfferGradientCardProps = {
  offer: ActiveOffer;
};

export function OfferGradientCard({ offer }: OfferGradientCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
      <LinearGradient colors={offer.colors} style={styles.card}>
        <View style={styles.copy}>
          <View style={styles.titleRow}>
            <Ionicons name="gift-outline" size={28} color={theme.colors.surface} />
            <Text style={styles.title}>{offer.title}</Text>
          </View>
          <Text style={styles.venue}>{offer.venue}</Text>
          <Text style={styles.schedule}>{offer.schedule}</Text>
        </View>
        <Ionicons name="chevron-forward" size={26} color={theme.colors.surface} />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...theme.shadow.card,
  },
  card: {
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  copy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  title: {
    flex: 1,
    color: theme.colors.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  venue: {
    color: theme.colors.surface,
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.96,
  },
  schedule: {
    color: theme.colors.surface,
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.88,
  },
});
