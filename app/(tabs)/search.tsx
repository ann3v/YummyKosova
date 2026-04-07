import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { EmptyState } from '@/src/components/EmptyState';
import { NoticeBanner } from '@/src/components/NoticeBanner';
import { Screen } from '@/src/components/Screen';
import { StatusCard } from '@/src/components/StatusCard';
import { useAuth } from '@/src/features/auth/AuthProvider';
import { FilterPanel } from '@/src/features/restaurants/FilterPanel';
import { RestaurantCard } from '@/src/features/restaurants/RestaurantCard';
import { getRestaurantDetailHref } from '@/src/features/restaurants/routes';
import { SearchBar } from '@/src/features/restaurants/SearchBar';
import { useRestaurantSearch } from '@/src/features/restaurants/useRestaurantSearch';
import {
  emptyRestaurantSearchFilters,
  type RestaurantSearchFilters,
} from '@/src/features/restaurants/types';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

export default function SearchScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { messages } = useI18n();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<RestaurantSearchFilters>(emptyRestaurantSearchFilters);
  const {
    restaurants,
    isLoading,
    errorMessage,
    mutationErrorMessage,
    pendingRestaurantIds,
    filterOptions,
    isFilterOptionsLoading,
    filterOptionsErrorMessage,
    hasActiveSearch,
    hasActiveFilters,
    refresh,
    toggleSaved,
  } = useRestaurantSearch({
    userId: user?.id,
    query,
    filters,
    loadErrorMessage: messages.restaurants.loadError,
    mutationErrorMessage: messages.restaurants.mutationError,
  });

  const setFilter = (key: keyof RestaurantSearchFilters, value: string | null) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="display">{messages.restaurants.searchTitle}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {messages.restaurants.searchSubtitle}
        </AppText>
      </View>

      <SearchBar
        value={query}
        label={messages.restaurants.searchInputLabel}
        placeholder={messages.restaurants.searchInputPlaceholder}
        hint={messages.restaurants.searchInputHint}
        clearLabel={messages.restaurants.clearSearchAction}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
      />

      {filterOptionsErrorMessage ? (
        <NoticeBanner message={filterOptionsErrorMessage} variant="error" />
      ) : null}
      {mutationErrorMessage ? (
        <NoticeBanner message={mutationErrorMessage} variant="error" />
      ) : null}

      {isFilterOptionsLoading ? (
        <StatusCard
          title={messages.restaurants.filtersTitle}
          message={messages.restaurants.loadingMessage}
          isLoading
        />
      ) : (
        <FilterPanel
          title={messages.restaurants.filtersTitle}
          clearLabel={messages.restaurants.clearFiltersAction}
          hasActiveFilters={hasActiveFilters}
          groups={[
            {
              key: 'city',
              label: messages.restaurants.cityFilterLabel,
              options: filterOptions.cities,
              selectedValue: filters.city,
              onSelect: (value) => setFilter('city', value),
            },
            {
              key: 'cuisine',
              label: messages.restaurants.cuisineFilterLabel,
              options: filterOptions.cuisines,
              selectedValue: filters.cuisine,
              onSelect: (value) => setFilter('cuisine', value),
            },
            {
              key: 'price',
              label: messages.restaurants.priceFilterLabel,
              options: filterOptions.priceRanges,
              selectedValue: filters.priceRange,
              onSelect: (value) => setFilter('priceRange', value),
            },
          ]}
        />
      )}

      {!hasActiveSearch ? (
        <EmptyState
          title={messages.restaurants.searchPromptTitle}
          description={messages.restaurants.searchPromptDescription}
        />
      ) : null}

      {hasActiveSearch ? (
        <View style={styles.resultsHeader}>
          <AppText variant="title">{messages.restaurants.searchResultsTitle}</AppText>
          <AppText variant="body" color={theme.colors.mutedText}>
            {messages.restaurants.searchResultsSubtitle}
          </AppText>
        </View>
      ) : null}

      {hasActiveSearch && isLoading ? (
        <StatusCard
          title={messages.restaurants.searchLoadingTitle}
          message={messages.restaurants.searchLoadingMessage}
          isLoading
        />
      ) : null}

      {hasActiveSearch && !isLoading && errorMessage ? (
        <EmptyState
          title={messages.restaurants.searchResultsTitle}
          description={messages.restaurants.loadError}
          actionLabel={messages.common.retry}
          onActionPress={() => {
            void refresh();
          }}
        />
      ) : null}

      {hasActiveSearch && !isLoading && !errorMessage && restaurants.length === 0 ? (
        <EmptyState
          title={messages.restaurants.searchNoResultsTitle}
          description={messages.restaurants.searchNoResultsDescription}
          actionLabel={messages.restaurants.resetSearchAction}
          onActionPress={() => {
            setQuery('');
            setFilters(emptyRestaurantSearchFilters);
          }}
        />
      ) : null}

      {hasActiveSearch && !isLoading && !errorMessage
        ? restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              saveLabel={messages.restaurants.saveAction}
              savedLabel={messages.restaurants.savedAction}
              featuredLabel={messages.restaurants.featuredBadge}
              ratingLabel={messages.restaurants.ratingLabel}
              onPress={(selectedRestaurant) => {
                router.push(getRestaurantDetailHref(selectedRestaurant.slug));
              }}
              isSavePending={pendingRestaurantIds.includes(restaurant.id)}
              onToggleSaved={(restaurantId, nextSaved) => {
                void toggleSaved(restaurantId, nextSaved);
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
  resultsHeader: {
    gap: theme.spacing.xs,
  },
});
