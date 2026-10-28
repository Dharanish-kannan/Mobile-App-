import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '../theme';

export interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const ScoreRing: React.FC<ScoreRingProps> = React.memo(({
  score,
  size = 46,
  strokeWidth = 3.5,
  showLabel = true,
}) => {
  const { theme } = useTheme();

  const tier = React.useMemo(() => {
    if (score >= 90) return { color: theme.colors.scoreTierUnicorn.text, label: 'Unicorn' };
    if (score >= 75) return { color: theme.colors.scoreTierSeriesA.text, label: 'Series A' };
    if (score >= 50) return { color: theme.colors.scoreTierPromising.text, label: 'Promising' };
    return { color: theme.colors.scoreTierHighRisk.text, label: 'Risk' };
  }, [score, theme.colors]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <View style={styles.container} accessibilityLabel={`Score ${score} out of 100, ${tier.label} tier`}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Faint full-circle track behind progress arc using low-opacity tier color */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={tier.color}
            strokeWidth={strokeWidth}
            opacity={0.22}
            fill="transparent"
          />
          {/* Progress ring colored by tier */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={tier.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <Text
          style={[
            styles.scoreText,
            {
              color: theme.colors.textPrimary,
              fontFamily: theme.typography.fonts.heading,
              fontSize: theme.typography.sizes.sm,
            },
          ]}
        >
          {score}
        </Text>
      </View>
      {showLabel && (
        <Text
          style={[
            styles.tierLabel,
            {
              color: tier.color,
              fontFamily: theme.typography.fonts.bodyBold,
              fontSize: 10,
              marginTop: 3,
            },
          ]}
        >
          {tier.label}
        </Text>
      )}
    </View>
  );
});

ScoreRing.displayName = 'ScoreRing';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  scoreText: {
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  tierLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
