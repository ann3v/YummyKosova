import { Platform } from 'react-native';

const fontFamily =
  Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }) ?? 'System';

export const colors = {
  background: '#FBF7F3',
  surface: '#FFFFFF',
  surfaceMuted: '#F4ECE6',
  text: '#241A14',
  mutedText: '#7A685E',
  primary: '#D2613D',
  primarySoft: '#F8E2D8',
  accent: '#167D6C',
  gold: '#C7922D',
  border: '#E6D9D0',
  danger: '#B6492A',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  round: 999,
};

export const typography = {
  fontFamily,
  sizes: {
    display: 32,
    title: 24,
    subtitle: 18,
    body: 16,
    label: 14,
    caption: 13,
    eyebrow: 12,
  },
  lineHeights: {
    display: 38,
    title: 30,
    subtitle: 24,
    body: 24,
    label: 20,
    caption: 18,
    eyebrow: 16,
  },
};

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: '#241A14',
      shadowOpacity: 0.08,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 3,
    },
    default: {},
  }),
};
