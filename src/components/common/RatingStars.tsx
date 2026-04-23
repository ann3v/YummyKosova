import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../theme';

type RatingStarsProps = {
  rating: number;
  size?: number;
};

export function RatingStars({ rating, size = 18 }: RatingStarsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Ionicons
          key={`star-${index}`}
          name={index < rating ? 'star' : 'star-outline'}
          size={size}
          color={theme.colors.gold}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});
