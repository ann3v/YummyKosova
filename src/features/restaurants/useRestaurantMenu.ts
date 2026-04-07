import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { listRestaurantMenu } from '@/src/features/restaurants/api';
import type { MenuCategory } from '@/src/features/restaurants/types';

type UseRestaurantMenuParams = {
  restaurantId?: string;
  loadErrorMessage: string;
};

export function useRestaurantMenu({
  restaurantId,
  loadErrorMessage,
}: UseRestaurantMenuParams) {
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadMenu = useCallback(async () => {
    if (!restaurantId) {
      setCategories([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const menuCategories = await listRestaurantMenu(restaurantId);
      setCategories(menuCategories);
    } catch {
      setCategories([]);
      setErrorMessage(loadErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [loadErrorMessage, restaurantId]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    void loadMenu();
  }, [isFocused, loadMenu]);

  return {
    categories,
    isLoading,
    errorMessage,
    refresh: loadMenu,
  };
}
