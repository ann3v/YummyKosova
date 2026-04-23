import { ScrollView, Pressable, StyleSheet, Text, View } from 'react-native';

import type { BookingDate } from '../../data/mockData';
import { theme } from '../../theme';

type BookingDateSelectorProps = {
  dates: BookingDate[];
  selectedDateId: string;
  onSelect: (dateId: string) => void;
};

export function BookingDateSelector({
  dates,
  selectedDateId,
  onSelect,
}: BookingDateSelectorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {dates.map((date) => {
        const isSelected = date.id === selectedDateId;

        return (
          <Pressable
            key={date.id}
            onPress={() => onSelect(date.id)}
            style={[styles.card, isSelected && styles.cardSelected]}>
            <View style={styles.cardContent}>
              <Text style={[styles.dayLabel, isSelected && styles.selectedText]}>{date.dayLabel}</Text>
              <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>{date.dayNumber}</Text>
              <Text style={[styles.month, isSelected && styles.selectedText]}>{date.month}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xxl,
  },
  card: {
    width: 108,
    height: 156,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow.card,
  },
  cardSelected: {
    backgroundColor: theme.colors.primary,
  },
  cardContent: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  dayLabel: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.heading,
  },
  dayNumber: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  month: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.mutedText,
  },
  selectedText: {
    color: theme.colors.surface,
  },
});
