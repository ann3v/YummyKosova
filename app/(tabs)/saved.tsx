import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { LoadingState } from '@/src/components/LoadingState';
import { NoticeBanner } from '@/src/components/NoticeBanner';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/features/auth/AuthProvider';
import { RestaurantCard } from '@/src/features/restaurants/RestaurantCard';
import { useSavedRestaurants } from '@/src/features/restaurants/useSavedRestaurants';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

export default function SavedScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { messages } = useI18n();
  const {
    restaurants,
    isLoading,
    errorMessage,
    mutationErrorMessage,
    pendingRestaurantIds,
    refresh,
    unsaveRestaurant,
  } = useSavedRestaurants({
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

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <AppText variant="display">{messages.restaurants.savedTitle}</AppText>
          <AppText variant="body" color={theme.colors.mutedText}>
            {messages.restaurants.savedSubtitle}
          </AppText>
        </View>
      </View>

      {errorMessage ? <NoticeBanner message={errorMessage} variant="error" /> : null}
      {mutationErrorMessage ? (
        <NoticeBanner message={mutationErrorMessage} variant="error" />
      ) : null}

      {!errorMessage && restaurants.length === 0 ? (
        <EmptyState
          title={messages.restaurants.savedEmptyTitle}
          description={messages.restaurants.savedEmptyDescription}
          actionLabel={messages.restaurants.browseAction}
          onActionPress={() => {
            router.push('/(tabs)');
          }}
        />
      ) : null}

      {errorMessage ? (
        <EmptyState
          title={messages.restaurants.savedTitle}
          description={messages.restaurants.loadError}
          actionLabel={messages.common.retry}
          onActionPress={() => {
            void refresh();
          }}
        />
      ) : null}

      {!errorMessage
        ? restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              saveLabel={messages.restaurants.saveAction}
              savedLabel={messages.restaurants.savedAction}
              featuredLabel={messages.restaurants.featuredBadge}
              ratingLabel={messages.restaurants.ratingLabel}
              isSavePending={pendingRestaurantIds.includes(restaurant.id)}
              onToggleSaved={(restaurantId) => {
                void unsaveRestaurant(restaurantId);
              }}
            />
          ))
        : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    gap: theme.spacing.sm,
  },
  headerCopy: {
    gap: theme.spacing.sm,
  },
});
