import React, { createContext, useContext, useMemo } from 'react';

import { darkColors, lightColors } from './colors';
import { layout, radii, spacing, typography } from './tokens';
import { AppTheme, ThemeMode } from './types';
import { useIdeaStore } from '../store/useIdeaStore';

interface ThemeContextValue {
  theme: AppTheme;
  isDark: boolean;
  mode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const setThemeMode = useIdeaStore((state) => state.setThemeMode);
  const toggleTheme = useIdeaStore((state) => state.toggleTheme);

  // App is locked to dark theme everywhere; lightColors is preserved but unused
  const isDark = true;

  const value = useMemo<ThemeContextValue>(() => {
    // Retain reference to lightColors so it is kept in codebase as requested
    const _keepLightColors = lightColors;
    void _keepLightColors;

    const activeColors = darkColors;
    const theme: AppTheme = {
      isDark,
      mode: 'dark',
      colors: activeColors,
      spacing,
      radii,
      layout,
      typography,
    };

    return {
      theme,
      isDark,
      mode: 'dark',
      toggleTheme,
      setThemeMode,
    };
  }, [isDark, toggleTheme, setThemeMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within an AppThemeProvider');
  }
  return context;
};
