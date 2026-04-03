import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

import { messages, type MessageCatalog, type SupportedLanguage } from '@/src/i18n/messages';

type I18nContextValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  messages: MessageCatalog;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        messages: messages[language],
      }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
