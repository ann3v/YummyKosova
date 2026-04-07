import type { RestaurantMapItem } from '@/src/features/restaurants/types';

export type RestaurantMapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export const kosovoMapRegion: RestaurantMapRegion = {
  latitude: 42.6026,
  longitude: 20.903,
  latitudeDelta: 0.62,
  longitudeDelta: 0.62,
};

export function getRestaurantMapRegion(
  restaurants: RestaurantMapItem[]
): RestaurantMapRegion {
  if (restaurants.length === 0) {
    return kosovoMapRegion;
  }

  const latitudes = restaurants.map((restaurant) => restaurant.latitude);
  const longitudes = restaurants.map((restaurant) => restaurant.longitude);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  const latitude = (minLatitude + maxLatitude) / 2;
  const longitude = (minLongitude + maxLongitude) / 2;
  const latitudeDelta = Math.max((maxLatitude - minLatitude) * 1.6, 0.14);
  const longitudeDelta = Math.max((maxLongitude - minLongitude) * 1.6, 0.14);

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}
