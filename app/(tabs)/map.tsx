import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { Screen } from '@/src/components/Screen';
import { StatusCard } from '@/src/components/StatusCard';
import { RestaurantMap } from '@/src/features/restaurants/RestaurantMap';
import { RestaurantMapPreviewCard } from '@/src/features/restaurants/RestaurantMapPreviewCard';
import { getRestaurantDetailHref } from '@/src/features/restaurants/routes';
import { useRestaurantMap } from '@/src/features/restaurants/useRestaurantMap';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

import type { RestaurantMapItem } from '@/src/features/restaurants/types';

export default function MapScreen() {
  const router = useRouter();
  const { messages } = useI18n();
  const {
    restaurants,
    isLoading,
    errorMessage,
    refresh,
  } = useRestaurantMap({
    loadErrorMessage: messages.restaurants.mapLoadError,
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantMapItem | null>(null);

  const selectedRestaurantFromResults = useMemo(
    () =>
      selectedRestaurant
        ? restaurants.find((restaurant) => restaurant.id === selectedRestaurant.id) ?? null
        : null,
    [restaurants, selectedRestaurant]
  );

  if (isLoading) {
    return (
      <Screen contentContainerStyle={styles.stateContent}>
        <StatusCard
          title={messages.restaurants.mapLoadingTitle}
          message={messages.restaurants.mapLoadingMessage}
          isLoading
        />
      </Screen>
    );
  }

  if (errorMessage) {
    return (
      <Screen scrollable contentContainerStyle={styles.stateContent}>
        <EmptyState
          title={messages.restaurants.mapTitle}
          description={messages.restaurants.mapLoadError}
          actionLabel={messages.common.retry}
          onActionPress={() => {
            void refresh();
          }}
        />
      </Screen>
    );
  }

  if (restaurants.length === 0) {
    return (
      <Screen scrollable contentContainerStyle={styles.stateContent}>
        <EmptyState
          title={messages.restaurants.mapEmptyTitle}
          description={messages.restaurants.mapEmptyDescription}
          actionLabel={messages.common.retry}
          onActionPress={() => {
            void refresh();
          }}
        />
      </Screen>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <Screen scrollable contentContainerStyle={styles.stateContent}>
        <View style={styles.resultsHeader}>
          <AppText variant="display">{messages.restaurants.mapTitle}</AppText>
          <AppText variant="body" color={theme.colors.mutedText}>
            {messages.restaurants.mapSubtitle}
          </AppText>
        </View>
        <RestaurantMap
          restaurants={restaurants}
          selectedRestaurantId={selectedRestaurantFromResults?.id}
          onSelectRestaurant={setSelectedRestaurant}
          unsupportedTitle={messages.restaurants.mapUnsupportedTitle}
          unsupportedDescription={messages.restaurants.mapUnsupportedDescription}
        />
      </Screen>
    );
  }

  return (
    <Screen contentContainerStyle={styles.mapContent}>
      <View style={styles.mapContainer}>
        <RestaurantMap
          restaurants={restaurants}
          selectedRestaurantId={selectedRestaurantFromResults?.id}
          onSelectRestaurant={setSelectedRestaurant}
          unsupportedTitle={messages.restaurants.mapUnsupportedTitle}
          unsupportedDescription={messages.restaurants.mapUnsupportedDescription}
        />

        <View style={styles.topOverlay}>
          <View style={styles.overlayCard}>
            <AppText variant="title">{messages.restaurants.mapTitle}</AppText>
            <AppText variant="body" color={theme.colors.mutedText}>
              {messages.restaurants.mapSubtitle}
            </AppText>
          </View>
        </View>

        {selectedRestaurantFromResults ? (
          <View style={styles.bottomOverlay}>
            <RestaurantMapPreviewCard
              restaurant={selectedRestaurantFromResults}
              featuredLabel={messages.restaurants.featuredBadge}
              detailsLabel={messages.restaurants.openDetailsAction}
              onOpenDetails={() => {
                router.push(getRestaurantDetailHref(selectedRestaurantFromResults.slug));
              }}
            />
          </View>
        ) : null}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mapContent: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  stateContent: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  resultsHeader: {
    gap: theme.spacing.sm,
  },
  mapContainer: {
    flex: 1,
  },
  topOverlay: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  bottomOverlay: {
    position: 'absolute',
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
  },
  overlayCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    ...theme.shadow.card,
    gap: theme.spacing.xs,
  },
});
