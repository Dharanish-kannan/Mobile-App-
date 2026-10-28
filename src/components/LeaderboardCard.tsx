import { ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScoreRing } from './ScoreRing';
import { Idea } from '../store/types';
import { useTheme } from '../theme';

export interface LeaderboardCardProps {
  idea: Idea;
  rank: number;
  index: number;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = React.memo(
  ({ idea, rank, index }) => {
    const { theme } = useTheme();

    return (
      <Animated.View
        entering={FadeInDown.delay((index + 2) * 80).springify().damping(15)}
        accessibilityRole="summary"
        accessibilityLabel={`Rank ${rank}, ${idea.name}, ${idea.rating} rating, ${idea.votes} votes`}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceRaised,
              borderColor: theme.colors.borderSubtle,
              borderRadius: theme.radii.md,
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
              marginBottom: theme.spacing.xs,
              ...theme.colors.cardShadow,
            },
          ]}
        >
          {/* Single clean rank number */}
          <View
            style={[
              styles.rankBadge,
              {
                backgroundColor: theme.colors.surfaceSubtle,
                borderColor: theme.colors.borderSubtle,
                borderRadius: theme.radii.full,
              },
            ]}
          >
            <Text
              style={[
                styles.rankNumber,
                { color: theme.colors.textSecondary, fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.xs },
              ]}
            >
              #{rank}
            </Text>
          </View>

          {/* Name & Tagline */}
          <View style={styles.infoCol}>
            <Text
              style={[
                styles.name,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.typography.fonts.heading,
                  fontSize: theme.typography.sizes.sm,
                },
              ]}
              numberOfLines={1}
            >
              {idea.name}
            </Text>
            <Text
              style={[
                styles.tagline,
                {
                  color: theme.colors.textTertiary,
                  fontFamily: theme.typography.fonts.body,
                  fontSize: theme.typography.sizes.xs,
                  marginTop: 1,
                },
              ]}
              numberOfLines={1}
            >
              {idea.tagline}
            </Text>
          </View>

          {/* Score & Votes */}
          <View style={styles.statsCol}>
            <ScoreRing score={idea.rating} size={34} strokeWidth={2.8} showLabel={false} />
            <View style={styles.votesRow}>
              <ThumbsUp size={11} color={theme.colors.accent} strokeWidth={2} style={{ marginRight: 3 }} />
              <Text
                style={[
                  styles.votesText,
                  { color: theme.colors.textSecondary, fontFamily: theme.typography.fonts.bodyBold, fontSize: 11 },
                ]}
              >
                {idea.votes}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
);

LeaderboardCard.displayName = 'LeaderboardCard';

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
  rankBadge: { width: 30, height: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  rankNumber: { fontWeight: '700' },
  infoCol: { flex: 1, marginRight: 10 },
  name: { letterSpacing: -0.2 },
  tagline: { lineHeight: 16 },
  statsCol: { alignItems: 'flex-end', justifyContent: 'center' },
  votesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  votesText: { letterSpacing: -0.2 },
});
