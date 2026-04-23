import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { Activity } from '../../data/mockData';
import { theme } from '../../theme';

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: activity.backgroundColor }]}>
        <Ionicons name={activity.icon} size={34} color={activity.accentColor} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.copy}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.subtitle}>{activity.subtitle}</Text>
          </View>
          {activity.status ? (
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{activity.status}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadow.card,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: theme.radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: theme.colors.heading,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.mutedText,
  },
  statusPill: {
    backgroundColor: theme.colors.successSoft,
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  statusText: {
    color: theme.colors.success,
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: '600',
  },
});
