import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  listRestaurants,
  listSavedRestaurantIds,
  saveRestaurantForUser,
  unsaveRestaurantForUser,
} from '@/src/features/restaurants/api';
import type { RestaurantListItem } from '@/src/features/restaurants/types';

type UseRestaurantCatalogParams = {
  userId?: string;
  loadErrorMessage: string;
  mutationErrorMessage: string;
};

export function useRestaurantCatalog({
  userId,
  loadErrorMessage,
  mutationErrorMessage,
}: UseRestaurantCatalogParams) {
  const isFocused = useIsFocused();
  const [restaurants, setRestaurants] = useState<RestaurantListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [mutationErrorMessageState, setMutationErrorMessageState] = useState('');
  const [pendingRestaurantIds, setPendingRestaurantIds] = useState<string[]>([]);

  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const [restaurantRows, savedRestaurantIds] = await Promise.all([
        listRestaurants(),
        userId ? listSavedRestaurantIds(userId) : Promise.resolve([] as string[]),
      ]);

      setRestaurants(
        restaurantRows.map((restaurant) => ({
          ...restaurant,
          isSaved: savedRestaurantIds.includes(restaurant.id),
        }))
      );
    } catch {
      setErrorMessage(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadErrorMessage, userId]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    void loadRestaurants();
  }, [isFocused, loadRestaurants]);

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
    refresh: loadRestaurants,
    toggleSaved,
  };
}
