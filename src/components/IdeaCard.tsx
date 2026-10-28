import { ChevronDown, ChevronUp, Copy, Share2, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from 'react-native';

import { ScoreRing } from './ScoreRing';
import { UpvoteButton } from './UpvoteButton';
import { Idea } from '../store/types';
import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface IdeaCardProps {
  idea: Idea;
  isVoted: boolean;
  onUpvote: (id: string) => void;
  onCopy: (idea: Idea) => void;
  onShare: (idea: Idea) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = React.memo(
  ({ idea, isVoted, onUpvote, onCopy, onShare }) => {
    const { theme } = useTheme();
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      triggerHaptic.selection();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded((prev) => !prev);
    };

    return (
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.surfaceRaised, borderColor: theme.colors.borderSubtle, borderRadius: theme.radii.lg, padding: theme.spacing.md, marginBottom: theme.spacing.md, ...theme.colors.cardShadow },
        ]}
      >
        {/* Top Section: Title & Tagline on Left, Circular Score Ring on Right */}
        <View style={styles.topRow}>
          <View style={styles.titleColumn}>
            <Text
              style={[
                styles.name,
                {
                  color: theme.colors.textPrimary,
                  fontFamily: theme.typography.fonts.heading,
                  fontSize: theme.typography.sizes.lg,
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
                  color: theme.colors.textSecondary,
                  fontFamily: theme.typography.fonts.bodyMedium,
                  fontSize: theme.typography.sizes.sm,
                  marginTop: 2,
                },
              ]}
              numberOfLines={2}
            >
              {idea.tagline}
            </Text>
          </View>

          <View style={styles.scoreWrapper}>
            <ScoreRing score={idea.rating} />
          </View>
        </View>

        {/* Description: clamped to 2 lines with Read more toggle */}
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textTertiary,
              fontFamily: theme.typography.fonts.body,
              fontSize: theme.typography.sizes.sm,
              marginTop: theme.spacing.sm,
            },
          ]}
          numberOfLines={expanded ? undefined : 2}
        >
          {idea.description}
        </Text>

        <Pressable
          onPress={toggleExpand}
          accessibilityRole="button"
          accessibilityLabel={expanded ? 'Show less description' : 'Read more description'}
          style={[styles.expandButton, { marginTop: theme.spacing.xs, marginBottom: theme.spacing.xs }]}
        >
          <Text
            style={[
              styles.expandText,
              {
                color: theme.colors.accent,
                fontFamily: theme.typography.fonts.bodyMedium,
                fontSize: theme.typography.sizes.xs,
              },
            ]}
          >
            {expanded ? 'Show less' : 'Read more'}
          </Text>
          {expanded ? (
            <ChevronUp size={13} color={theme.colors.accent} strokeWidth={2.4} />
          ) : (
            <ChevronDown size={13} color={theme.colors.accent} strokeWidth={2.4} />
          )}
        </Pressable>

        {/* Subtle AI Verdict Line */}
        <View style={[styles.verdictRow, { marginTop: theme.spacing.sm, marginBottom: theme.spacing.xxs }]}>
          <Sparkles size={12} color={theme.colors.accent} strokeWidth={2} style={styles.verdictIcon} />
          <Text
            style={[
              styles.verdictText,
              {
                color: theme.colors.textSecondary,
                fontFamily: theme.typography.fonts.body,
                fontSize: theme.typography.sizes.xs,
              },
            ]}
            numberOfLines={1}
          >
            {`"${idea.feedback}"`}
          </Text>
        </View>

        {/* Footer: Upvote Pill Button & Quiet Icon Actions */}
        <View style={[styles.footer, { borderTopColor: theme.colors.borderSubtle, paddingTop: theme.spacing.sm }]}>
          <UpvoteButton
            votes={idea.votes}
            isVoted={isVoted}
            onUpvote={() => onUpvote(idea.id)}
            size="sm"
          />

          <View style={styles.actions}>
            <Pressable
              onPress={() => onCopy(idea)}
              accessibilityRole="button"
              accessibilityLabel={`Copy pitch for ${idea.name}`}
              style={({ pressed }) => [
                styles.quietButton,
                { backgroundColor: theme.colors.surfaceSubtle, borderColor: theme.colors.borderSubtle, borderRadius: theme.radii.sm, opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Copy size={13} color={theme.colors.textSecondary} strokeWidth={2} />
            </Pressable>

            <Pressable
              onPress={() => onShare(idea)}
              accessibilityRole="button"
              accessibilityLabel={`Share pitch for ${idea.name}`}
              style={({ pressed }) => [
                styles.quietButton,
                { backgroundColor: theme.colors.surfaceSubtle, borderColor: theme.colors.borderSubtle, borderRadius: theme.radii.sm, opacity: pressed ? 0.6 : 1, marginLeft: 6 },
              ]}
            >
              <Share2 size={13} color={theme.colors.textSecondary} strokeWidth={2} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
);

IdeaCard.displayName = 'IdeaCard';

const styles = StyleSheet.create({
  card: { borderWidth: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleColumn: { flex: 1, paddingRight: 12 },
  name: { letterSpacing: -0.3 },
  tagline: { lineHeight: 18 },
  scoreWrapper: { alignSelf: 'flex-start', alignItems: 'center' },
  description: { lineHeight: 19 },
  expandButton: { flexDirection: 'row', alignItems: 'center', marginTop: 3, alignSelf: 'flex-start' },
  expandText: { marginRight: 2 },
  verdictRow: { flexDirection: 'row', alignItems: 'center' },
  verdictIcon: { marginRight: 5 },
  verdictText: { flex: 1, fontStyle: 'italic' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTopWidth: 1 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  quietButton: { width: 30, height: 30, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
