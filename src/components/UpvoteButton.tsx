import { Check, ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';

export interface UpvoteButtonProps {
  votes: number;
  isVoted: boolean;
  onUpvote: () => void;
  size?: 'sm' | 'md';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const UpvoteButton: React.FC<UpvoteButtonProps> = React.memo(({
  votes,
  isVoted,
  onUpvote,
  size = 'md',
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePress = async () => {
    if (isVoted) return;

    await triggerHaptic.medium();
    scale.value = withSequence(
      withSpring(1.22, { damping: 4, stiffness: 350 }),
      withSpring(1, { damping: 7, stiffness: 200 })
    );
    onUpvote();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isSmall = size === 'sm';
  const iconSize = isSmall ? 13 : 15;
  const fontSize = isSmall ? theme.typography.sizes.xs : theme.typography.sizes.sm;

  return (
    <AnimatedPressable
      onPress={handlePress}
      disabled={isVoted}
      accessibilityRole="button"
      accessibilityLabel={isVoted ? `Voted. ${votes} total votes` : `Upvote. ${votes} current votes`}
      accessibilityState={{ disabled: isVoted, selected: isVoted }}
      style={[
        styles.pill,
        animatedStyle,
        {
          backgroundColor: isVoted ? theme.colors.accent : theme.colors.accentSubtle,
          borderColor: isVoted ? theme.colors.accent : theme.colors.accentBorderSubtle,
          borderRadius: theme.radii.full,
          paddingHorizontal: isSmall ? theme.spacing.sm : theme.spacing.md,
          paddingVertical: isSmall ? 6 : theme.spacing.xs,
        },
      ]}
    >
      {isVoted ? (
        <Check
          size={iconSize}
          color={theme.colors.onAccent}
          strokeWidth={2.6}
          style={styles.icon}
        />
      ) : (
        <ThumbsUp
          size={iconSize}
          color={theme.colors.accent}
          strokeWidth={2.2}
          style={styles.icon}
        />
      )}

      <Text
        style={[
          styles.labelText,
          {
            color: isVoted ? theme.colors.onAccent : theme.colors.accent,
            fontFamily: theme.typography.fonts.heading,
            fontSize,
          },
        ]}
      >
        {isVoted ? 'Voted' : 'Upvote'}
      </Text>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: isVoted ? 'rgba(0,0,0,0.18)' : theme.colors.surfaceRaised,
            borderRadius: theme.radii.full,
          },
        ]}
      >
        <Text
          style={[
            styles.countText,
            {
              color: isVoted ? theme.colors.onAccent : theme.colors.accent,
              fontFamily: theme.typography.fonts.bodyBold,
              fontSize: fontSize - 1,
            },
          ]}
        >
          {votes}
        </Text>
      </View>
    </AnimatedPressable>
  );
});

UpvoteButton.displayName = 'UpvoteButton';

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: 6,
  },
  labelText: {
    letterSpacing: -0.2,
  },
  badge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    letterSpacing: -0.2,
  },
});
