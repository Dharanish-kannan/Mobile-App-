import { useFocusEffect } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { AppBackground } from '../../components/AppBackground';
import { EmptyIdeas } from '../../components/EmptyIdeas';
import { LeaderboardCard } from '../../components/LeaderboardCard';
import { Podium } from '../../components/Podium';
import { SortControl } from '../../components/SortControl';
import { useIdeaStore } from '../../store';
import { Idea, SortOrder } from '../../store/types';
import { useTheme } from '../../theme';
import { sortIdeas } from '../../utils/sortIdeas';

export default function LeaderboardScreen() {
  const { theme } = useTheme();

  const ideas = useIdeaStore((state) => state.ideas);
  const [sortBy, setSortBy] = useState<SortOrder>('votes');
  const [animationKey, setAnimationKey] = useState(0);

  // Replay staggered entrance animation when tab receives focus
  useFocusEffect(
    useCallback(() => {
      setAnimationKey((prev) => prev + 1);
    }, [])
  );

  const handleSortChange = useCallback((newSort: SortOrder) => {
    setSortBy(newSort);
    setAnimationKey((prev) => prev + 1);
  }, []);

  // Top 5 ideas with stable two-tier tiebreakers
  const topIdeas = useMemo(() => {
    return sortIdeas(ideas, sortBy).slice(0, 5);
  }, [ideas, sortBy]);

  const remainingIdeas = useMemo(() => {
    return topIdeas.slice(3);
  }, [topIdeas]);

  const keyExtractor = useCallback(
    (item: Idea) => `${item.id}-${animationKey}`,
    [animationKey]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Idea; index: number }) => (
      <LeaderboardCard idea={item} rank={index + 4} index={index + 3} />
    ),
    []
  );

  return (
    <AppBackground>
      <FlatList
        data={remainingIdeas}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: theme.spacing.md,
            paddingTop: theme.spacing.md,
            paddingBottom: 120,
          },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          topIdeas.length > 0 ? (
            <View key={`header-${animationKey}`}>
              <SortControl
                value={sortBy}
                onChange={handleSortChange}
                label={`Top ${topIdeas.length} Leaderboard`}
              />
              <Podium ideas={topIdeas} />
              {remainingIdeas.length > 0 && (
                <Text
                  style={[
                    styles.sectionHeader,
                    {
                      color: theme.colors.textTertiary,
                      fontFamily: theme.typography.fonts.bodyBold,
                      fontSize: 11,
                      marginBottom: theme.spacing.sm,
                      marginTop: theme.spacing.sm,
                    },
                  ]}
                >
                  RUNNERS UP
                </Text>
              )}
            </View>
          ) : undefined
        }
        ListEmptyComponent={<EmptyIdeas />}
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { flexGrow: 1 },
  sectionHeader: { letterSpacing: 0.8 },
});
