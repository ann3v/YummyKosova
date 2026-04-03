import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { theme } from '@/src/theme';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onActionPress,
}: EmptyStateProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="sparkles-outline" size={22} color={theme.colors.primary} />
      </View>
      <View style={styles.copy}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {description}
        </AppText>
      </View>
      {actionLabel && onActionPress ? (
        <AppButton label={actionLabel} variant="secondary" onPress={onActionPress} />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.xxl,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
});
