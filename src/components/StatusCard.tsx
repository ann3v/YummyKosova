import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { theme } from '@/src/theme';

type StatusCardProps = {
  title: string;
  message: string;
  isLoading?: boolean;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function StatusCard({
  title,
  message,
  isLoading = false,
  actionLabel,
  onActionPress,
}: StatusCardProps) {
  return (
    <Card style={styles.card}>
      {isLoading ? <ActivityIndicator size="small" color={theme.colors.primary} /> : null}
      <View style={styles.copy}>
        <AppText variant="subtitle">{title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {message}
        </AppText>
      </View>
      {actionLabel && onActionPress ? (
        <AppButton
          label={actionLabel}
          variant="secondary"
          fullWidth={false}
          onPress={onActionPress}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  copy: {
    gap: theme.spacing.sm,
  },
});
