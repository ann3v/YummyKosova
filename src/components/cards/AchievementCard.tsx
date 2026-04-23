import { Ionicons } from '@expo/vector-icons';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { ProfileAchievement } from '../../data/mockData';
import { theme } from '../../theme';

type AchievementCardProps = {
  achievement: ProfileAchievement;
  style?: StyleProp<ViewStyle>;
};

export function AchievementCard({ achievement, style }: AchievementCardProps) {
  const iconName =
    achievement.icon === 'star'
      ? 'star'
      : achievement.icon === 'heart'
        ? 'heart'
        : achievement.icon === 'create'
          ? 'create'
          : 'diamond';

  return (
    <View style={[styles.card, achievement.unlocked ? styles.unlocked : styles.locked, style]}>
      <Ionicons
        name={iconName}
        size={44}
        color={achievement.unlocked ? theme.colors.gold : '#D8C88A'}
        style={styles.icon}
      />
      <Text style={[styles.title, !achievement.unlocked && styles.lockedText]}>{achievement.title}</Text>
      {achievement.subtitle ? (
        <Text style={[styles.subtitle, !achievement.unlocked && styles.lockedText]}>{achievement.subtitle}</Text>
      ) : null}
      <Text style={[styles.status, !achievement.unlocked && styles.lockedStatus]}>{achievement.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 178,
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  unlocked: {
    backgroundColor: '#FFF9F5',
    borderColor: '#F6BFC6',
  },
  locked: {
    backgroundColor: '#FAFBFE',
    borderColor: theme.colors.border,
  },
  icon: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '800',
    color: theme.colors.heading,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 19,
    color: theme.colors.mutedText,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.success,
    textAlign: 'center',
  },
  lockedText: {
    color: '#A0A6B5',
  },
  lockedStatus: {
    color: '#C5CAD6',
  },
});
