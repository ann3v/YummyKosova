import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import {
  getRestaurantBySlug,
  isRestaurantSavedForUser,
  saveRestaurantForUser,
  unsaveRestaurantForUser,
} from '@/src/features/restaurants/api';
import type { RestaurantDetail } from '@/src/features/restaurants/types';

type UseRestaurantDetailParams = {
  slug?: string;
  userId?: string;
  loadErrorMessage: string;
  mutationErrorMessage: string;
};

export function useRestaurantDetail({
  slug,
  userId,
  loadErrorMessage,
  mutationErrorMessage,
}: UseRestaurantDetailParams) {
  const isFocused = useIsFocused();
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [mutationErrorMessageState, setMutationErrorMessageState] = useState('');
  const [isSavePending, setIsSavePending] = useState(false);

  const loadRestaurant = useCallback(async () => {
    if (!slug) {
      setRestaurant(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setRestaurant(null);

    try {
      const restaurantDetail = await getRestaurantBySlug(slug);

      if (!restaurantDetail) {
        setRestaurant(null);
        return;
      }

      if (!userId) {
        setRestaurant(restaurantDetail);
        return;
      }

      const isSaved = await isRestaurantSavedForUser(userId, restaurantDetail.id);
      setRestaurant({ ...restaurantDetail, isSaved });
    } catch {
      setRestaurant(null);
      setErrorMessage(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadErrorMessage, slug, userId]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    void loadRestaurant();
  }, [isFocused, loadRestaurant]);

  const toggleSaved = async (shouldSave: boolean) => {
    if (!userId || !restaurant) {
      return;
    }

    setMutationErrorMessageState('');
    setIsSavePending(true);

    try {
      if (shouldSave) {
        await saveRestaurantForUser(userId, restaurant.id);
      } else {
        await unsaveRestaurantForUser(userId, restaurant.id);
      }

      setRestaurant((current) =>
        current ? { ...current, isSaved: shouldSave } : current
      );
    } catch {
      setMutationErrorMessageState(mutationErrorMessage);
    } finally {
      setIsSavePending(false);
    }
  };

  return {
    restaurant,
    isLoading,
    errorMessage,
    mutationErrorMessage: mutationErrorMessageState,
    isSavePending,
    refresh: loadRestaurant,
    toggleSaved,
  };
}
