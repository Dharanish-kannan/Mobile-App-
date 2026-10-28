import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import { useFonts } from 'expo-font';
import { DarkTheme, Slot, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from '../components/toast/ToastContext';
import { AppThemeProvider, useTheme } from '../theme';

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync().catch(() => {});

function NavigationThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const customDarkTheme = React.useMemo(
    () => ({
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.textPrimary,
        border: theme.colors.border,
        primary: theme.colors.accent,
      },
    }),
    [theme]
  );

  return <ThemeProvider value={customDarkTheme}>{children}</ThemeProvider>;
}

function WebContainer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.style.backgroundColor = theme.colors.background;
      document.body.style.backgroundColor = theme.colors.background;
    }
  }, [theme.colors.background]);

  if (Platform.OS !== 'web') {
    return <View style={styles.root}>{children}</View>;
  }

  return (
    <View
      style={[
        styles.webOuter,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          height: '100dvh' as unknown as number,
          maxHeight: '100dvh' as unknown as number,
        },
      ]}
    >
      <View
        style={[
          styles.webInner,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.border,
            maxWidth: theme.layout.maxContentWidth,
            height: '100%',
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <AppThemeProvider>
        <NavigationThemeWrapper>
          <ToastProvider>
            <WebContainer>
              <Slot />
            </WebContainer>
          </ToastProvider>
        </NavigationThemeWrapper>
      </AppThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: '#0B0B0F',
  },
  webOuter: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webInner: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    overflow: 'hidden',
  },
});
