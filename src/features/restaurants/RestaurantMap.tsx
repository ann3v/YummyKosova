import { StyleSheet } from 'react-native';

import { EmptyState } from '@/src/components/EmptyState';
import { Card } from '@/src/components/Card';

import type { RestaurantMapItem } from '@/src/features/restaurants/types';

type RestaurantMapProps = {
  restaurants: RestaurantMapItem[];
  selectedRestaurantId?: string;
  onSelectRestaurant: (restaurant: RestaurantMapItem | null) => void;
  unsupportedTitle?: string;
  unsupportedDescription?: string;
};

export function RestaurantMap({
  unsupportedTitle = 'Map unavailable',
  unsupportedDescription = 'Map preview is available on iOS and Android builds.',
}: RestaurantMapProps) {
  return (
    <Card style={styles.card}>
      <EmptyState title={unsupportedTitle} description={unsupportedDescription} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
  },
});
