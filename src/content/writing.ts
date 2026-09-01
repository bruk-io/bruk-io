import type { Post, FilterDef } from './types.js';
import { articles, shortDate } from './articles.js';

/** The post list is derived from the markdown, so there is one source of truth. */
export const posts: Post[] = articles.map(a => ({
  date: shortDate(a.date),
  title: a.title,
  tag: a.tag,
  tagLabel: a.tagLabel,
  href: `/writing/${a.slug}`,
}));

export const filters: FilterDef[] = [
  { key: 'all', label: 'All' },
  { key: 'architecture', label: 'Architecture' },
  { key: 'ai', label: 'AI / LLM' },
  { key: 'devex', label: 'DevEx' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'career', label: 'Career' },
  { key: 'personal', label: 'Personal' },
];
