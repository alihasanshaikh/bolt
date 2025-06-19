export interface PitchData {
  ideaName: string;
  description: string;
  problem: string;
  solution: string;
  targetAudience: string;
  revenueModel: string;
}

export type Screen = 'home' | 'builder' | 'generated' | 'voiceover';

export interface GeneratedContent {
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  market: string;
  revenue: string;
}