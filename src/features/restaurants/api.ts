import { supabase } from '@/src/lib/supabase';

import {
  emptyRestaurantSearchFilters,
  type RestaurantFilterOptions,
  mapMenuCategoryRecord,
  mapRestaurantDetailRecord,
  mapRestaurantMapRecord,
  mapRestaurantRecord,
  type MenuCategory,
  type MenuCategoryRecord,
  type RestaurantCoordinatesRecord,
  type RestaurantDetail,
  type RestaurantListItem,
  type RestaurantMapItem,
  type RestaurantRecord,
  type RestaurantSummaryRecord,
  type RestaurantSearchFilters,
} from '@/src/features/restaurants/types';

const restaurantImageSelect = `
  restaurant_images (
    id,
    image_url,
    alt_text,
    sort_order
  )
`;

const restaurantSummarySelect = `
  id,
  name,
  slug,
  description,
  city,
  address,
  cuisine,
  price_range,
  rating,
  is_featured,
  ${restaurantImageSelect}
`;

const restaurantCoordinatesSelect = `
  ${restaurantSummarySelect},
  latitude,
  longitude
`;

const restaurantDetailSelect = `
  ${restaurantCoordinatesSelect},
  phone,
  website,
  is_published
`;

const menuCategorySelect = `
  id,
  restaurant_id,
  name,
  description,
  sort_order,
  is_active,
  menu_items (
    id,
    name,
    description,
    price,
    image_url,
    image_alt_text,
    sort_order,
    is_available,
    availability_note
  )
`;

type SavedRestaurantRow = {
  restaurant_id: string;
  restaurants: RestaurantSummaryRecord | RestaurantSummaryRecord[] | null;
};

type RestaurantFilterRow = {
  city: string | null;
  cuisine: string | null;
  price_range: string | null;
};

function buildPublishedRestaurantRequest({
  select,
  query = '',
  filters = emptyRestaurantSearchFilters,
  requireCoordinates = false,
}: {
  select: string;
  query?: string;
  filters?: RestaurantSearchFilters;
  requireCoordinates?: boolean;
}) {
  const keywordFilter = buildRestaurantKeywordSearch(query);
  const normalizedFilters = {
    city: filters.city?.trim() || null,
    cuisine: filters.cuisine?.trim() || null,
    priceRange: filters.priceRange?.trim() || null,
  };

  let request = supabase
    .from('restaurants')
    .select(select)
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('name', { ascending: true });

  if (requireCoordinates) {
    request = request.not('latitude', 'is', null).not('longitude', 'is', null);
  }

  if (normalizedFilters.city) {
    request = request.eq('city', normalizedFilters.city);
  }

  if (normalizedFilters.cuisine) {
    request = request.eq('cuisine', normalizedFilters.cuisine);
  }

  if (normalizedFilters.priceRange) {
    request = request.eq('price_range', normalizedFilters.priceRange);
  }

  if (keywordFilter) {
    request = request.or(keywordFilter);
  }

  return request;
}

export async function listRestaurants() {
  const { data, error } = await buildPublishedRestaurantRequest({
    select: restaurantSummarySelect,
  });

  if (error) {
    throw error;
  }

  return ((data ?? []) as unknown as RestaurantSummaryRecord[]).map((restaurant) =>
    mapRestaurantRecord(restaurant)
  );
}

export async function listRestaurantMapItems(
  query = '',
  filters: RestaurantSearchFilters = emptyRestaurantSearchFilters
): Promise<RestaurantMapItem[]> {
  const request = buildPublishedRestaurantRequest({
    select: restaurantCoordinatesSelect,
    query,
    filters,
    requireCoordinates: true,
  });
  const { data, error } = await request;

  if (error) {
    throw error;
  }

  return ((data ?? []) as unknown as RestaurantCoordinatesRecord[])
    .map((restaurant) => mapRestaurantMapRecord(restaurant))
    .filter((restaurant): restaurant is RestaurantMapItem => restaurant !== null);
}

function buildRestaurantKeywordSearch(query: string) {
  const term = query
    .trim()
    .replace(/[,%]/g, ' ')
    .replace(/\s+/g, ' ');

  if (!term) {
    return '';
  }

  const wildcard = `%${term}%`;
  return [
    `name.ilike.${wildcard}`,
    `cuisine.ilike.${wildcard}`,
    `description.ilike.${wildcard}`,
    `city.ilike.${wildcard}`,
  ].join(',');
}

export async function searchRestaurants(
  query: string,
  filters: RestaurantSearchFilters = emptyRestaurantSearchFilters
) {
  const request = buildPublishedRestaurantRequest({
    select: restaurantSummarySelect,
    query,
    filters,
  });
  const { data, error } = await request;

  if (error) {
    throw error;
  }

  return ((data ?? []) as unknown as RestaurantSummaryRecord[]).map((restaurant) =>
    mapRestaurantRecord(restaurant)
  );
}

export async function listRestaurantFilterOptions(): Promise<RestaurantFilterOptions> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('city,cuisine,price_range')
    .eq('is_published', true)
    .order('city', { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as RestaurantFilterRow[];

  const uniqueSorted = (values: (string | null)[]) =>
    [...new Set(values.filter((value): value is string => Boolean(value?.trim())))]
      .sort((left, right) => left.localeCompare(right));

  return {
    cities: uniqueSorted(rows.map((row) => row.city)),
    cuisines: uniqueSorted(rows.map((row) => row.cuisine)),
    priceRanges: uniqueSorted(rows.map((row) => row.price_range)),
  };
}

export async function getRestaurantBySlug(slug: string): Promise<RestaurantDetail | null> {
  const { data, error } = await supabase
    .from('restaurants')
    .select(restaurantDetailSelect)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapRestaurantDetailRecord(data as RestaurantRecord);
}

export async function listRestaurantMenu(restaurantId: string): Promise<MenuCategory[]> {
  const { data, error } = await supabase
    .from('menu_categories')
    .select(menuCategorySelect)
    .eq('restaurant_id', restaurantId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('sort_order', { foreignTable: 'menu_items', ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as MenuCategoryRecord[])
    .map((category) => mapMenuCategoryRecord(category))
    .filter((category) => category.items.length > 0);
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

export async function isRestaurantSavedForUser(userId: string, restaurantId: string) {
  const { data, error } = await supabase
    .from('saved_restaurants')
    .select('restaurant_id')
    .eq('user_id', userId)
    .eq('restaurant_id', restaurantId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function listSavedRestaurants(userId: string) {
  const { data, error } = await supabase
    .from('saved_restaurants')
    .select(
      `
        restaurant_id,
        restaurants!inner (
          ${restaurantSummarySelect}
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
