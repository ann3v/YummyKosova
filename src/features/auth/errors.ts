import type { AuthError } from '@supabase/supabase-js';

import type { MessageCatalog } from '@/src/i18n/messages';

type AuthMessages = MessageCatalog['auth'];

export function getAuthErrorMessage(
  error: unknown,
  auth: AuthMessages,
  fallback: string
) {
  const authError = error as AuthError | undefined;

  if (!authError?.message) {
    return fallback;
  }

  const normalized = authError.message.toLowerCase();

  if (normalized.includes('invalid login credentials')) {
    return auth.invalidCredentials;
  }

  if (normalized.includes('email not confirmed')) {
    return auth.emailNotConfirmed;
  }

  if (normalized.includes('user already registered')) {
    return auth.userAlreadyRegistered;
  }

  return authError.message;
}
