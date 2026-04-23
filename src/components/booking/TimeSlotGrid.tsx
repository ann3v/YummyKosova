import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../theme';

type TimeSlotGridProps = {
  times: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
};

export function TimeSlotGrid({ times, selectedTime, onSelect }: TimeSlotGridProps) {
  return (
    <View style={styles.grid}>
      {times.map((time) => {
        const isSelected = selectedTime === time;

        return (
          <Pressable
            key={time}
            onPress={() => onSelect(time)}
            style={[styles.slot, isSelected && styles.slotSelected]}>
            <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>{time}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
  },
  slot: {
    width: '22%',
    minWidth: 72,
    height: 76,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primarySoft,
  },
  slotText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.heading,
  },
  slotTextSelected: {
    color: theme.colors.primary,
  },
});
