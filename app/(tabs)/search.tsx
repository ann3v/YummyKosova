import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { EmptyState } from '@/src/components/EmptyState';
import { Screen } from '@/src/components/Screen';
import { TextField } from '@/src/components/TextField';
import { theme } from '@/src/theme';

const filters = {
  city: ['Prishtine', 'Prizren', 'Peje'],
  cuisine: ['Traditional', 'Pizza', 'Coffee'],
  vibe: ['Family', 'Date night', 'Late night'],
};

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected ? styles.chipSelected : undefined]}>
      <AppText
        variant="label"
        color={selected ? theme.colors.surface : theme.colors.text}>
        {label}
      </AppText>
    </Pressable>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Prishtine');

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="display">Search with context</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          City, cuisine, and vibe scaffolding is ready for live data and smarter filters.
        </AppText>
      </View>

      <TextField
        value={query}
        onChangeText={setQuery}
        label="Search"
        placeholder="Search restaurants, cities, or cuisines"
      />

      {Object.entries(filters).map(([group, items]) => (
        <Card key={group} style={styles.filterCard}>
          <AppText variant="subtitle">{group}</AppText>
          <View style={styles.chipRow}>
            {items.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={selectedFilter === item}
                onPress={() => setSelectedFilter(item)}
              />
            ))}
          </View>
        </Card>
      ))}

      <EmptyState
        title="Search results will show up here"
        description="Connect this screen to your future Supabase query layer when venue records and filters are ready."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    gap: theme.spacing.sm,
  },
  filterCard: {
    gap: theme.spacing.md,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    borderRadius: theme.radius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});
