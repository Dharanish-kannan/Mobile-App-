import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  showThemeToggle?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  rightAction,
  showThemeToggle = false,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleThemeToggle = async () => {
    await triggerHaptic.selection();
    toggleTheme();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          borderBottomColor: theme.colors.borderHairline,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
        },
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.typography.fonts.heading,
              fontSize: theme.typography.sizes.xxl,
              lineHeight: theme.typography.lineHeights.xxl,
            },
          ]}
          accessibilityRole="header"
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.sm,
                lineHeight: theme.typography.lineHeights.sm,
                marginTop: theme.spacing.xxs,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.actionContainer}>
        {rightAction}

        {showThemeToggle && (
          <Pressable
            onPress={handleThemeToggle}
            accessibilityRole="button"
            accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            accessibilityHint="Toggles between dark and light appearance"
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: theme.colors.elevation.raised.bg,
                borderColor: theme.colors.borderHairline,
                borderRadius: theme.radii.full,
                padding: theme.spacing.xs,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            {isDark ? (
              <Sun size={20} color={theme.colors.accent} strokeWidth={2.2} />
            ) : (
              <Moon size={20} color={theme.colors.textPrimary} strokeWidth={2.2} />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    letterSpacing: -0.5,
  },
  subtitle: {},
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
