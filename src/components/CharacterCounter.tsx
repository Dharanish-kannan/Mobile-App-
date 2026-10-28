import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme';

export interface CharacterCounterProps {
  current: number;
  min?: number;
  max: number;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  current,
  min,
  max,
}) => {
  const { theme } = useTheme();

  const isExceeded = current > max;
  const isBelowMin = min !== undefined && current > 0 && current < min;
  const isNearLimit = !isExceeded && current >= max * 0.9;

  let textColor = theme.colors.textTertiary;
  if (isExceeded) {
    textColor = theme.colors.error;
  } else if (isBelowMin || isNearLimit) {
    textColor = theme.colors.warning;
  }

  return (
    <View style={styles.container} accessibilityRole="text" accessibilityLabel={`${current} of ${max} characters`}>
      {min !== undefined && current < min && current > 0 ? (
        <Text
          style={[
            styles.minHint,
            {
              color: theme.colors.warning,
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.xs,
              marginRight: theme.spacing.xs,
            },
          ]}
        >
          (min {min})
        </Text>
      ) : null}
      <Text
        style={[
          styles.counterText,
          {
            color: textColor,
            fontFamily: theme.typography.fonts.mono,
            fontSize: theme.typography.sizes.xs,
          },
        ]}
      >
        {current}/{max}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  minHint: {},
  counterText: {
    letterSpacing: 0.2,
  },
});
