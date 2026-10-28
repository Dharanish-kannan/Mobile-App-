import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  accessibilityLabel,
  testID,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled || loading) return;
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.97, { damping: 15, stiffness: 350 });
  };

  const handlePressOut = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, { damping: 15, stiffness: 350 });
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';
  const isDisabled = disabled || loading;

  const textColor = isDisabled
    ? theme.colors.buttonDisabledText
    : isPrimary
    ? theme.colors.onAccent
    : isSecondary
    ? theme.colors.textPrimary
    : theme.colors.accent;

  const content = (
    <View style={styles.innerRow}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
          style={styles.spinner}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' ? (
            <View style={styles.leftIcon}>{icon}</View>
          ) : null}
          <Text
            style={[
              styles.baseText,
              {
                fontFamily: isPrimary
                  ? theme.typography.fonts.heading
                  : theme.typography.fonts.subheading,
                fontSize: theme.typography.sizes.md,
                color: textColor,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' ? (
            <View style={styles.rightIcon}>{icon}</View>
          ) : null}
        </>
      )}
    </View>
  );

  return (
    <AnimatedPressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: isDisabled }}
      onPress={isDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.buttonBase,
        isPrimary && !isDisabled && theme.colors.accentGlow,
        isSecondary && {
          backgroundColor: theme.colors.elevation.raised.bg,
          borderWidth: 1,
          borderColor: theme.colors.borderHairline,
        },
        isGhost && { backgroundColor: 'transparent' },
        isDisabled && isPrimary && {
          backgroundColor: theme.colors.buttonDisabledBg,
          borderWidth: 1,
          borderColor: theme.colors.borderHairline,
        },
        animatedStyle,
        style,
      ]}
    >
      {isPrimary && !isDisabled ? (
        <LinearGradient
          colors={theme.colors.buttonPrimaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradientFill, { borderRadius: theme.radii.lg }]}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    height: 52,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradientFill: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  baseText: {
    letterSpacing: -0.2,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  spinner: {
    paddingVertical: 2,
  },
});
