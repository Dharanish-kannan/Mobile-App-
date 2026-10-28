export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  giant: 48,
} as const;

export const radii = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
  floating: 28,
  xxl: 32,
  full: 9999,
} as const;

export const layout = {
  maxContentWidth: 480,
} as const;

export const typography = {
  fonts: {
    heading: 'SpaceGrotesk_700Bold',
    subheading: 'SpaceGrotesk_600SemiBold',
    body: 'Inter_400Regular',
    bodyMedium: 'Inter_500Medium',
    bodyBold: 'Inter_600SemiBold',
    mono: 'SpaceGrotesk_500Medium',
  },
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 32,
    giant: 40,
  },
  lineHeights: {
    xs: 15,
    sm: 18,
    md: 22,
    lg: 24,
    xl: 28,
    xxl: 32,
    display: 38,
    giant: 46,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
  },
} as const;

export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Layout = typeof layout;
export type Typography = typeof typography;
