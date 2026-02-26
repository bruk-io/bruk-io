import type { ContactContent, ContactLink } from './types.js';
import { fs } from './parser.js';
import type { VirtualFile } from './virtual-fs.js';

const file = fs.resolve('contact.md') as VirtualFile | null;

const meta = file?.meta ?? {};
const links: ContactLink[] = Array.isArray(meta.links)
  ? (meta.links as Array<Record<string, string>>).map(l => ({
      label: l.label ?? '',
      href: l.href ?? '',
    }))
  : [];

export const contact: ContactContent = {
  headline: (meta.headline as string) ?? "Let's connect.",
  description: file?.body ?? '',
  links,
};
