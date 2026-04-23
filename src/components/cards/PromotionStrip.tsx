import { StyleSheet, Text, View } from 'react-native';

import type { Promotion } from '../../data/mockData';
import { theme } from '../../theme';

type PromotionStripProps = {
  promotion: Promotion;
};

export function PromotionStrip({ promotion }: PromotionStripProps) {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <Text style={styles.title}>{promotion.title}</Text>
        <Text style={styles.subtitle}>{promotion.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF4FA',
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xxl,
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 10,
    backgroundColor: theme.colors.accent,
    borderTopLeftRadius: theme.radius.lg,
    borderBottomLeftRadius: theme.radius.lg,
  },
  content: {
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: '#7B18D7',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.mutedText,
  },
});
