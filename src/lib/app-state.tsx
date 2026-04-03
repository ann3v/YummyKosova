import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

type AppStateContextValue = {
  isBootstrapping: boolean;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBootstrapping(false);
    }, 450);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        isBootstrapping,
        hasCompletedOnboarding,
        completeOnboarding: () => setHasCompletedOnboarding(true),
      }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return context;
}
