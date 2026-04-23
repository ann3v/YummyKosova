import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tavolinaInvites } from '../data/mockData';
import { TavolinaInviteCard } from '../components/cards/TavolinaInviteCard';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { theme } from '../theme';

type TavolinaScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const filters = ['Të gjitha', 'Sonte', 'Kësaj javë'];

export function TavolinaScreen({ navigation }: TavolinaScreenProps) {
  return (
    <View style={styles.container}>
      <Screen contentContainerStyle={styles.content}>
        <GradientHeaderShell>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Tavolina</Text>
            <MaterialCommunityIcons name="silverware-fork-knife" size={32} color={theme.colors.surface} />
          </View>
          <Text style={styles.subtitle}>Gjej shoqëri për darkë</Text>

          <View style={styles.filtersRow}>
            {filters.map((filter, index) => (
              <Pressable key={filter} style={[styles.filterChip, index === 0 && styles.filterChipActive]}>
                <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter}</Text>
              </Pressable>
            ))}
          </View>
        </GradientHeaderShell>

        <View style={styles.cards}>
          {tavolinaInvites.map((invite) => (
            <TavolinaInviteCard
              key={invite.id}
              invite={invite}
              onJoin={() => undefined}
              onViewRestaurant={() =>
                navigation.navigate('RestaurantDetails', { restaurantId: invite.restaurantId })
              }
            />
          ))}
        </View>
      </Screen>

      <Pressable style={styles.addButton}>
        <Feather name="plus" size={38} color={theme.colors.surface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: theme.spacing.xxxl,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    color: theme.colors.surface,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    marginTop: theme.spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    flexWrap: 'wrap',
    marginTop: theme.spacing.xxl,
  },
  filterChip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.lg,
  },
  filterChipActive: {
    backgroundColor: theme.colors.surface,
  },
  filterText: {
    color: theme.colors.surface,
    fontSize: 18,
    fontWeight: '600',
  },
  filterTextActive: {
    color: theme.colors.danger,
  },
  cards: {
    gap: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xxl,
  },
  addButton: {
    position: 'absolute',
    right: theme.spacing.xxl,
    bottom: 110,
    width: 92,
    height: 92,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    ...theme.shadow.floating,
  },
});
