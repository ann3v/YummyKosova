import { useCallback, useEffect, useMemo, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  listRestaurantFilterOptions,
  listSavedRestaurantIds,
  saveRestaurantForUser,
  searchRestaurants,
  unsaveRestaurantForUser,
} from '@/src/features/restaurants/api';
import {
  emptyRestaurantSearchFilters,
  type RestaurantFilterOptions,
  type RestaurantListItem,
  type RestaurantSearchFilters,
} from '@/src/features/restaurants/types';

type UseRestaurantSearchParams = {
  userId?: string;
  query: string;
  filters: RestaurantSearchFilters;
  loadErrorMessage: string;
  mutationErrorMessage: string;
};

const emptyFilterOptions: RestaurantFilterOptions = {
  cities: [],
  cuisines: [],
  priceRanges: [],
};

export function useRestaurantSearch({
  userId,
  query,
  filters,
  loadErrorMessage,
  mutationErrorMessage,
}: UseRestaurantSearchParams) {
  const isFocused = useIsFocused();
  const [restaurants, setRestaurants] = useState<RestaurantListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mutationErrorMessageState, setMutationErrorMessageState] = useState('');
  const [pendingRestaurantIds, setPendingRestaurantIds] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<RestaurantFilterOptions>(emptyFilterOptions);
  const [isFilterOptionsLoading, setIsFilterOptionsLoading] = useState(true);
  const [filterOptionsErrorMessage, setFilterOptionsErrorMessage] = useState('');

  const normalizedQuery = query.trim();
  const hasActiveFilters = useMemo(
    () =>
      filters.city !== emptyRestaurantSearchFilters.city ||
      filters.cuisine !== emptyRestaurantSearchFilters.cuisine ||
      filters.priceRange !== emptyRestaurantSearchFilters.priceRange,
    [filters]
  );
  const hasActiveSearch = normalizedQuery.length > 0 || hasActiveFilters;

  const loadFilterOptions = useCallback(async () => {
    setIsFilterOptionsLoading(true);
    setFilterOptionsErrorMessage('');

    try {
      const options = await listRestaurantFilterOptions();
      setFilterOptions(options);
    } catch {
      setFilterOptions(emptyFilterOptions);
      setFilterOptionsErrorMessage(loadErrorMessage);
    } finally {
      setIsFilterOptionsLoading(false);
    }
  }, [loadErrorMessage]);

  const loadResults = useCallback(async () => {
    if (!hasActiveSearch) {
      setRestaurants([]);
      setErrorMessage('');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const [restaurantRows, savedRestaurantIds] = await Promise.all([
        searchRestaurants(normalizedQuery, filters),
        userId ? listSavedRestaurantIds(userId) : Promise.resolve([] as string[]),
      ]);

      setRestaurants(
        restaurantRows.map((restaurant) => ({
          ...restaurant,
          isSaved: savedRestaurantIds.includes(restaurant.id),
        }))
      );
    } catch {
      setRestaurants([]);
      setErrorMessage(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [filters, hasActiveSearch, loadErrorMessage, normalizedQuery, userId]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    void loadFilterOptions();
  }, [isFocused, loadFilterOptions]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (!hasActiveSearch) {
      setRestaurants([]);
      setErrorMessage('');
      setIsLoading(false);
      return;
    }

    const timeout = setTimeout(() => {
      void loadResults();
    }, 250);

    return () => clearTimeout(timeout);
  }, [hasActiveSearch, isFocused, loadResults]);

  const toggleSaved = async (restaurantId: string, shouldSave: boolean) => {
    if (!userId) {
      return;
    }

    setMutationErrorMessageState('');
    setPendingRestaurantIds((current) => [...current, restaurantId]);

    try {
      if (shouldSave) {
        await saveRestaurantForUser(userId, restaurantId);
      } else {
        await unsaveRestaurantForUser(userId, restaurantId);
      }

      setRestaurants((current) =>
        current.map((restaurant) =>
          restaurant.id === restaurantId
            ? { ...restaurant, isSaved: shouldSave }
            : restaurant
        )
      );
    } catch {
      setMutationErrorMessageState(mutationErrorMessage);
    } finally {
      setPendingRestaurantIds((current) => current.filter((id) => id !== restaurantId));
    }
  };

  return {
    restaurants,
    isLoading,
    errorMessage,
    mutationErrorMessage: mutationErrorMessageState,
    pendingRestaurantIds,
    filterOptions,
    isFilterOptionsLoading,
    filterOptionsErrorMessage,
    hasActiveSearch,
    hasActiveFilters,
    refresh: loadResults,
    toggleSaved,
  };
}
