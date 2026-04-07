import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { RestaurantImageView } from '@/src/features/restaurants/RestaurantImageView';
import { theme } from '@/src/theme';

type RestaurantHeroImageProps = {
  imageUrl: string | null;
  imageAlt: string | null;
  restaurantName: string;
  currentIndex?: number;
  totalImages?: number;
};

export function RestaurantHeroImage({
  imageUrl,
  imageAlt,
  restaurantName,
  currentIndex = 0,
  totalImages = 0,
}: RestaurantHeroImageProps) {
  const shouldShowCounter = totalImages > 1;

  return (
    <View style={styles.container}>
      <RestaurantImageView
        imageUrl={imageUrl}
        accessibilityLabel={imageAlt ?? restaurantName}
        fallbackTitle={restaurantName}
        fallbackIconSize={32}
        style={styles.image}
      />

      {shouldShowCounter ? (
        <View style={styles.counter}>
          <AppText variant="caption" color={theme.colors.surface}>
            {currentIndex + 1} / {totalImages}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: theme.colors.surfaceMuted,
  },
  counter: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    borderRadius: theme.radius.round,
    backgroundColor: 'rgba(36, 26, 20, 0.7)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 6,
  },
});
