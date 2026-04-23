import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { DiscoveryLocation } from '../../data/mockData';
import { theme } from '../../theme';

type LocationPickerModalProps = {
  visible: boolean;
  locations: DiscoveryLocation[];
  selectedLocationId: string;
  onClose: () => void;
  onSelect: (locationId: string) => void;
};

export function LocationPickerModal({
  visible,
  locations,
  selectedLocationId,
  onClose,
  onSelect,
}: LocationPickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>Choose a location</Text>
          <View style={styles.list}>
            {locations.map((location) => {
              const isSelected = location.id === selectedLocationId;

              return (
                <Pressable
                  key={location.id}
                  onPress={() => {
                    onSelect(location.id);
                    onClose();
                  }}
                  style={[styles.row, isSelected && styles.rowSelected]}>
                  <Text style={[styles.label, isSelected && styles.labelSelected]}>{location.label}</Text>
                  {isSelected ? (
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xxl,
    gap: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.title,
    lineHeight: theme.typography.lineHeights.title,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  list: {
    gap: theme.spacing.sm,
  },
  row: {
    minHeight: 50,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSelected: {
    backgroundColor: theme.colors.primarySoft,
  },
  label: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.heading,
  },
  labelSelected: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
