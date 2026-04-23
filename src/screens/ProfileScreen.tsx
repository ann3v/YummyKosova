import { Ionicons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import {
  profileAchievements,
  profileQuickLinks,
  profileStats,
  recentActivity,
} from '../data/mockData';
import { AchievementCard } from '../components/cards/AchievementCard';
import { ActivityCard } from '../components/cards/ActivityCard';
import { OptionListCard } from '../components/cards/OptionListCard';
import { StatCard } from '../components/cards/StatCard';
import { IconCircleButton } from '../components/common/IconCircleButton';
import { SectionTitle } from '../components/common/SectionTitle';
import { useAuth } from '../features/auth/AuthProvider';
import { GradientHeaderShell } from '../components/layout/GradientHeaderShell';
import { Screen } from '../components/layout/Screen';
import { theme } from '../theme';

type ProfileScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

function getDisplayName(fullName: string | null | undefined, email: string | null | undefined) {
  if (fullName?.trim()) {
    return fullName.trim();
  }

  if (email?.trim()) {
    return email.split('@')[0];
  }

  return 'Yummy Member';
}

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const achievementWidth = (width - theme.spacing.xxl * 2 - theme.spacing.lg) / 2;
  const fullName =
    typeof user?.user_metadata?.full_name === 'string' ? user.user_metadata.full_name : null;
  const displayName = getDisplayName(fullName, user?.email);

  return (
    <Screen contentContainerStyle={styles.content}>
      <GradientHeaderShell style={styles.header}>
        <View style={styles.headerTopRow}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={42} color={theme.colors.danger} />
            </View>

            <View style={styles.profileCopy}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>{user?.email ?? 'member@yummykosova.app'}</Text>
            </View>
          </View>

          <IconCircleButton onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.surface} />
          </IconCircleButton>
        </View>

        <View style={styles.membershipBanner}>
          <View style={styles.membershipCopy}>
            <Ionicons name="ribbon-outline" size={22} color="#FFD74A" />
            <Text style={styles.membershipText}>Member since January 2024</Text>
          </View>

          <View style={styles.pointsPill}>
            <Text style={styles.pointsText}>450 pts</Text>
          </View>
        </View>
      </GradientHeaderShell>

      <View style={styles.statsRow}>
        {profileStats.map((item) => (
          <StatCard
            key={item.id}
            icon={item.icon as 'calendar-outline'}
            value={item.value}
            label={item.label}
          />
        ))}
      </View>

      <View style={styles.sectionBlock}>
        <SectionTitle
          title="Achievements"
          icon={<Ionicons name="ribbon-outline" size={22} color={theme.colors.danger} />}
        />
        <View style={styles.achievementGrid}>
          {profileAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              style={{ width: achievementWidth }}
            />
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <SectionTitle
          title="Recent Activity"
          icon={<Ionicons name="time-outline" size={22} color={theme.colors.danger} />}
        />
        <View style={styles.listGap}>
          {recentActivity.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <OptionListCard items={profileQuickLinks} />
      </View>

      <View style={styles.sectionBlock}>
        <LinearGradient colors={theme.gradients.premium} style={styles.premiumBanner}>
          <Text style={styles.premiumTitle}>Yummy Plus</Text>
          <Text style={styles.premiumSubtitle}>
            Unlock premium Tavolina invites and faster booking perks.
          </Text>
        </LinearGradient>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerBrand}>YUMMY KOSOVA</Text>
        <Text style={styles.footerVersion}>Version 1.0.0</Text>
        <Text style={styles.footerNote}>© 2026 Yummy Kosova. All rights reserved.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.xxxl,
  },
  header: {
    paddingBottom: 86,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
  },
  profileRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadow.card,
  },
  profileCopy: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  name: {
    color: theme.colors.surface,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  email: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 15,
  },
  membershipBanner: {
    marginTop: theme.spacing.xxl,
    borderRadius: theme.radius.lg,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  membershipCopy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    flex: 1,
  },
  membershipText: {
    color: theme.colors.surface,
    fontSize: 15,
    lineHeight: 20,
  },
  pointsPill: {
    backgroundColor: '#FFD939',
    borderRadius: theme.radius.round,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  pointsText: {
    color: theme.colors.heading,
    fontSize: 15,
    fontWeight: '800',
  },
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xxl,
    marginTop: -60,
  },
  sectionBlock: {
    gap: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  listGap: {
    gap: theme.spacing.lg,
  },
  premiumBanner: {
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
    ...theme.shadow.card,
  },
  premiumTitle: {
    color: theme.colors.surface,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: theme.spacing.sm,
  },
  premiumSubtitle: {
    color: theme.colors.surface,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xxl,
  },
  footerBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.secondary,
  },
  footerVersion: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.mutedText,
  },
  footerNote: {
    fontSize: 14,
    color: theme.colors.subtle,
    textAlign: 'center',
  },
});
