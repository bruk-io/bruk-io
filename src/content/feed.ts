import type { FeedEntry } from './types.js';

export const feed: FeedEntry[] = [
  {
    type: 'build',
    date: '2026-02-25',
    body: 'Shipped bh-01 terminal component — full browser terminal with Lit Context command injection, tab completion, and semantic color tags.',
    project: 'bh-01',
  },
  {
    type: 'thought',
    date: '2026-02-24',
    body: 'Design systems should ship primitives, not opinions. The best component libraries feel like extending the platform.',
  },
  {
    type: 'til',
    date: '2026-02-23',
    body: 'DSEG14 (14-segment) renders A–Z; DSEG7 only handles digits. Learned the hard way when "OPEN" silently fell through to the fallback font.',
  },
  {
    type: 'link',
    date: '2026-02-22',
    body: 'Lit Context deep-dive — inversion of control for Web Components without prop-drilling.',
    url: 'https://lit.dev/docs/data/context/',
  },
  {
    type: 'question',
    date: '2026-02-21',
    body: 'What would a terminal-native personal site look like if you stripped away every convention borrowed from print?',
  },
  {
    type: 'build',
    date: '2026-02-20',
    body: 'Added segment display atom to bh-01 — supports ghost mode, color variants, and auto-uppercase.',
    project: 'bh-01',
  },
  {
    type: 'thought',
    date: '2026-02-18',
    body: 'The gap between "infrastructure engineer" and "platform engineer" is mostly about who you think your user is.',
  },
  {
    type: 'til',
    date: '2026-02-16',
    body: 'CSS color-scheme: dark on a single component forces the browser to render scrollbars, form controls, and system colors in dark mode — scoped, no global side effects.',
  },
];
