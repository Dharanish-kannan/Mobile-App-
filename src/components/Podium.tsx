import { LinearGradient } from 'expo-linear-gradient';
import { Award, Crown, Medal, ThumbsUp } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ScoreRing } from './ScoreRing';
import { Idea } from '../store/types';
import { useTheme } from '../theme';

export interface PodiumProps {
  ideas: Idea[];
}

export const Podium: React.FC<PodiumProps> = React.memo(({ ideas }) => {
  const { theme } = useTheme();
  const topThree = ideas.slice(0, 3);

  // Order for real podium: 2nd on Left, 1st in Center, 3rd on Right
  const spots = React.useMemo(() => {
    if (topThree.length === 0) return [];
    if (topThree.length === 1) {
      return [{ idea: topThree[0], rank: 1, pedestalHeight: 92, delay: 0 }];
    }
    if (topThree.length === 2) {
      return [
        { idea: topThree[1], rank: 2, pedestalHeight: 64, delay: 100 },
        { idea: topThree[0], rank: 1, pedestalHeight: 92, delay: 0 },
      ];
    }
    return [
      { idea: topThree[1], rank: 2, pedestalHeight: 64, delay: 90 },
      { idea: topThree[0], rank: 1, pedestalHeight: 92, delay: 0 },
      { idea: topThree[2], rank: 3, pedestalHeight: 46, delay: 180 },
    ];
  }, [topThree]);

  if (spots.length === 0) return null;

  const getConfig = (rank: number) => {
    if (rank === 1) return { ...theme.colors.podiumGold, Icon: Crown, ringSize: 42, medal: '🥇' };
    if (rank === 2) return { ...theme.colors.podiumSilver, Icon: Medal, ringSize: 38, medal: '🥈' };
    return { ...theme.colors.podiumBronze, Icon: Award, ringSize: 38, medal: '🥉' };
  };

  return (
    <View style={[styles.container, { marginBottom: theme.spacing.xxl }]}>
      <View style={styles.podiumRow}>
        {spots.map(({ idea, rank, pedestalHeight, delay }) => {
          const config = getConfig(rank);
          const Icon = config.Icon;

          return (
            <Animated.View
              key={`podium-${idea.id}-${rank}`}
              entering={FadeInDown.delay(delay).springify().damping(14)}
              style={styles.spotColumn}
            >
              {/* Floating Rank Badge with Icon */}
              <View
                style={[
                  styles.iconBadge,
                  {
                    backgroundColor: config.badgeBg,
                    borderColor: config.border,
                    borderRadius: theme.radii.full,
                  },
                ]}
              >
                <Icon size={rank === 1 ? 18 : 15} color={config.accent} strokeWidth={2.4} />
              </View>

              {/* Score Ring */}
              <View style={styles.scoreBox}>
                <ScoreRing score={idea.rating} size={config.ringSize} showLabel={false} />
              </View>

              {/* Name slightly larger */}
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.colors.textPrimary,
                    fontFamily: theme.typography.fonts.heading,
                    fontSize: rank === 1 ? theme.typography.sizes.md : theme.typography.sizes.sm,
                    lineHeight: rank === 1 ? 19 : 17,
                  },
                ]}
                numberOfLines={2}
              >
                {idea.name}
              </Text>

              {/* Votes pill */}
              <View style={[styles.votesRow, { marginTop: 3, marginBottom: 8 }]}>
                <ThumbsUp size={11} color={theme.colors.accent} strokeWidth={2.2} style={{ marginRight: 3 }} />
                <Text
                  style={[
                    styles.votesText,
                    { color: theme.colors.textSecondary, fontFamily: theme.typography.fonts.bodyBold, fontSize: 11 },
                  ]}
                >
                  {idea.votes}
                </Text>
              </View>

              {/* Pedestal block: visible vertical gradient, lighter top border, soft glow on #1 */}
              <LinearGradient
                colors={config.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[
                  styles.pedestal,
                  {
                    height: pedestalHeight,
                    borderColor: config.border,
                    borderTopColor: config.borderTop,
                    borderTopWidth: 2,
                    borderTopLeftRadius: theme.radii.lg,
                    borderTopRightRadius: theme.radii.lg,
                    ...(rank === 1 && {
                      shadowColor: config.accent,
                      shadowOffset: { width: 0, height: 6 },
                      shadowOpacity: 0.45,
                      shadowRadius: 16,
                      elevation: 8,
                    }),
                  },
                ]}
              >
                <Text
                  style={[
                    styles.rankNumber,
                    { color: config.accent, fontFamily: theme.typography.fonts.heading, fontSize: rank === 1 ? 22 : 18 },
                  ]}
                >
                  {config.medal} #{rank}
                </Text>
              </LinearGradient>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
});

Podium.displayName = 'Podium';

const styles = StyleSheet.create({
  container: { width: '100%' },
  podiumRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 10 },
  spotColumn: { flex: 1, maxWidth: 140, alignItems: 'center' },
  iconBadge: { width: 30, height: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  scoreBox: { marginVertical: 3 },
  name: { textAlign: 'center', lineHeight: 16, paddingHorizontal: 2 },
  votesRow: { flexDirection: 'row', alignItems: 'center' },
  votesText: { letterSpacing: -0.2 },
  pedestal: { width: '100%', borderWidth: 1.5, borderBottomWidth: 0, alignItems: 'center', justifyContent: 'center' },
  rankNumber: { letterSpacing: -0.5 },
});
