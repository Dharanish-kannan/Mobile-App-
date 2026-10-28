import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

import { AppBackground } from '../../components/AppBackground';
import { EmptyIdeas } from '../../components/EmptyIdeas';
import { IdeaCard } from '../../components/IdeaCard';
import { SortControl } from '../../components/SortControl';
import { useToast } from '../../components/toast/ToastContext';
import { fetchIdeas } from '../../services/ideaApi';
import { useIdeaStore } from '../../store';
import { Idea } from '../../store/types';
import { useTheme } from '../../theme';
import { triggerHaptic } from '../../utils/haptics';
import { copyIdeaToClipboard, shareIdea } from '../../utils/share';
import { sortIdeas } from '../../utils/sortIdeas';

export default function IdeasScreen() {
  const { theme } = useTheme();
  const toast = useToast();

  const ideas = useIdeaStore((state) => state.ideas);
  const userVotes = useIdeaStore((state) => state.userVotes);
  const sortOrder = useIdeaStore((state) => state.sortOrder);
  const setSortOrder = useIdeaStore((state) => state.setSortOrder);
  const upvoteIdea = useIdeaStore((state) => state.upvoteIdea);

  const [refreshing, setRefreshing] = useState(false);

  // Stable sorting with two-tier tiebreakers
  const sortedIdeas = useMemo(() => {
    return sortIdeas(ideas, sortOrder);
  }, [ideas, sortOrder]);

  const handleUpvote = useCallback(
    (id: string) => {
      const success = upvoteIdea(id);
      if (success) {
        toast.show({ message: 'Vote counted!', type: 'success' });
      }
    },
    [upvoteIdea, toast]
  );

  const handleCopy = useCallback(
    async (idea: Idea) => {
      const copied = await copyIdeaToClipboard(idea);
      if (copied) {
        toast.show({ message: `Copied "${idea.name}" pitch to clipboard!`, type: 'info' });
      }
    },
    [toast]
  );

  const handleShare = useCallback(async (idea: Idea) => {
    await shareIdea(idea);
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await triggerHaptic.light();
    try {
      await fetchIdeas();
    } catch {
      toast.show({ message: 'Failed to refresh ideas.', type: 'error' });
    } finally {
      setRefreshing(false);
    }
  }, [toast]);

  const keyExtractor = useCallback((item: Idea) => item.id, []);

  const renderItem = useCallback(
    ({ item }: { item: Idea }) => (
      <IdeaCard
        idea={item}
        isVoted={Boolean(userVotes[item.id])}
        onUpvote={handleUpvote}
        onCopy={handleCopy}
        onShare={handleShare}
      />
    ),
    [userVotes, handleUpvote, handleCopy, handleShare]
  );

  return (
    <AppBackground>
      <FlatList
        data={sortedIdeas}
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
          sortedIdeas.length > 0 ? (
            <SortControl
              value={sortOrder}
              onChange={setSortOrder}
              count={sortedIdeas.length}
            />
          ) : undefined
        }
        ListEmptyComponent={<EmptyIdeas />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.accent}
            colors={[theme.colors.accent]}
          />
        }
      />
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
