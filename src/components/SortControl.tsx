import { Flame, ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SortOrder } from '../store/types';
import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';

export interface SortControlProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
  count?: number;
  label?: string;
}

export const SortControl: React.FC<SortControlProps> = ({
  value,
  onChange,
  count,
  label,
}) => {
  const { theme } = useTheme();

  const handleSelect = async (order: SortOrder) => {
    if (order === value) return;
    await triggerHaptic.selection();
    onChange(order);
  };

  const hasLeftText = label !== undefined || count !== undefined;

  return (
    <View style={[styles.container, !hasLeftText && { justifyContent: 'center' }]}>
      {hasLeftText ? (
        <Text
          style={[
            styles.countText,
            {
              color: theme.colors.textSecondary,
              fontFamily: theme.typography.fonts.bodyMedium,
              fontSize: theme.typography.sizes.sm,
            },
          ]}
        >
          {label ?? `${count} ${count === 1 ? 'Idea' : 'Ideas'} Listed`}
        </Text>
      ) : null}

      <View
        style={[
          styles.segmentedContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            borderRadius: theme.radii.full,
            padding: 3,
          },
        ]}
        accessibilityRole="tablist"
      >
        <Pressable
          onPress={() => handleSelect('votes')}
          accessibilityRole="tab"
          accessibilityLabel="Sort by Votes"
          accessibilityState={{ selected: value === 'votes' }}
          style={[
            styles.segment,
            {
              backgroundColor:
                value === 'votes' ? theme.colors.surfaceElevated : 'transparent',
              borderColor:
                value === 'votes' ? theme.colors.border : 'transparent',
              borderRadius: theme.radii.full,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 5,
            },
          ]}
        >
          <ThumbsUp
            size={13}
            color={value === 'votes' ? theme.colors.accent : theme.colors.textMuted}
            strokeWidth={2.4}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.segmentText,
              {
                color:
                  value === 'votes'
                    ? theme.colors.textPrimary
                    : theme.colors.textSecondary,
                fontFamily: theme.typography.fonts.heading,
                fontSize: theme.typography.sizes.xs,
              },
            ]}
          >
            Votes
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelect('rating')}
          accessibilityRole="tab"
          accessibilityLabel="Sort by AI Rating"
          accessibilityState={{ selected: value === 'rating' }}
          style={[
            styles.segment,
            {
              backgroundColor:
                value === 'rating' ? theme.colors.surfaceElevated : 'transparent',
              borderColor:
                value === 'rating' ? theme.colors.border : 'transparent',
              borderRadius: theme.radii.full,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 5,
            },
          ]}
        >
          <Flame
            size={13}
            color={value === 'rating' ? theme.colors.accent : theme.colors.textMuted}
            strokeWidth={2.4}
            style={{ marginRight: 5 }}
          />
          <Text
            style={[
              styles.segmentText,
              {
                color:
                  value === 'rating'
                    ? theme.colors.textPrimary
                    : theme.colors.textSecondary,
                fontFamily: theme.typography.fonts.heading,
                fontSize: theme.typography.sizes.xs,
              },
            ]}
          >
            Rating
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  countText: {
    letterSpacing: -0.2,
  },
  segmentedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  segment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  segmentText: {
    letterSpacing: -0.2,
  },
});
