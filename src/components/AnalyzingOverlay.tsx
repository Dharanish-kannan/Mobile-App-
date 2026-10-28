import { Bot, Cpu, CheckCircle } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { RatingBadge } from './RatingBadge';
import { useTheme } from '../theme';
import { EvaluationResult } from '../utils/evaluator';

export interface AnalyzingOverlayProps {
  visible: boolean;
  result: EvaluationResult | null;
  onComplete: () => void;
}

const STATUS_MESSAGES = [
  'Scoring market size & TAM...',
  'Checking defensibility & moat...',
  'Simulating VC pitch response...',
  'Calculating unit economics...',
  'Synthesizing final verdict...',
];

export const AnalyzingOverlay: React.FC<AnalyzingOverlayProps> = ({
  visible,
  result,
  onComplete,
}) => {
  const { theme } = useTheme();
  const [statusIndex, setStatusIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (!visible) return;

    pulseScale.value = withRepeat(
      withSequence(withTiming(1.22, { duration: 600 }), withTiming(1, { duration: 600 })),
      -1,
      true
    );
    pulseOpacity.value = withRepeat(
      withSequence(withTiming(0.8, { duration: 600 }), withTiming(0.3, { duration: 600 })),
      -1,
      true
    );

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 320);

    const resultTimer = setTimeout(() => {
      clearInterval(interval);
      setShowResult(true);
    }, 1500);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(resultTimer);
      clearTimeout(finishTimer);
      setStatusIndex(0);
      setShowResult(false);
    };
  }, [visible, onComplete, pulseOpacity, pulseScale]);

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={[styles.overlay, { backgroundColor: theme.colors.overlayBackdrop }]}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surfaceElevated,
              borderColor: theme.colors.border,
              borderRadius: theme.radii.xl,
              padding: theme.spacing.xl,
            },
          ]}
          accessibilityRole="alert"
          accessibilityLiveRegion="assertive"
        >
          {!showResult ? (
            <>
              <View style={styles.pulseContainer}>
                <Animated.View
                  style={[styles.pulseRing, animatedPulseStyle, { backgroundColor: theme.colors.accentSubtle, borderColor: theme.colors.accent }]}
                />
                <View style={[styles.iconCircle, { backgroundColor: theme.colors.surface, borderColor: theme.colors.accent }]}>
                  <Bot size={32} color={theme.colors.accent} strokeWidth={2.2} />
                </View>
              </View>

              <Text style={[styles.title, { color: theme.colors.textPrimary, fontFamily: theme.typography.fonts.heading, fontSize: theme.typography.sizes.xl, marginTop: theme.spacing.lg }]}>
                Evaluating Idea...
              </Text>

              <View style={styles.statusRow}>
                <Cpu size={14} color={theme.colors.accent} style={{ marginRight: 6 }} />
                <Text style={[styles.statusText, { color: theme.colors.textSecondary, fontFamily: theme.typography.fonts.mono, fontSize: theme.typography.sizes.sm }]}>
                  {STATUS_MESSAGES[statusIndex]}
                </Text>
              </View>
            </>
          ) : (
            result && (
              <View style={styles.resultContainer}>
                <View style={styles.successIconRow}>
                  <CheckCircle size={22} color={theme.colors.success} strokeWidth={2.4} />
                  <Text
                    style={[
                      styles.completeTitle,
                      {
                        color: theme.colors.textPrimary,
                        fontFamily: theme.typography.fonts.heading,
                        fontSize: theme.typography.sizes.lg,
                        marginLeft: theme.spacing.xs,
                      },
                    ]}
                  >
                    Analysis Complete
                  </Text>
                </View>

                <View style={{ marginVertical: theme.spacing.md }}>
                  <RatingBadge rating={result.rating} size="lg" showLabel />
                </View>

                <Text
                  style={[
                    styles.feedbackText,
                    {
                      color: theme.colors.textSecondary,
                      fontFamily: theme.typography.fonts.body,
                      fontSize: theme.typography.sizes.sm,
                    },
                  ]}
                >
                  {`"${result.feedback}"`}
                </Text>
              </View>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 340, alignItems: 'center', borderWidth: 1.5 },
  pulseContainer: { width: 84, height: 84, justifyContent: 'center', alignItems: 'center' },
  pulseRing: { position: 'absolute', width: 84, height: 84, borderRadius: 42, borderWidth: 1.5 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, justifyContent: 'center', alignItems: 'center' },
  title: { textAlign: 'center' },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  statusText: { textAlign: 'center' },
  resultContainer: { alignItems: 'center', width: '100%' },
  successIconRow: { flexDirection: 'row', alignItems: 'center' },
  completeTitle: {},
  feedbackText: { textAlign: 'center', fontStyle: 'italic', lineHeight: 20 },
});
