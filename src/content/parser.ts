import { createVirtualFs, type VirtualDir, type VirtualFile, type VirtualFs } from './virtual-fs.js';

/**
 * Parse YAML frontmatter from a raw markdown string.
 * Handles: string values, arrays with `- item`, nested objects in arrays.
 */
export function parseFrontmatter(raw: string): { meta: Record<string, unknown>; body: string } {
  const trimmed = raw.trimStart();
  if (!trimmed.startsWith('---')) {
    return { meta: {}, body: raw.trim() };
  }

  const end = trimmed.indexOf('---', 3);
  if (end === -1) {
    return { meta: {}, body: raw.trim() };
  }

  const yamlBlock = trimmed.slice(3, end).trim();
  const body = trimmed.slice(end + 3).trim();
  const meta = parseSimpleYaml(yamlBlock);

  return { meta, body };
}

function parseSimpleYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^(\w[\w-]*)\s*:\s*(.*)/);
    if (!match) { i++; continue; }

    const key = match[1];
    const inlineValue = match[2].trim();

    // Check if next line starts an array
    if (inlineValue === '' && i + 1 < lines.length && lines[i + 1].match(/^\s+-\s/)) {
      const arr: unknown[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^\s+-\s/)) {
        const itemMatch = lines[i].match(/^\s+-\s+(.*)/);
        if (!itemMatch) { i++; continue; }

        const itemLine = itemMatch[1].trim();
        // Check if this is a key: value (nested object)
        const kvMatch = itemLine.match(/^(\w[\w-]*)\s*:\s*(.*)/);
        if (kvMatch) {
          // Start of a nested object in the array
          const obj: Record<string, string> = {};
          obj[kvMatch[1]] = kvMatch[2].trim();
          i++;
          // Collect continuation lines (indented key: value, not starting with -)
          while (i < lines.length) {
            const contMatch = lines[i].match(/^\s{2,}(\w[\w-]*)\s*:\s*(.*)/);
            if (contMatch && !lines[i].match(/^\s+-\s/)) {
              obj[contMatch[1]] = contMatch[2].trim();
              i++;
            } else {
              break;
            }
          }
          arr.push(obj);
        } else {
          arr.push(itemLine);
          i++;
        }
      }
      result[key] = arr;
    } else {
      result[key] = inlineValue;
      i++;
    }
  }

  return result;
}

/**
 * Load the virtual filesystem from Vite's import.meta.glob.
 */
const modules = import.meta.glob('/src/content/fs/**/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string }>;

function buildTree(): VirtualDir {
  const root: VirtualDir = { kind: 'dir', name: '~', path: '/', children: [] };

  // Ensure known directories exist
  const knownDirs = ['feed', 'projects'];
  for (const dirName of knownDirs) {
    root.children.push({ kind: 'dir', name: dirName, path: `/${dirName}`, children: [] });
  }

  const prefix = '/src/content/fs/';

  for (const [filePath, mod] of Object.entries(modules)) {
    const relative = filePath.slice(prefix.length); // e.g. "feed/shipped-bh-01-terminal.md"
    const segments = relative.split('/');
    const fileName = segments.pop()!;
    const { meta, body } = parseFrontmatter(mod.default);

    // Navigate/create directory structure
    let dir = root;
    let currentPath = '';
    for (const seg of segments) {
      currentPath += `/${seg}`;
      let child = dir.children.find(
        (c): c is VirtualDir => c.kind === 'dir' && c.name === seg
      );
      if (!child) {
        child = { kind: 'dir', name: seg, path: currentPath, children: [] };
        dir.children.push(child);
      }
      dir = child;
    }

    const file: VirtualFile = {
      kind: 'file',
      name: fileName,
      path: `${currentPath}/${fileName}`,
      meta,
      body,
    };
    dir.children.push(file);
  }

  // Sort children alphabetically in each directory (dirs first, then files)
  sortDir(root);

  return root;
}

function sortDir(dir: VirtualDir): void {
  dir.children.sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  for (const child of dir.children) {
    if (child.kind === 'dir') sortDir(child);
  }
}

const tree = buildTree();
export const fs = createVirtualFs(tree);
