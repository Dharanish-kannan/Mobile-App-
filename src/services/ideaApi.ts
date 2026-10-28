import AsyncStorage from '@react-native-async-storage/async-storage';

import { SEED_IDEAS } from '../store/seedData';
import { Idea } from '../store/types';
import { useIdeaStore } from '../store/useIdeaStore';
import { evaluateStartupIdea, EvaluationResult } from '../utils/evaluator';

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export interface EvaluateIdeaParams {
  name: string;
  tagline?: string;
  description?: string;
}

export type EvaluateIdeaResponse = EvaluationResult;

const EVALUATE_DELAY_MIN_MS = 800;
const EVALUATE_DELAY_MAX_MS = 1500;
const FETCH_DELAY_MIN_MS = 200;
const FETCH_DELAY_MAX_MS = 500;
const SIMULATED_FAILURE_RATE = 0.05;

function simulateDelay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Evaluates a startup idea with a simulated 800-1500ms delay
 * and a ~5% simulated failure rate.
 */
export async function evaluateIdea(
  params: EvaluateIdeaParams
): Promise<EvaluateIdeaResponse> {
  const { name, tagline = '', description = '' } = params;

  await simulateDelay(EVALUATE_DELAY_MIN_MS, EVALUATE_DELAY_MAX_MS);

  if (Math.random() < SIMULATED_FAILURE_RATE) {
    throw new ApiError(
      'AI Evaluation service temporarily unavailable. Please try again.',
      503,
      'SERVICE_UNAVAILABLE'
    );
  }

  return evaluateStartupIdea(name, tagline, description);
}

/**
 * Fetches ideas with a 200-500ms simulated delay, reading from
 * persisted AsyncStorage or in-memory Zustand store / seed data.
 */
export async function fetchIdeas(): Promise<Idea[]> {
  await simulateDelay(FETCH_DELAY_MIN_MS, FETCH_DELAY_MAX_MS);

  try {
    const raw = await AsyncStorage.getItem('@startup_evaluator_storage_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (
        parsed?.state?.ideas &&
        Array.isArray(parsed.state.ideas) &&
        parsed.state.ideas.length > 0
      ) {
        return [...parsed.state.ideas];
      }
    }
  } catch {
    // Fall back to in-memory store or seed data
  }

  const inMemory = useIdeaStore.getState().ideas;
  return inMemory && inMemory.length > 0 ? [...inMemory] : [...SEED_IDEAS];
}
