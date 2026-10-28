import { ThemeMode } from '../theme/types';

export interface Idea {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rating: number; // 0 to 100
  feedback: string;
  votes: number;
  createdAt: number;
}

export type SortOrder = 'votes' | 'rating';

export interface IdeaStoreState {
  ideas: Idea[];
  userVotes: Record<string, boolean>; // ideaId -> true if voted
  themeMode: ThemeMode;
  sortOrder: SortOrder;

  // Actions
  addIdea: (idea: Omit<Idea, 'id' | 'votes' | 'createdAt'>) => Idea;
  upvoteIdea: (id: string) => boolean;
  setSortOrder: (order: SortOrder) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  resetToDefaults: () => void;
}
