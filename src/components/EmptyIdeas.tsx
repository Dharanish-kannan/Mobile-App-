import { router } from 'expo-router';
import { Lightbulb, PlusCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';
import { Button } from './Button';

export const EmptyIdeas: React.FC = () => {
  const { theme } = useTheme();

  const handlePress = async () => {
    await triggerHaptic.selection();
    router.navigate('/(tabs)/submit');
  };

  return (
    <View style={[styles.container, { padding: theme.spacing.xl }]}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme.colors.surfaceSubtle,
            borderColor: theme.colors.border,
            marginBottom: theme.spacing.md,
          },
        ]}
      >
        <Lightbulb size={36} color={theme.colors.accent} strokeWidth={2} />
      </View>

      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.typography.fonts.heading,
            fontSize: theme.typography.sizes.xl,
            marginBottom: theme.spacing.xs,
          },
        ]}
      >
        No Ideas Found
      </Text>

      <Text
        style={[
          styles.subtitle,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.typography.fonts.body,
            fontSize: theme.typography.sizes.sm,
            marginBottom: theme.spacing.xl,
          },
        ]}
      >
        Be the first visionary to submit a startup pitch and get an instant AI evaluation.
      </Text>

      <Button
        title="Submit First Idea"
        onPress={handlePress}
        variant="primary"
        icon={<PlusCircle size={18} color={theme.colors.textInverse} strokeWidth={2.4} />}
        accessibilityLabel="Submit the first startup idea"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    letterSpacing: -0.2,
  },
});
