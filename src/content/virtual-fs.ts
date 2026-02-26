export interface VirtualFile {
  kind: 'file';
  name: string;
  path: string;
  meta: Record<string, unknown>;
  body: string;
}

export interface VirtualDir {
  kind: 'dir';
  name: string;
  path: string;
  children: (VirtualFile | VirtualDir)[];
}

export type VirtualNode = VirtualFile | VirtualDir;

export interface VirtualFs {
  root: VirtualDir;
  resolve(path: string, cwd?: string): VirtualNode | null;
}

function normalizePath(path: string, cwd: string): string {
  // Handle ~ as root
  let resolved = path;
  if (resolved === '~' || resolved === '') return '/';
  if (resolved.startsWith('~/')) resolved = '/' + resolved.slice(2);
  // Handle relative paths
  if (!resolved.startsWith('/')) resolved = cwd + '/' + resolved;
  // Resolve . and ..
  const parts: string[] = [];
  for (const seg of resolved.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      parts.pop();
    } else {
      parts.push(seg);
    }
  }
  return '/' + parts.join('/');
}

function findNode(root: VirtualDir, absPath: string): VirtualNode | null {
  if (absPath === '/') return root;
  const segments = absPath.split('/').filter(Boolean);
  let current: VirtualNode = root;
  for (const seg of segments) {
    if (current.kind !== 'dir') return null;
    const child: VirtualNode | undefined = current.children.find(c => c.name === seg);
    if (!child) return null;
    current = child;
  }
  return current;
}

export function createVirtualFs(root: VirtualDir): VirtualFs {
  return {
    root,
    resolve(path: string, cwd = '/'): VirtualNode | null {
      const abs = normalizePath(path, cwd);
      return findNode(root, abs);
    },
  };
}
