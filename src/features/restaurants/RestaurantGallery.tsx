import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from '@/src/components/AppText';
import { RestaurantHeroImage } from '@/src/features/restaurants/RestaurantHeroImage';
import { RestaurantImageView } from '@/src/features/restaurants/RestaurantImageView';
import { theme } from '@/src/theme';

import type { RestaurantImage } from '@/src/features/restaurants/types';

type RestaurantGalleryProps = {
  images: RestaurantImage[];
  restaurantName: string;
  title: string;
  subtitle: string;
};

export function RestaurantGallery({
  images,
  restaurantName,
  title,
  subtitle,
}: RestaurantGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [images]);

  const selectedImage = images[selectedIndex] ?? images[0];

  return (
    <View style={styles.section}>
      <RestaurantHeroImage
        imageUrl={selectedImage?.image_url ?? null}
        imageAlt={selectedImage?.alt_text ?? null}
        restaurantName={restaurantName}
        currentIndex={selectedIndex}
        totalImages={images.length}
      />

      <View style={styles.copy}>
        <AppText variant="title">{title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {subtitle}
        </AppText>
      </View>

      {images.length > 1 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailRow}>
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;

            return (
              <Pressable
                key={`${image.id ?? image.image_url}-${image.sort_order}`}
                accessibilityRole="button"
                accessibilityLabel={`${restaurantName} photo ${index + 1}`}
                onPress={() => setSelectedIndex(index)}
                style={({ pressed }) => [
                  styles.thumbnailButton,
                  isSelected ? styles.thumbnailButtonActive : undefined,
                  pressed ? styles.thumbnailButtonPressed : undefined,
                ]}>
                <RestaurantImageView
                  imageUrl={image.image_url}
                  accessibilityLabel={image.alt_text ?? `${restaurantName} photo ${index + 1}`}
                  fallbackCompact
                  fallbackIconSize={20}
                  style={styles.thumbnailImage}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
    marginHorizontal: -theme.spacing.lg,
  },
  copy: {
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  thumbnailRow: {
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  thumbnailButton: {
    width: 88,
    height: 72,
    borderRadius: theme.radius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailButtonActive: {
    borderColor: theme.colors.primary,
  },
  thumbnailButtonPressed: {
    opacity: 0.85,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.surfaceMuted,
  },
});
