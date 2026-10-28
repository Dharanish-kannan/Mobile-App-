import { AlertCircle, CheckCircle2, Info } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToastType } from './types';
import { useTheme } from '../../theme';
import { triggerHaptic } from '../../utils/haptics';

export interface ToastViewProps {
  message: string;
  type: ToastType;
  duration?: number;
  onDismiss: () => void;
}

export const ToastView: React.FC<ToastViewProps> = ({
  message,
  type,
  duration = 3000,
  onDismiss,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-80);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Trigger subtle haptic on entry
    if (type === 'success') {
      triggerHaptic.success();
    } else if (type === 'error') {
      triggerHaptic.error();
    } else {
      triggerHaptic.light();
    }

    // Animate in
    translateY.value = withSpring(0, { damping: 14, stiffness: 180 });
    opacity.value = withTiming(1, { duration: 200 });

    const timer = setTimeout(() => {
      // Animate out
      opacity.value = withTiming(0, { duration: 250 });
      translateY.value = withTiming(-80, { duration: 250 }, () => {
        runOnJS(onDismiss)();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss, opacity, translateY, type]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const config = {
    success: {
      color: theme.colors.success,
      bg: theme.colors.surfaceElevated,
      border: theme.colors.success,
      Icon: CheckCircle2,
    },
    error: {
      color: theme.colors.error,
      bg: theme.colors.surfaceElevated,
      border: theme.colors.error,
      Icon: AlertCircle,
    },
    info: {
      color: theme.colors.info,
      bg: theme.colors.surfaceElevated,
      border: theme.colors.info,
      Icon: Info,
    },
  }[type];

  const { Icon } = config;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        animatedStyle,
        {
          top: insets.top + theme.spacing.sm,
          backgroundColor: config.bg,
          borderColor: config.border,
          borderRadius: theme.radii.lg,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          shadowColor: theme.colors.cardShadow.shadowColor,
          shadowOffset: theme.colors.cardShadow.shadowOffset,
          shadowOpacity: theme.colors.cardShadow.shadowOpacity,
          shadowRadius: theme.colors.cardShadow.shadowRadius,
          elevation: 6,
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
    >
      <Icon size={18} color={config.color} strokeWidth={2.4} style={styles.icon} />
      <Text
        style={[
          styles.text,
          {
            color: theme.colors.textPrimary,
            fontFamily: theme.typography.fonts.bodyMedium,
            fontSize: theme.typography.sizes.sm,
          },
        ]}
        numberOfLines={2}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
});
