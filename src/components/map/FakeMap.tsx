import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import type { MapPin } from '../../data/mockData';
import { theme } from '../../theme';

type FakeMapProps = {
  pins: MapPin[];
  onPinPress?: (restaurantId: string) => void;
};

export function FakeMap({ pins, onPinPress }: FakeMapProps) {
  return (
    <View style={styles.map}>
      {Array.from({ length: 8 }).map((_, column) => (
        <View
          key={`vertical-${column}`}
          style={[styles.verticalLine, { left: `${(column + 1) * 12.5}%` }]}
        />
      ))}
      {Array.from({ length: 8 }).map((_, row) => (
        <View
          key={`horizontal-${row}`}
          style={[styles.horizontalLine, { top: `${(row + 1) * 12.5}%` }]}
        />
      ))}

      {pins.map((pin) => (
        <Pressable
          key={pin.id}
          onPress={() => onPinPress?.(pin.restaurantId)}
          style={[styles.pin, { left: pin.x, top: pin.y, backgroundColor: pin.color }]}>
          <Ionicons name="location-sharp" size={36} color={theme.colors.surface} />
        </Pressable>
      ))}

      <View style={styles.userLocation}>
        <View style={styles.userDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: theme.colors.mapSurface,
    overflow: 'hidden',
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(170, 176, 192, 0.28)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(170, 176, 192, 0.28)',
  },
  pin: {
    position: 'absolute',
    width: 74,
    height: 74,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -37,
    marginTop: -37,
    ...theme.shadow.card,
  },
  userLocation: {
    position: 'absolute',
    top: '52%',
    left: '50%',
    width: 28,
    height: 28,
    marginLeft: -14,
    marginTop: -14,
    borderRadius: theme.radius.round,
    borderWidth: 6,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDot: {
    width: 12,
    height: 12,
    borderRadius: theme.radius.round,
    backgroundColor: '#3F7BFF',
  },
});
