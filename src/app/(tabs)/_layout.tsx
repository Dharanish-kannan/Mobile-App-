import { Tabs } from 'expo-router';
import { Lightbulb, PlusCircle, Trophy } from 'lucide-react-native';
import React from 'react';

import { FloatingTabBar } from '../../components/FloatingTabBar';
import { Header } from '../../components/Header';
import { useTheme } from '../../theme';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ideas',
          tabBarAccessibilityLabel: 'Ideas feed tab',
          tabBarIcon: ({ color, size }) => (
            <Lightbulb size={size || 22} color={color} strokeWidth={2.2} />
          ),
          header: () => (
            <Header
              title="Startup Ideas"
              subtitle="Community pitch deck & evaluations"
              showThemeToggle={false}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="submit"
        options={{
          title: 'Submit',
          tabBarAccessibilityLabel: 'Submit idea tab',
          tabBarIcon: ({ color, size }) => (
            <PlusCircle size={size || 22} color={color} strokeWidth={2.2} />
          ),
          header: () => (
            <Header
              title="Submit Idea"
              subtitle="Pitch it. Get scored. See where you rank."
              showThemeToggle={false}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Leaderboard',
          tabBarAccessibilityLabel: 'Leaderboard tab',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size || 22} color={color} strokeWidth={2.2} />
          ),
          header: () => (
            <Header
              title="Leaderboard"
              subtitle="Top ranking startup concepts"
              showThemeToggle={false}
            />
          ),
        }}
      />
    </Tabs>
  );
}
