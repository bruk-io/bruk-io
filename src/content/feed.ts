import type { FeedEntry, FeedEntryType } from './types.js';
import { fs } from './parser.js';
import type { VirtualDir, VirtualFile } from './virtual-fs.js';

const feedDir = fs.resolve('feed') as VirtualDir | null;

function toFeedEntry(file: VirtualFile): FeedEntry {
  return {
    type: (file.meta.type as FeedEntryType) ?? 'thought',
    date: (file.meta.date as string) ?? '',
    body: file.body,
    url: file.meta.url as string | undefined,
    project: file.meta.project as string | undefined,
  };
}

export const feed: FeedEntry[] = feedDir
  ? feedDir.children
      .filter((c): c is VirtualFile => c.kind === 'file')
      .map(toFeedEntry)
      .sort((a, b) => b.date.localeCompare(a.date))
  : [];
