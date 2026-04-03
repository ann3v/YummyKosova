import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { AppButton } from '@/src/components/AppButton';
import { AppText } from '@/src/components/AppText';
import { Card } from '@/src/components/Card';
import { NoticeBanner } from '@/src/components/NoticeBanner';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/features/auth/AuthProvider';
import { getAuthErrorMessage } from '@/src/features/auth/errors';
import { useI18n } from '@/src/i18n/I18nProvider';
import { theme } from '@/src/theme';

export default function ProfileScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { language, messages } = useI18n();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    setErrorMessage('');
    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      setErrorMessage(
        getAuthErrorMessage(error, messages.auth, messages.auth.signOutErrorFallback)
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <AppText variant="display">Profile</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          A lightweight account surface that can later expand with preferences, alerts, and loyalty.
        </AppText>
      </View>

      <Card style={styles.section}>
        <AppText variant="subtitle">Account foundation</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          Signed in as {user?.email ?? 'unknown'}
        </AppText>
      </Card>

      <Card style={styles.section}>
        <AppText variant="subtitle">Language scaffold</AppText>
        <AppText variant="body" color={theme.colors.mutedText}>
          Current app language: {language === 'sq' ? 'Shqip' : 'English'}
        </AppText>
      </Card>

      {errorMessage ? <NoticeBanner message={errorMessage} variant="error" /> : null}

      <AppButton
        label={messages.auth.signOutCta}
        variant="secondary"
        onPress={handleSignOut}
        isLoading={isSigningOut}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    gap: theme.spacing.sm,
  },
  section: {
    gap: theme.spacing.sm,
  },
});
