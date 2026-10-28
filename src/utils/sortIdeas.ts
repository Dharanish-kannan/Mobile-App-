import { Idea, SortOrder } from '../store/types';

/**
 * Sorts ideas by votes or rating with consistent deterministic tiebreakers:
 * - When sorting by votes: primary votes desc -> rating desc -> newest first
 * - When sorting by rating: primary rating desc -> votes desc -> newest first
 */
export function sortIdeas(ideas: Idea[], sortBy: SortOrder): Idea[] {
  return [...ideas].sort((a, b) => {
    if (sortBy === 'votes') {
      if (b.votes !== a.votes) return b.votes - a.votes;
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.createdAt - a.createdAt;
    } else {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (b.votes !== a.votes) return b.votes - a.votes;
      return b.createdAt - a.createdAt;
    }
  });
}
