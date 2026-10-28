import { Idea } from './types';

export const SEED_IDEAS: Idea[] = [
  {
    id: 'seed-auditgenie-01',
    name: 'AuditGenie',
    tagline: 'SOC2 and HIPAA compliance readiness in days, not quarterly tears',
    description:
      'Continuously scans cloud architecture, IAM roles, GitHub secrets, and employee onboarding flows to automatically assemble verifiable evidence vaults for enterprise security audits.',
    rating: 94,
    feedback: 'Boring enterprise problem + compliance anxiety = guaranteed seed round check.',
    votes: 67,
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
  {
    id: 'seed-pulsesync-02',
    name: 'PulseSync',
    tagline: 'Real-time AI telemetry for dev teams without the micro-management vibe',
    description:
      'Analyzes Git commits, pull requests, and async communication to highlight velocity blockers, code churn, and sprint burnout before deadlines slip. Zero invasive surveillance or screenshot tracking.',
    rating: 88,
    feedback: 'Engineers might actually tolerate this instead of revolting on Hacker News.',
    votes: 42,
    createdAt: Date.now() - 1000 * 60 * 60 * 36,
  },
  {
    id: 'seed-ghostkitchen-03',
    name: 'GhostKitchen OS',
    tagline: 'Automated dynamic inventory & pricing for multi-brand cloud kitchens',
    description:
      'Consolidates delivery tablet chaos into one intelligent kitchen display system. Dynamically syncs prep times, ingredient buffers, and surge margins across DoorDash, UberEats, and direct web orders.',
    rating: 79,
    feedback: 'High restaurant turnover meets high SaaS margin; just don’t burn the garlic naan.',
    votes: 35,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 'seed-petvitals-04',
    name: 'PetVitals AI',
    tagline: 'Continuous biometric collars that flag early canine ailments before the vet bill hurts',
    description:
      'Ultra-low-power BLE smart collars tracking resting respiratory rates, scratching frequencies, and sleep disruptions to alert pet parents of early ear infections or cardiac distress.',
    rating: 68,
    feedback: 'Pet parents will skip human groceries to pay this subscription.',
    votes: 19,
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: 'seed-decafcoffee-05',
    name: 'DecafCoffee.Club',
    tagline: 'Curated single-origin Swiss Water Process beans for caffeine-sensitive purists',
    description:
      'Direct-trade micro-roasts for coffee snobs who want rich chocolate and stone fruit tasting notes at 9 PM without trembling through 3 AM insomnia.',
    rating: 48,
    feedback: 'A passionately obsessed niche with high CAC and low defensibility. Good luck with the roast margins.',
    votes: 12,
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
  },
];
