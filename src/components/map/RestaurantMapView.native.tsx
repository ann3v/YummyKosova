import { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import type { MapRegion, Restaurant } from '../../data/mockData';
import { theme } from '../../theme';

type RestaurantMapViewProps = {
  restaurants: Restaurant[];
  region: MapRegion;
  selectedRestaurantId?: string | null;
  onMarkerPress?: (restaurantId: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function RestaurantMapView({
  restaurants,
  region,
  selectedRestaurantId,
  onMarkerPress,
  style,
}: RestaurantMapViewProps) {
  const mapRef = useRef<MapView | null>(null);

  useEffect(() => {
    mapRef.current?.animateToRegion(region, 350);
  }, [region]);

  return (
    <MapView
      ref={mapRef}
      style={style}
      initialRegion={region}
      showsCompass={false}
      showsPointsOfInterest={false}
      toolbarEnabled={false}>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          coordinate={restaurant.coordinates}
          title={restaurant.name}
          description={restaurant.city}
          pinColor={restaurant.id === selectedRestaurantId ? theme.colors.primary : theme.colors.secondary}
          onPress={() => onMarkerPress?.(restaurant.id)}
        />
      ))}
    </MapView>
  );
}
