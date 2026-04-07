import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { EmptyState } from '@/src/components/EmptyState';
import { StatusCard } from '@/src/components/StatusCard';
import { MenuItemRow } from '@/src/features/restaurants/MenuItemRow';
import { useRestaurantMenu } from '@/src/features/restaurants/useRestaurantMenu';
import { theme } from '@/src/theme';

type MenuSectionProps = {
  restaurantId: string;
  title: string;
  subtitle: string;
  loadingTitle: string;
  loadingMessage: string;
  emptyTitle: string;
  emptyDescription: string;
  loadErrorMessage: string;
  retryLabel: string;
};

export function MenuSection({
  restaurantId,
  title,
  subtitle,
  loadingTitle,
  loadingMessage,
  emptyTitle,
  emptyDescription,
  loadErrorMessage,
  retryLabel,
}: MenuSectionProps) {
  const {
    categories,
    isLoading,
    errorMessage,
    refresh,
  } = useRestaurantMenu({
    restaurantId,
    loadErrorMessage,
  });

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <AppText variant="title">{title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {subtitle}
        </AppText>
      </View>

      {isLoading ? (
        <StatusCard title={loadingTitle} message={loadingMessage} isLoading />
      ) : null}

      {!isLoading && errorMessage ? (
        <StatusCard
          title={title}
          message={loadErrorMessage}
          actionLabel={retryLabel}
          onActionPress={() => {
            void refresh();
          }}
        />
      ) : null}

      {!isLoading && !errorMessage && categories.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : null}

      {!isLoading && !errorMessage
        ? categories.map((category) => (
            <Card key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <AppText variant="subtitle">{category.name}</AppText>
                {category.description ? (
                  <AppText variant="body" color={theme.colors.mutedText}>
                    {category.description}
                  </AppText>
                ) : null}
              </View>

              {category.items.map((item, index) => (
                <MenuItemRow
                  key={item.id}
                  item={item}
                  isLast={index === category.items.length - 1}
                />
              ))}
            </Card>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
  },
  categoryCard: {
    gap: theme.spacing.sm,
  },
  categoryHeader: {
    gap: theme.spacing.xs,
  },
});
