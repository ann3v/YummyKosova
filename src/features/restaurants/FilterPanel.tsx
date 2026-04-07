import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { FilterChip } from '@/src/features/restaurants/FilterChip';
import { theme } from '@/src/theme';

type FilterGroup = {
  key: string;
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string | null) => void;
};

type FilterPanelProps = {
  title: string;
  clearLabel: string;
  groups: FilterGroup[];
  hasActiveFilters: boolean;
};

export function FilterPanel({
  title,
  clearLabel,
  groups,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <AppText variant="subtitle">{title}</AppText>
        {hasActiveFilters ? (
          <AppButton
            label={clearLabel}
            variant="ghost"
            fullWidth={false}
            onPress={() => {
              groups.forEach((group) => group.onSelect(null));
            }}
          />
        ) : null}
      </View>

      {groups.map((group) => (
        <View key={group.key} style={styles.group}>
          <AppText variant="caption" color={theme.colors.mutedText}>
            {group.label}
          </AppText>
          <View style={styles.chipRow}>
            {group.options.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={group.selectedValue === option}
                onPress={() => group.onSelect(group.selectedValue === option ? null : option)}
              />
            ))}
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  group: {
    gap: theme.spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
});
