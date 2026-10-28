export interface EvaluationResult {
  rating: number; // 0 - 100
  tier: 'unicorn' | 'strong' | 'average' | 'risk';
  tierLabel: string;
  feedback: string;
}

const WITTY_FEEDBACK: Record<'unicorn' | 'strong' | 'average' | 'risk', string[]> = {
  unicorn: [
    'Boring enterprise problem + compliance anxiety = guaranteed seed round check.',
    'VCs are already sending aggressive term sheets to your spam folder.',
    'High retention, absurd margins, and users will pay with corporate cards without asking.',
    'Clear unfair advantage. Just hire an accountant before Y Combinator calls.',
    'This will print recurring revenue faster than Stripe can process webhooks.',
  ],
  strong: [
    'Engineers might actually tolerate this instead of revolting on Hacker News.',
    'High restaurant turnover meets high SaaS margin; just don’t burn the garlic naan.',
    'Strong unit economics if you keep customer acquisition cost below your ego.',
    'Solves a genuine toothache. Make sure you don’t over-engineer the v1.',
    'Solid B2B wedge. Enterprise buyers won’t get fired for buying this.',
  ],
  average: [
    'Pet parents will skip human groceries to pay this subscription.',
    'Interesting concept, but requires three miracles and a TikTok influencer.',
    'You are one feature release away from being swallowed whole by Big Tech.',
    'Could be a cozy lifestyle business if you don’t raise VC expectations.',
    'Great weekend project; maybe pivot before pitching anyone in a fleece vest.',
  ],
  risk: [
    'A passionately obsessed niche with high CAC and low defensibility. Good luck with the roast margins.',
    'You just invented a solution in desperate search of a problem.',
    'This is a Chrome extension pretending to be a venture-scale startup.',
    'Users will enthusiastically say they want it, then refuse to enter credit card digits.',
    'Pivot or perish: the unit economics are currently running backwards.',
  ],
};

/**
 * Deterministic hash combining character codes, prime multipliers, and normalized offsets.
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * Generates a deterministic-ish rating (0-100) and witty feedback.
 * Base score is tied to the hash of the startup name and tagline,
 * with a controlled deterministic pseudo-random offset.
 */
export function evaluateStartupIdea(
  name: string,
  tagline: string = '',
  description: string = ''
): EvaluationResult {
  const cleanName = name.trim().toLowerCase();
  const cleanTagline = tagline.trim().toLowerCase();
  const cleanDesc = description.trim().toLowerCase();

  const primaryHash = hashString(cleanName);
  const secondaryHash = hashString(cleanTagline + cleanDesc);

  // Derive score between 28 and 97
  const baseScore = 28 + (primaryHash % 62);
  const modifier = ((secondaryHash % 17) - 8); // -8 to +8 offset
  const finalRating = Math.max(15, Math.min(99, baseScore + modifier));

  let tier: 'unicorn' | 'strong' | 'average' | 'risk';
  let tierLabel: string;

  if (finalRating >= 90) {
    tier = 'unicorn';
    tierLabel = 'Unicorn Tier';
  } else if (finalRating >= 75) {
    tier = 'strong';
    tierLabel = 'Series A Contender';
  } else if (finalRating >= 50) {
    tier = 'average';
    tierLabel = 'Promising Spark';
  } else {
    tier = 'risk';
    tierLabel = 'Pivot or Perish';
  }

  // Pick deterministic feedback index from hash
  const feedbackList = WITTY_FEEDBACK[tier];
  const feedbackIndex = (primaryHash + secondaryHash) % feedbackList.length;
  const feedback = feedbackList[feedbackIndex];

  return {
    rating: finalRating,
    tier,
    tierLabel,
    feedback,
  };
}
