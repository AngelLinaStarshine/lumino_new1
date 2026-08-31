/** LuminoLearn curriculum constants — matches marketing site subjects */

export const CURRICULUM_SUBJECTS = {
  ai: {
    slug: 'ai',
    name: 'AI',
    shortLabel: 'AI',
    color: 'bg-violet-100 text-violet-900 border-violet-200',
    barColor: 'bg-violet-500',
  },
  cybersecurity: {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    shortLabel: 'Cyber',
    color: 'bg-sky-100 text-sky-900 border-sky-200',
    barColor: 'bg-sky-500',
  },
  math_physics: {
    slug: 'math_physics',
    name: 'Math + Physics',
    shortLabel: 'Math+Physics',
    color: 'bg-amber-100 text-amber-900 border-amber-200',
    barColor: 'bg-amber-500',
  },
} as const;

export const LEVEL_TIERS = ['foundations', 'building', 'depth'] as const;
export type LevelTier = (typeof LEVEL_TIERS)[number];

export const TIER_LABELS: Record<LevelTier, string> = {
  foundations: 'Foundations',
  building: 'Building',
  depth: 'Depth',
};

export type PracticeQuestionType = 'multiple_choice' | 'short_answer' | 'code';

export interface PracticeContent {
  type: PracticeQuestionType;
  prompt: string;
  options?: string[];
  starterCode?: string;
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}

export function ageFromDob(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function isUnder13(dob: string): boolean {
  return ageFromDob(dob) < 13;
}
