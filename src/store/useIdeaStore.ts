import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SEED_IDEAS } from './seedData';
import { Idea, IdeaStoreState, SortOrder } from './types';
import { ThemeMode } from '../theme/types';

export const useIdeaStore = create<IdeaStoreState>()(
  persist(
    (set, get) => ({
      ideas: SEED_IDEAS,
      userVotes: {},
      themeMode: 'dark',
      sortOrder: 'votes',

      addIdea: (ideaData) => {
        const newIdea: Idea = {
          ...ideaData,
          id: `idea-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          votes: 0,
          createdAt: Date.now(),
        };

        set((state) => ({
          ideas: [newIdea, ...state.ideas],
        }));

        return newIdea;
      },

      upvoteIdea: (id: string) => {
        const { userVotes, ideas } = get();

        // Enforce ONE vote per idea
        if (userVotes[id]) {
          return false;
        }

        set({
          userVotes: {
            ...userVotes,
            [id]: true,
          },
          ideas: ideas.map((idea) =>
            idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
          ),
        });

        return true;
      },

      setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),

      setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),

      toggleTheme: () =>
        set((state) => ({
          themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
        })),

      resetToDefaults: () =>
        set({
          ideas: SEED_IDEAS,
          userVotes: {},
          sortOrder: 'votes',
          themeMode: 'dark',
        }),
    }),
    {
      name: '@startup_evaluator_storage_v1',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
