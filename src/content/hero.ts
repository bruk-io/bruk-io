import type { HeroContent } from './types.js';

export const hero: HeroContent = {
  label: 'Engineering Leadership',
  headline: ['Building systems', 'that scale', 'organisations.'],
  accentWord: 'scale',
  description: 'Engineering leader with 12+ years building platforms, teams, and technical strategy. Focused on developer productivity, AI/LLM adoption, and infrastructure that moves fast.',
  status: [
    { key: 'Location', value: 'Toronto, CA' },
    { key: 'Status', value: 'OPEN', segment: true },
    { key: 'Level', value: 'Director / PE' },
    { key: 'Domains', value: 'Platform · AI · DevEx' },
    { key: 'Exp', value: '12', segment: true },
  ],
};
