import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { favoriteRestaurants } from '../data/mockData';
import { RestaurantListCard } from '../components/cards/RestaurantListCard';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { theme } from '../theme';

type FavoritesScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  return (
    <Screen contentContainerStyle={styles.content}>
      <GradientHeaderShell>
        <View style={styles.titleRow}>
          <Ionicons name="heart" size={42} color={theme.colors.surface} />
          <View style={styles.copy}>
            <Text style={styles.title}>My Favorites</Text>
            <Text style={styles.subtitle}>4 restaurants saved</Text>
          </View>
        </View>
      </GradientHeaderShell>

      <View style={styles.list}>
        {favoriteRestaurants.map((restaurant) => (
          <RestaurantListCard
            key={restaurant.id}
            restaurant={restaurant}
            onPress={() => navigation.navigate('RestaurantDetails', { restaurantId: restaurant.id })}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.xxxl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  copy: {
    gap: theme.spacing.sm,
  },
  title: {
    color: theme.colors.surface,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 18,
  },
  list: {
    gap: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xxl,
  },
});
