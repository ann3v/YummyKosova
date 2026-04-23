import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { MenuSection } from '../../data/mockData';
import { theme } from '../../theme';

type MenuAccordionProps = {
  section: MenuSection;
};

export function MenuAccordion({ section }: MenuAccordionProps) {
  const [isOpen, setIsOpen] = useState(Boolean(section.defaultOpen));

  return (
    <View style={styles.wrap}>
      <Pressable style={styles.header} onPress={() => setIsOpen((current) => !current)}>
        <Text style={styles.title}>{section.title}</Text>
        <Ionicons
          name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={28}
          color={theme.colors.mutedText}
        />
      </Pressable>

      {isOpen ? (
        <View style={styles.content}>
          {section.items.map((item, index) => (
            <View key={item.id} style={[styles.itemRow, index > 0 && styles.itemBorder]}>
              {item.image ? <Image source={{ uri: item.image }} style={styles.itemImage} /> : null}
              <View style={styles.itemCopy}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  header: {
    minHeight: 92,
    paddingHorizontal: theme.spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.heading,
  },
  content: {
    paddingHorizontal: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  itemRow: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  itemBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  itemImage: {
    width: 92,
    height: 92,
    borderRadius: theme.radius.md,
  },
  itemCopy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  itemName: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.heading,
  },
  itemDescription: {
    fontSize: 16,
    lineHeight: 22,
    color: theme.colors.mutedText,
  },
  itemPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
  },
});
