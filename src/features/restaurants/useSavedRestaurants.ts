import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  listSavedRestaurants,
  unsaveRestaurantForUser,
} from '@/src/features/restaurants/api';
import type { RestaurantListItem } from '@/src/features/restaurants/types';

type UseSavedRestaurantsParams = {
  userId?: string;
  loadErrorMessage: string;
  mutationErrorMessage: string;
};

export function useSavedRestaurants({
  userId,
  loadErrorMessage,
  mutationErrorMessage,
}: UseSavedRestaurantsParams) {
  const isFocused = useIsFocused();
  const [restaurants, setRestaurants] = useState<RestaurantListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [mutationErrorMessageState, setMutationErrorMessageState] = useState('');
  const [pendingRestaurantIds, setPendingRestaurantIds] = useState<string[]>([]);

  const loadSavedRestaurants = useCallback(async () => {
    if (!userId) {
      setRestaurants([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const savedRestaurants = await listSavedRestaurants(userId);
      setRestaurants(savedRestaurants);
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

    void loadSavedRestaurants();
  }, [isFocused, loadSavedRestaurants]);

  const unsaveRestaurant = async (restaurantId: string) => {
    if (!userId) {
      return;
    }

    setMutationErrorMessageState('');
    setPendingRestaurantIds((current) => [...current, restaurantId]);

    try {
      await unsaveRestaurantForUser(userId, restaurantId);
      setRestaurants((current) =>
        current.filter((restaurant) => restaurant.id !== restaurantId)
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
    refresh: loadSavedRestaurants,
    unsaveRestaurant,
  };
}
