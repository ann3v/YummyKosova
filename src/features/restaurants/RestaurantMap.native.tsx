import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { getRestaurantMapRegion } from '@/src/features/restaurants/map-utils';
import { theme } from '@/src/theme';

import type { RestaurantMapItem } from '@/src/features/restaurants/types';

type RestaurantMapProps = {
  restaurants: RestaurantMapItem[];
  selectedRestaurantId?: string;
  onSelectRestaurant: (restaurant: RestaurantMapItem | null) => void;
};

export function RestaurantMap({
  restaurants,
  selectedRestaurantId,
  onSelectRestaurant,
}: RestaurantMapProps) {
  return (
    <MapView
      style={styles.map}
      initialRegion={getRestaurantMapRegion(restaurants)}
      onPress={() => onSelectRestaurant(null)}
      showsCompass={false}
      showsPointsOfInterest={false}
      toolbarEnabled={false}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          title={restaurant.name}
          description={restaurant.city}
          pinColor={
            restaurant.id === selectedRestaurantId
              ? theme.colors.primary
              : theme.colors.accent
          }
          onPress={() => onSelectRestaurant(restaurant)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
