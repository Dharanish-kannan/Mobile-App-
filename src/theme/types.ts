import { ColorPalette } from './colors';
import { Layout, Radii, Spacing, Typography } from './tokens';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface AppTheme {
  isDark: boolean;
  mode: ThemeMode;
  colors: ColorPalette;
  spacing: Spacing;
  radii: Radii;
  layout: Layout;
  typography: Typography;
}
