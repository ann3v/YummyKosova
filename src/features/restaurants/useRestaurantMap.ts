import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { listRestaurantMapItems } from '@/src/features/restaurants/api';
import type { RestaurantMapItem } from '@/src/features/restaurants/types';

type UseRestaurantMapParams = {
  loadErrorMessage: string;
};

export function useRestaurantMap({
  loadErrorMessage,
}: UseRestaurantMapParams) {
  const isFocused = useIsFocused();
  const [restaurants, setRestaurants] = useState<RestaurantMapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const rows = await listRestaurantMapItems();
      setRestaurants(rows);
    } catch {
      setRestaurants([]);
      setErrorMessage(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadErrorMessage]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    void loadRestaurants();
  }, [isFocused, loadRestaurants]);

  return {
    restaurants,
    isLoading,
    errorMessage,
    refresh: loadRestaurants,
  };
}
