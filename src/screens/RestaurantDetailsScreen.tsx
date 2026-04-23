import { Feather, Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getRestaurantById } from '../data/mockData';
import { PromotionStrip } from '../components/cards/PromotionStrip';
import { ReviewCard } from '../components/cards/ReviewCard';
import { SpecialDishCard } from '../components/cards/SpecialDishCard';
import { IconCircleButton } from '../components/common/IconCircleButton';
import { Pill } from '../components/common/Pill';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SectionTitle } from '../components/common/SectionTitle';
import { Screen } from '../components/layout/Screen';
import { MenuAccordion } from '../components/restaurant/MenuAccordion';
import { theme } from '../theme';

type RestaurantDetailsRoute = RouteProp<
  { RestaurantDetails: { restaurantId: string } },
  'RestaurantDetails'
>;

type RestaurantDetailsScreenProps = {
  navigation: NavigationProp<ParamListBase>;
  route: RestaurantDetailsRoute;
};

function DetailRow({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={24} color={theme.colors.mutedText} />
      <Text style={styles.detailText}>{value}</Text>
    </View>
  );
}

export function RestaurantDetailsScreen({ navigation, route }: RestaurantDetailsScreenProps) {
  const restaurant = getRestaurantById(route.params.restaurantId);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!restaurant) {
    return null;
  }

  return (
    <Screen>
      <ImageBackground source={{ uri: restaurant.heroImage }} style={styles.hero}>
        <View style={styles.heroOverlay} />

        <View style={styles.heroActions}>
          <IconCircleButton variant="light" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={theme.colors.heading} />
          </IconCircleButton>

          <View style={styles.heroActionRight}>
            <IconCircleButton variant="light">
              <Ionicons name="share-social-outline" size={24} color={theme.colors.heading} />
            </IconCircleButton>
            <IconCircleButton variant="light" onPress={() => setIsFavorite((current) => !current)}>
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? theme.colors.primary : theme.colors.heading}
              />
            </IconCircleButton>
          </View>
        </View>

        {restaurant.isOpen ? <Pill label="Open Now" tone="success" /> : null}
      </ImageBackground>

      <View style={styles.sheet}>
        <View style={styles.headerBlock}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.tagline}>{restaurant.tagline}</Text>

          <View style={styles.ratingMetaRow}>
            <View style={styles.ratingGroup}>
              <Ionicons name="star" size={28} color={theme.colors.gold} />
              
              <Text style={styles.ratingValue}>
                {restaurant.rating.toFixed(1)} <Text style={styles.reviewCount}>({restaurant.reviewCount} reviews)</Text>
              </Text>
            </View>
            <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
          </View>

          <View style={styles.detailList}>
            <DetailRow icon="location-outline" value={restaurant.address} />
            <DetailRow icon="call-outline" value={restaurant.phone} />
            <DetailRow icon="time-outline" value={`Open: ${restaurant.hours}`} />
          </View>
        </View>

        <View style={styles.actionButtons}>
          <PrimaryButton
            label={`Get Directions (${restaurant.distance})`}
            icon={<Feather name="navigation" size={22} color={theme.colors.surface} />}
            textStyle={styles.actionButtonText}
          />
          <PrimaryButton
            label="Book a Table"
            onPress={() => navigation.navigate('BookTable', { restaurantId: restaurant.id })}
            textStyle={styles.actionButtonText}
          />
        </View>

        <View style={styles.softSection}>
          <SectionTitle
            title="Today's Special"
            icon={<Ionicons name="star" size={24} color={theme.colors.gold} />}
          />
          <SpecialDishCard restaurant={restaurant} />
        </View>

        <View style={styles.section}>
          <SectionTitle title="Active Promotions" />
          <View style={styles.listGap}>
            {restaurant.promotions.map((promotion) => (
              <PromotionStrip key={promotion.id} promotion={promotion} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Menu" />
          <View style={styles.listGap}>
            {restaurant.menuSections.map((section) => (
              <MenuAccordion key={section.id} section={section} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionTitle title="Reviews" />
          <View style={styles.listGap}>
            {restaurant.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        </View>

        <PrimaryButton
          label="Book a Table"
          onPress={() => navigation.navigate('BookTable', { restaurantId: restaurant.id })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 340,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: theme.spacing.xxxl,
    paddingBottom: theme.spacing.xxxl,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17, 24, 39, 0.4)',
  },
  heroActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  heroActionRight: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  sheet: {
    marginTop: -28,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xxl,
    borderTopRightRadius: theme.radius.xxl,
    paddingHorizontal: theme.spacing.xxl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxxxl,
    gap: theme.spacing.xxxl,
  },
  headerBlock: {
    gap: theme.spacing.lg,
  },
  name: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    color: theme.colors.heading,
  },
  tagline: {
    fontSize: 16,
    color: theme.colors.mutedText,
  },
  ratingMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  ratingGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.heading,
  },
  reviewCount: {
    fontWeight: '400',
    color: theme.colors.mutedText,
  },
  priceRange: {
    fontSize: 22,
    color: theme.colors.heading,
  },
  detailList: {
    gap: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  detailText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.mutedText,
  },
  actionButtons: {
    gap: theme.spacing.xl,
  },
  actionButtonText: {
    fontSize: 18,
    lineHeight: 24,
  },
  softSection: {
    gap: theme.spacing.xl,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
  },
  section: {
    gap: theme.spacing.xl,
  },
  listGap: {
    gap: theme.spacing.xl,
  },
});
