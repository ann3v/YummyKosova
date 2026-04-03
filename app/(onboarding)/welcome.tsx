import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { AppButton } from '@/src/components/AppButton';
import { AppLogo } from '@/src/components/AppLogo';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { Screen } from '@/src/components/Screen';
import { useI18n } from '@/src/i18n/I18nProvider';
import { useAppState } from '@/src/lib/app-state';
import { theme } from '@/src/theme';

const slideIcons = ['location-outline', 'bookmark-outline', 'search-outline'] as const;
const slideAccents = [theme.colors.primary, theme.colors.accent, theme.colors.gold] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { messages } = useI18n();
  const { completeOnboarding } = useAppState();
  const activeSlide = messages.onboarding.slides[activeIndex];
  const isLastSlide = activeIndex === messages.onboarding.slides.length - 1;

  const handleContinue = () => {
    if (!isLastSlide) {
      setActiveIndex((current) => current + 1);
      return;
    }

    completeOnboarding();
    router.replace('/sign-in');
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppLogo />
        <Pressable onPress={handleContinue}>
          <AppText variant="body" color={theme.colors.mutedText}>
            {isLastSlide ? messages.onboarding.finish : messages.onboarding.skip}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.copyBlock}>
        <AppText variant="eyebrow">{messages.onboarding.badge}</AppText>
        <AppText variant="display">{messages.onboarding.title}</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          {messages.onboarding.subtitle}
        </AppText>
      </View>

      <Card style={styles.slideCard}>
        <View
          style={[
            styles.slideIcon,
            {
              backgroundColor: `${slideAccents[activeIndex]}18`,
            },
          ]}>
          <Ionicons name={slideIcons[activeIndex]} size={28} color={slideAccents[activeIndex]} />
        </View>
        <View style={styles.slideCopy}>
          <AppText variant="title">{activeSlide.title}</AppText>
          <AppText variant="body" color={theme.colors.mutedText}>
            {activeSlide.description}
          </AppText>
        </View>
      </Card>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {messages.onboarding.slides.map((slide, index) => (
            <View
              key={slide.title}
              style={[styles.dot, index === activeIndex ? styles.dotActive : undefined]}
            />
          ))}
        </View>

        <View style={styles.actions}>
          {activeIndex > 0 ? (
            <AppButton
              label={messages.common.back}
              variant="secondary"
              onPress={() => setActiveIndex((current) => current - 1)}
            />
          ) : (
            <View style={styles.spacer} />
          )}
          <AppButton
            label={isLastSlide ? messages.onboarding.finish : messages.common.continue}
            onPress={handleContinue}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    gap: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyBlock: {
    gap: theme.spacing.sm,
  },
  slideCard: {
    gap: theme.spacing.lg,
    minHeight: 280,
    justifyContent: 'center',
  },
  slideIcon: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideCopy: {
    gap: theme.spacing.sm,
  },
  footer: {
    gap: theme.spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: theme.radius.round,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    width: 28,
    backgroundColor: theme.colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  spacer: {
    flex: 1,
  },
});
