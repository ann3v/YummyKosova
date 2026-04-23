import { StyleSheet, Text, View } from 'react-native';

import type { Review } from '../../data/mockData';
import { theme } from '../../theme';
import { RatingStars } from '../common/RatingStars';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.author}>{review.author}</Text>
        <RatingStars rating={review.rating} size={18} />
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      <Text style={styles.timeAgo}>{review.timeAgo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFBFE',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xxl,
    gap: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  author: {
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.heading,
    flex: 1,
  },
  comment: {
    fontSize: 18,
    lineHeight: 30,
    color: theme.colors.mutedText,
  },
  timeAgo: {
    fontSize: theme.typography.sizes.title,
    color: theme.colors.subtle,
  },
});
