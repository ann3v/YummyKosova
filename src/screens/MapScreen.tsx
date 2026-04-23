import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  filterRestaurantsByDiscovery,
  getMapRegionForRestaurants,
  restaurants,
} from '../data/mockData';
import { RestaurantListCard } from '../components/cards/RestaurantListCard';
import { IconCircleButton } from '../components/common/IconCircleButton';
import { LocationPickerModal } from '../components/common/LocationPickerModal';
import { RestaurantMapView } from '../components/map/RestaurantMapView';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { useDiscovery } from '../lib/discovery-state';
import { theme } from '../theme';

type MapScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export function MapScreen({ navigation }: MapScreenProps) {
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);
  const {
    locationOptions,
    searchQuery,
    selectedLocation,
    selectedLocationId,
    setSelectedLocationId,
  } = useDiscovery();

  const visibleRestaurants = useMemo(
    () => filterRestaurantsByDiscovery(restaurants, selectedLocationId, searchQuery),
    [searchQuery, selectedLocationId]
  );
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(
    visibleRestaurants[0]?.id ?? null
  );

  useEffect(() => {
    if (!visibleRestaurants.some((restaurant) => restaurant.id === selectedRestaurantId)) {
      setSelectedRestaurantId(visibleRestaurants[0]?.id ?? null);
    }
  }, [selectedRestaurantId, visibleRestaurants]);

  const region =
    visibleRestaurants.length > 0
      ? getMapRegionForRestaurants(visibleRestaurants)
      : selectedLocation.region;

  return (
    <Screen scrollable={false}>
      <View style={styles.container}>
        <GradientHeaderShell bottomRadius={0} style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerCopy}>
              <Text style={styles.title}>Map View</Text>
              <Text style={styles.subtitle}>{visibleRestaurants.length} restaurants nearby</Text>
            </View>

            <IconCircleButton onPress={() => setIsLocationPickerOpen(true)}>
              <Ionicons name="options-outline" size={24} color={theme.colors.surface} />
            </IconCircleButton>
          </View>
        </GradientHeaderShell>

        <View style={styles.mapContainer}>
          <RestaurantMapView
            restaurants={visibleRestaurants}
            region={region}
            selectedRestaurantId={selectedRestaurantId}
            onMarkerPress={setSelectedRestaurantId}
            style={styles.map}
          />
        </View>

        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Nearest Restaurants</Text>
          <Text style={styles.sheetSubtitle}>{selectedLocation.label}</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetContent}>
            {visibleRestaurants.map((restaurant) => (
              <RestaurantListCard
                key={restaurant.id}
                restaurant={restaurant}
                style={restaurant.id === selectedRestaurantId ? styles.selectedCard : undefined}
                onPress={() =>
                  navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id })
                }
              />
            ))}
          </ScrollView>
        </View>
      </View>

      <LocationPickerModal
        visible={isLocationPickerOpen}
        locations={locationOptions}
        selectedLocationId={selectedLocationId}
        onClose={() => setIsLocationPickerOpen(false)}
        onSelect={setSelectedLocationId}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingBottom: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.xl,
  },
  headerCopy: {
    gap: theme.spacing.xs,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '40%',
    maxHeight: '46%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xxl,
    borderTopRightRadius: theme.radius.xxl,
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
  },
  handle: {
    alignSelf: 'center',
    width: 70,
    height: 7,
    borderRadius: theme.radius.round,
    backgroundColor: '#D9DCE5',
    marginBottom: theme.spacing.md,
  },
  sheetTitle: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  sheetSubtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.mutedText,
    marginTop: 2,
    marginBottom: theme.spacing.lg,
  },
  sheetContent: {
    gap: theme.spacing.md,
    paddingBottom: 96,
  },
  selectedCard: {
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
});
