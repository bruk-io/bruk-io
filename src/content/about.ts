import type { AboutContent } from './types.js';
import { fs } from './parser.js';
import type { VirtualFile } from './virtual-fs.js';

const readme = fs.resolve('README.md') as VirtualFile | null;

const paragraphs = readme
  ? readme.body
      .split('\n\n')
      .filter(p => p.trim())
      .map((text, i) => ({ text: text.trim(), ...(i === 0 ? { lead: true } : {}) }))
  : [];

export const about: AboutContent = {
  paragraphs,
  specs: [],
};
