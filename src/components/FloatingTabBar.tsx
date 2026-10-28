import { router } from 'expo-router';
import { Lightbulb, PlusCircle, Trophy } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme';
import { triggerHaptic } from '../utils/haptics';

export interface FloatingTabBarProps {
  state: { index: number; routes: { key: string; name: string }[] };
  descriptors: Record<string, { options?: { title?: string; tabBarAccessibilityLabel?: string } }>;
  navigation?: {
    emit: (event: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
  emitter?: { emit: (options: any) => any };
  navigateToTab?: (routeKey: string) => void;
  [key: string]: any;
}

const ICONS: Record<string, React.FC<{ color: string; size: number }>> = {
  index: ({ color, size }) => <Lightbulb size={size} color={color} strokeWidth={2.2} />,
  submit: ({ color, size }) => <PlusCircle size={size} color={color} strokeWidth={2.2} />,
  leaderboard: ({ color, size }) => <Trophy size={size} color={color} strokeWidth={2.2} />,
};

const LABELS: Record<string, string> = { index: 'Ideas', submit: 'Submit', leaderboard: 'Leaderboard' };

export const FloatingTabBar: React.FC<FloatingTabBarProps> = ({
  state,
  descriptors,
  navigation,
  emitter,
  navigateToTab,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);

  const activeIndex = state.index;
  const pillTranslateX = useSharedValue(0);
  const tabCount = state.routes.length;
  const padding = 6;
  const availableWidth = containerWidth > 0 ? containerWidth - padding * 2 : 0;
  const tabWidth = tabCount > 0 ? availableWidth / tabCount : 0;

  useEffect(() => {
    if (tabWidth > 0) {
      pillTranslateX.value = withSpring(padding + activeIndex * tabWidth, { damping: 22, stiffness: 260 });
    }
  }, [activeIndex, tabWidth, padding, pillTranslateX]);

  const pillAnimatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: pillTranslateX.value }] }));

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  const bottomInset = Platform.OS === 'web' ? 16 : Math.max(16, insets.bottom + 4);

  return (
    <View pointerEvents="box-none" style={[styles.wrapper, { bottom: bottomInset }]}>
      <View
        onLayout={onLayout}
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.elevation.floating.bg,
            borderColor: theme.colors.borderHairline,
            borderRadius: theme.radii.floating,
          },
          theme.colors.elevation.floating.shadow,
        ]}
      >
        {tabWidth > 0 && (
          <Animated.View
            style={[
              styles.activePill,
              { width: tabWidth, backgroundColor: theme.colors.surfaceElevated, borderColor: theme.colors.borderHairline },
              pillAnimatedStyle,
            ]}
          />
        )}

        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const descriptor = descriptors[route.key];
            const label = LABELS[route.name] || descriptor?.options?.title || route.name;
            const IconComponent = ICONS[route.name];

            const onPress = () => {
              triggerHaptic.selection();
              if (navigation) {
                const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!isFocused && !event?.defaultPrevented) navigation.navigate(route.name);
              } else if (navigateToTab) {
                const event = emitter?.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                if (!isFocused && !event?.defaultPrevented) navigateToTab(route.key);
              } else if (!isFocused) {
                router.navigate((route.name === 'index' ? '/' : `/${route.name}`) as any);
              }
            };

            const color = isFocused ? theme.colors.accent : theme.colors.textTertiary;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={descriptor?.options?.tabBarAccessibilityLabel || `${label} tab`}
                testID={`tab-${route.name}`}
                onPress={onPress}
                style={styles.tabButton}
              >
                {IconComponent ? <IconComponent color={color} size={20} /> : null}
                <Text
                  numberOfLines={1}
                  style={[
                    styles.tabLabel,
                    {
                      color,
                      fontFamily: isFocused ? theme.typography.fonts.subheading : theme.typography.fonts.bodyMedium,
                    },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', left: 16, right: 16, zIndex: 100, alignItems: 'center' },
  container: { width: '100%', height: 64, borderWidth: 1, overflow: 'hidden', position: 'relative', justifyContent: 'center' },
  activePill: { position: 'absolute', top: 6, bottom: 6, borderRadius: 22, borderWidth: 1 },
  tabsRow: { flexDirection: 'row', alignItems: 'center', height: '100%', paddingHorizontal: 6 },
  tabButton: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', gap: 3 },
  tabLabel: { fontSize: 11, lineHeight: 14, letterSpacing: 0.2 },
});
