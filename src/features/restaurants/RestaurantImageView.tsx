import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import type { ImageStyle, StyleProp } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { ImageFallback } from '@/src/features/restaurants/ImageFallback';

type RestaurantImageViewProps = {
  imageUrl: string | null;
  accessibilityLabel: string;
  style?: StyleProp<ImageStyle>;
  fallbackTitle?: string;
  fallbackCompact?: boolean;
  fallbackIconSize?: number;
};

export function RestaurantImageView({
  imageUrl,
  accessibilityLabel,
  style,
  fallbackTitle,
  fallbackCompact = false,
  fallbackIconSize,
}: RestaurantImageViewProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  if (!imageUrl || hasError) {
    return (
      <View style={[styles.base, style]}>
        <ImageFallback
          title={fallbackTitle}
          compact={fallbackCompact}
          iconSize={fallbackIconSize}
        />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUrl }}
      contentFit="cover"
      transition={150}
      style={[styles.base, style]}
      accessibilityLabel={accessibilityLabel}
      onError={() => setHasError(true)}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
