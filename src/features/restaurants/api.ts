import { supabase } from '@/src/lib/supabase';

import {
  mapRestaurantRecord,
  type RestaurantListItem,
  type RestaurantRecord,
} from '@/src/features/restaurants/types';

const restaurantSelect = `
  id,
  name,
  slug,
  description,
  city,
  address,
  cuisine,
  price_range,
  rating,
  latitude,
  longitude,
  phone,
  website,
  is_featured,
  restaurant_images (
    id,
    image_url,
    alt_text,
    sort_order
  )
`;

type SavedRestaurantRow = {
  restaurant_id: string;
  restaurants: RestaurantRecord | RestaurantRecord[] | null;
};

export async function listRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select(restaurantSelect)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as RestaurantRecord[]).map((restaurant) => mapRestaurantRecord(restaurant));
}

export async function listSavedRestaurantIds(userId: string) {
  const { data, error } = await supabase
    .from('saved_restaurants')
    .select('restaurant_id')
    .eq('user_id', userId);

  if (error) {
    throw error;
  }

  return (data ?? []).map((item) => item.restaurant_id as string);
}

export async function listSavedRestaurants(userId: string) {
  const { data, error } = await supabase
    .from('saved_restaurants')
    .select(
      `
        restaurant_id,
        restaurants!inner (
          ${restaurantSelect}
        )
      `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return ((data ?? []) as SavedRestaurantRow[])
    .map((row) => {
      const restaurant = Array.isArray(row.restaurants) ? row.restaurants[0] : row.restaurants;

      if (!restaurant) {
        return null;
      }

      return mapRestaurantRecord(restaurant, true);
    })
    .filter((restaurant): restaurant is RestaurantListItem => restaurant !== null);
}

export async function saveRestaurantForUser(userId: string, restaurantId: string) {
  const { error } = await supabase.from('saved_restaurants').insert({
    user_id: userId,
    restaurant_id: restaurantId,
  });

  if (error && error.code !== '23505') {
    throw error;
  }
}

export async function unsaveRestaurantForUser(userId: string, restaurantId: string) {
  const { error } = await supabase
    .from('saved_restaurants')
    .delete()
    .eq('user_id', userId)
    .eq('restaurant_id', restaurantId);

  if (error) {
    throw error;
  }
}
