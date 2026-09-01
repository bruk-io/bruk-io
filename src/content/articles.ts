import type { Article } from './types.js';
import { parseFrontmatter } from './parser.js';

/**
 * Long-form posts, authored as markdown under `fs/writing/`.
 *
 * The filename is the slug, so `fs/writing/two-walls.md` is served at
 * `/writing/two-walls`. Frontmatter carries the rest.
 */
const modules = import.meta.glob('/src/content/fs/writing/**/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

function toArticle(filePath: string, raw: string): Article {
  const { meta, body } = parseFrontmatter(raw);
  const slug = filePath.split('/').pop()!.replace(/\.md$/, '');

  return {
    slug,
    title: String(meta.title ?? slug),
    date: String(meta.date ?? ''),
    tag: String(meta.tag ?? 'personal'),
    tagLabel: String(meta.tagLabel ?? 'Personal'),
    summary: meta.summary ? String(meta.summary) : undefined,
    body,
  };
}

export const articles: Article[] = Object.entries(modules)
  .map(([filePath, mod]) => toArticle(filePath, mod.default))
  .sort((a, b) => b.date.localeCompare(a.date));

export function findArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug);
}

/** Render an ISO date as the `MM.YY` stamp the post list uses. */
export function shortDate(iso: string): string {
  const [year, month] = iso.split('-');
  return year && month ? `${month}.${year.slice(2)}` : iso;
}

/** Render an ISO date for display at the top of an article. */
export function longDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00`);
  return Number.isNaN(parsed.getTime())
    ? iso
    : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
