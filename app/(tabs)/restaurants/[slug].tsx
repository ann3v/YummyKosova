import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { EmptyState } from '@/src/components/EmptyState';
import { LoadingState } from '@/src/components/LoadingState';
import { NoticeBanner } from '@/src/components/NoticeBanner';
import { Screen } from '@/src/components/Screen';
import { MenuSection } from '@/src/features/restaurants/MenuSection';
import { RestaurantGallery } from '@/src/features/restaurants/RestaurantGallery';
import { useAuth } from '@/src/features/auth/AuthProvider';
import { RestaurantBadge } from '@/src/features/restaurants/RestaurantBadge';
import { RestaurantPlaceholderSection } from '@/src/features/restaurants/RestaurantPlaceholderSection';
import { useRestaurantDetail } from '@/src/features/restaurants/useRestaurantDetail';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailIconWrap}>
        <Ionicons name={icon} size={16} color={theme.colors.primary} />
      </View>
      <View style={styles.detailCopy}>
        <AppText variant="caption" color={theme.colors.mutedText}>
          {label}
        </AppText>
        <AppText variant="body">{value}</AppText>
      </View>
    </View>
  );
}

export default function RestaurantDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { user } = useAuth();
  const { messages } = useI18n();
  const {
    restaurant,
    isLoading,
    errorMessage,
    mutationErrorMessage,
    isSavePending,
    refresh,
    toggleSaved,
  } = useRestaurantDetail({
    slug,
    userId: user?.id,
    loadErrorMessage: messages.restaurants.loadError,
    mutationErrorMessage: messages.restaurants.mutationError,
  });

  if (isLoading) {
    return (
      <LoadingState
        title={messages.restaurants.loadingTitle}
        message={messages.restaurants.loadingMessage}
      />
    );
  }

  if (errorMessage && !restaurant) {
    return (
      <Screen scrollable contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <AppButton
            label={messages.common.back}
            variant="ghost"
            fullWidth={false}
            onPress={() => router.back()}
          />
        </View>

        <NoticeBanner message={errorMessage} variant="error" />
        <EmptyState
          title={messages.restaurants.detailEmptyTitle}
          description={messages.restaurants.loadError}
          actionLabel={messages.common.retry}
          onActionPress={() => {
            void refresh();
          }}
        />
      </Screen>
    );
  }

  if (!restaurant) {
    return (
      <Screen scrollable contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <AppButton
            label={messages.common.back}
            variant="ghost"
            fullWidth={false}
            onPress={() => router.back()}
          />
        </View>

        <EmptyState
          title={messages.restaurants.detailEmptyTitle}
          description={messages.restaurants.detailEmptyDescription}
          actionLabel={messages.restaurants.browseAction}
          onActionPress={() => {
            router.replace('/home');
          }}
        />
      </Screen>
    );
  }

  const locationValue = restaurant.address
    ? `${restaurant.city} · ${restaurant.address}`
    : restaurant.city;
  const mapNote =
    restaurant.latitude !== null && restaurant.longitude !== null
      ? `${restaurant.latitude.toFixed(4)}, ${restaurant.longitude.toFixed(4)}`
      : undefined;

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <AppButton
          label={messages.common.back}
          variant="ghost"
          fullWidth={false}
          onPress={() => router.back()}
        />
        <AppButton
          label={restaurant.isSaved ? messages.restaurants.savedAction : messages.restaurants.saveAction}
          variant={restaurant.isSaved ? 'secondary' : 'primary'}
          fullWidth={false}
          isLoading={isSavePending}
          onPress={() => {
            void toggleSaved(!restaurant.isSaved);
          }}
        />
      </View>

      {mutationErrorMessage ? (
        <NoticeBanner message={mutationErrorMessage} variant="error" />
      ) : null}

      <RestaurantGallery
        images={restaurant.images}
        restaurantName={restaurant.name}
        title={messages.restaurants.photosTitle}
        subtitle={messages.restaurants.photosSubtitle}
      />

      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText variant="display" style={styles.title}>
            {restaurant.name}
          </AppText>
          {restaurant.description ? (
            <AppText variant="body" color={theme.colors.mutedText}>
              {restaurant.description}
            </AppText>
          ) : null}
        </View>

        <View style={styles.metaRow}>
          {restaurant.isFeatured ? (
            <RestaurantBadge label={messages.restaurants.featuredBadge} tone="accent" />
          ) : null}
          {restaurant.cuisine ? <RestaurantBadge label={restaurant.cuisine} /> : null}
          {restaurant.priceRange ? <RestaurantBadge label={restaurant.priceRange} /> : null}
        </View>
      </View>

      <Card style={styles.infoCard}>
        <DetailRow
          icon="location-outline"
          label={messages.restaurants.locationLabel}
          value={locationValue}
        />
        {restaurant.cuisine ? (
          <DetailRow
            icon="restaurant-outline"
            label={messages.restaurants.cuisineLabel}
            value={restaurant.cuisine}
          />
        ) : null}
        {restaurant.priceRange ? (
          <DetailRow
            icon="cash-outline"
            label={messages.restaurants.priceRangeLabel}
            value={restaurant.priceRange}
          />
        ) : null}
        {restaurant.phone ? (
          <DetailRow
            icon="call-outline"
            label={messages.restaurants.phoneLabel}
            value={restaurant.phone}
          />
        ) : null}
        {restaurant.website ? (
          <DetailRow
            icon="globe-outline"
            label={messages.restaurants.websiteLabel}
            value={restaurant.website}
          />
        ) : null}

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color={theme.colors.gold} />
          <AppText variant="label">
            {messages.restaurants.ratingLabel}: {restaurant.rating?.toFixed(1) ?? 'N/A'}
          </AppText>
        </View>
      </Card>

      <MenuSection
        restaurantId={restaurant.id}
        title={messages.restaurants.menuSectionTitle}
        subtitle={messages.restaurants.menuSectionSubtitle}
        loadingTitle={messages.restaurants.menuLoadingTitle}
        loadingMessage={messages.restaurants.menuLoadingMessage}
        emptyTitle={messages.restaurants.menuEmptyTitle}
        emptyDescription={messages.restaurants.menuEmptyDescription}
        loadErrorMessage={messages.restaurants.menuLoadError}
        retryLabel={messages.common.retry}
      />

      <RestaurantPlaceholderSection
        icon="map-outline"
        title={messages.restaurants.mapPlaceholderTitle}
        description={messages.restaurants.mapPlaceholderDescription}
        note={mapNote}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  header: {
    gap: theme.spacing.md,
  },
  headerCopy: {
    gap: theme.spacing.sm,
  },
  title: {
    maxWidth: 320,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  infoCard: {
    gap: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  detailIconWrap: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primarySoft,
  },
  detailCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.xs,
  },
});
