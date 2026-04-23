import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import type { MapRegion, Restaurant } from '../../data/mockData';
import { FakeMap } from './FakeMap';

type RestaurantMapViewProps = {
  restaurants: Restaurant[];
  region: MapRegion;
  selectedRestaurantId?: string | null;
  onMarkerPress?: (restaurantId: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function RestaurantMapView({
  restaurants,
  region: _region,
  selectedRestaurantId: _selectedRestaurantId,
  onMarkerPress,
  style,
}: RestaurantMapViewProps) {
  return (
    <View style={[styles.wrap, style]}>
      <FakeMap
        pins={restaurants.map((restaurant, index) => ({
          id: restaurant.id,
          restaurantId: restaurant.id,
          x: `${18 + (index % 3) * 26}%`,
          y: `${16 + Math.floor(index / 3) * 20}%`,
          color: index % 2 === 0 ? '#FF4C49' : '#FF8A3D',
        }))}
        onPinPress={onMarkerPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
});
