import { Sparkles, TrendingUp, AlertTriangle, Flame } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme';

export interface RatingBadgeProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({
  rating,
  size = 'md',
  showLabel = false,
}) => {
  const { theme } = useTheme();

  const tierData = useMemo(() => {
    if (rating >= 90) {
      return {
        colors: theme.colors.scoreTierUnicorn,
        label: 'Unicorn',
        Icon: Flame,
      };
    }
    if (rating >= 75) {
      return {
        colors: theme.colors.scoreTierSeriesA,
        label: 'Series A',
        Icon: Sparkles,
      };
    }
    if (rating >= 50) {
      return {
        colors: theme.colors.scoreTierPromising,
        label: 'Promising',
        Icon: TrendingUp,
      };
    }
    return {
      colors: theme.colors.scoreTierHighRisk,
      label: 'High Risk',
      Icon: AlertTriangle,
    };
  }, [rating, theme.colors]);

  const sizeStyles = useMemo(() => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: theme.spacing.xs,
          paddingVertical: 2,
          fontSize: theme.typography.sizes.xs,
          iconSize: 12,
          radius: theme.radii.xs,
        };
      case 'lg':
        return {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.xs,
          fontSize: theme.typography.sizes.lg,
          iconSize: 18,
          radius: theme.radii.sm,
        };
      case 'md':
      default:
        return {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: 4,
          fontSize: theme.typography.sizes.sm,
          iconSize: 14,
          radius: theme.radii.sm,
        };
    }
  }, [size, theme]);

  const { Icon } = tierData;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tierData.colors.bg,
          borderColor: tierData.colors.border,
          borderRadius: sizeStyles.radius,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
      ]}
      accessibilityLabel={`Rating ${rating} out of 100, Tier: ${tierData.label}`}
    >
      <Icon
        size={sizeStyles.iconSize}
        color={tierData.colors.text}
        strokeWidth={2.4}
        style={{ marginRight: 4 }}
      />
      <Text
        style={[
          styles.scoreText,
          {
            color: tierData.colors.text,
            fontFamily: theme.typography.fonts.heading,
            fontSize: sizeStyles.fontSize,
          },
        ]}
      >
        {rating}
        <Text style={[styles.maxScore, { color: tierData.colors.text }]}>/100</Text>
      </Text>

      {showLabel && (
        <Text
          style={[
            styles.labelText,
            {
              color: tierData.colors.text,
              fontFamily: theme.typography.fonts.bodyMedium,
              fontSize: sizeStyles.fontSize - 2,
              marginLeft: theme.spacing.xs,
            },
          ]}
        >
          {tierData.label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  scoreText: {
    letterSpacing: -0.2,
  },
  maxScore: {
    fontSize: 10,
    opacity: 0.7,
  },
  labelText: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
