import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ContextProvider } from '@lit/context';
import {
  commandHandlerContext,
  type TerminalAdapter,
  type CommandHandler,
  type BhTerminal,
} from '@bruk-io/bh-01';
import '@bruk-io/bh-01';
import { hero } from '../content/index.js';
import { fs } from '../content/parser.js';
import type { VirtualDir, VirtualFile, VirtualNode } from '../content/virtual-fs.js';
import type { FeedEntryType } from '../content/types.js';
import { fadeStyles } from './shared-styles.js';

// --- Feed type styling ---

const TYPE_TAGS: Record<FeedEntryType, string> = {
  thought: 'muted',
  link: 'primary',
  build: 'success',
  question: 'warning',
  til: 'tertiary',
};

const COMMANDS: Record<string, string> = {
  neofetch: 'Display system info.',
  ls: 'List directory contents. Usage: ls [path]',
  cat: 'Show file contents. Usage: cat <path>',
  cd: 'Change directory. Usage: cd <path>',
  pwd: 'Print working directory.',
  whoami: 'About this site.',
  help: 'List available commands.',
  clear: 'Clear the terminal.',
};

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  const mon = d.toLocaleDateString('en-US', { month: 'short' });
  const day = String(d.getDate()).padStart(2, ' ');
  return `${mon} ${day}`;
}

function cwdDisplay(cwd: string): string {
  if (cwd === '/') return '~';
  return '~/' + cwd.slice(1);
}

class HeroCommandHandler implements CommandHandler {
  private _onExpand: () => void;
  private _cwd = '/';
  private _onCwdChange: (cwd: string) => void;

  constructor(onExpand: () => void, onCwdChange: (cwd: string) => void) {
    this._onExpand = onExpand;
    this._onCwdChange = onCwdChange;
  }

  get cwd(): string {
    return this._cwd;
  }

  async execute(cmd: string, args: string[], terminal: TerminalAdapter): Promise<void> {
    terminal.startCommand();
    if (cmd !== 'neofetch') this._onExpand();

    try {
      switch (cmd) {
        case 'neofetch':
          this._neofetch(terminal);
          break;
        case 'help':
          this._help(terminal);
          break;
        case 'ls':
          this._ls(args, terminal);
          break;
        case 'cat':
          this._cat(args, terminal);
          break;
        case 'cd':
          this._cd(args, terminal);
          break;
        case 'pwd':
          terminal.writeLine(cwdDisplay(this._cwd));
          break;
        case 'whoami':
          this._whoami(terminal);
          break;
        case 'clear':
          terminal.clear();
          break;
        default:
          terminal.writeError(`${cmd}: command not found`);
      }
    } finally {
      terminal.endCommand();
    }
  }

  complete(partial: string): string[] {
    // Path completion for cat, cd, ls
    const pathCmds = ['cat', 'cd', 'ls'];
    for (const cmd of pathCmds) {
      const prefix = cmd + ' ';
      if (partial.startsWith(prefix) || partial === cmd) {
        const fragment = partial.startsWith(prefix) ? partial.slice(prefix.length) : '';
        return this._completePath(fragment).map(f => `${cmd} ${f}`);
      }
    }

    const cmds = Object.keys(COMMANDS);
    if (!partial) return cmds;
    return cmds.filter(c => c.startsWith(partial));
  }

  private _completePath(fragment: string): string[] {
    // Split fragment into dir part and name part
    const lastSlash = fragment.lastIndexOf('/');
    let dirPart: string;
    let namePart: string;

    if (lastSlash === -1) {
      dirPart = '';
      namePart = fragment;
    } else {
      dirPart = fragment.slice(0, lastSlash + 1);
      namePart = fragment.slice(lastSlash + 1);
    }

    const lookupPath = dirPart || '.';
    const node = fs.resolve(lookupPath, this._cwd);
    if (!node || node.kind !== 'dir') return [];

    return node.children
      .filter(c => c.name.startsWith(namePart))
      .map(c => dirPart + c.name + (c.kind === 'dir' ? '/' : ''));
  }

  private _neofetch(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    for (const s of hero.status) {
      const val = s.segment ? `{primary}${s.value}{/}` : s.value;
      terminal.writeLine(`  {tertiary}${s.key.padEnd(12)}{/} ${val}`);
    }
    terminal.writeLine('');
  }

  private _help(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    for (const [cmd, desc] of Object.entries(COMMANDS)) {
      terminal.writeLine(`  {primary}${cmd.padEnd(10)}{/} {muted}${desc}{/}`);
    }
    terminal.writeLine('');
  }

  private _ls(args: string[], terminal: TerminalAdapter): void {
    const target = args[0] || '.';
    const node = fs.resolve(target, this._cwd);

    if (!node) {
      terminal.writeError(`ls: ${target}: No such file or directory`);
      return;
    }

    if (node.kind === 'file') {
      terminal.writeLine(node.name);
      return;
    }

    const dir = node as VirtualDir;
    terminal.writeLine('');
    terminal.writeLine(`{muted}total ${dir.children.length}{/}`);
    for (const child of dir.children) {
      if (child.kind === 'dir') {
        terminal.writeLine(
          `{muted}drwxr-xr-x  bruk        {/}  {primary}${child.name}/{/}`
        );
      } else {
        const file = child as VirtualFile;
        const type = file.meta.type as FeedEntryType | undefined;
        const date = file.meta.date ? formatDate(file.meta.date as string) : '       ';
        const tag = type && TYPE_TAGS[type] ? TYPE_TAGS[type] : 'bright';
        terminal.writeLine(
          `{muted}-rw-r--r--  bruk  ${date}{/}  {${tag}}${file.name}{/}`
        );
      }
    }
    terminal.writeLine('');
  }

  private _cat(args: string[], terminal: TerminalAdapter): void {
    if (args.length === 0) {
      terminal.writeError('usage: cat <path>');
      return;
    }

    const target = args[0];
    const node = fs.resolve(target, this._cwd);

    if (!node) {
      terminal.writeError(`cat: ${target}: No such file or directory`);
      return;
    }

    if (node.kind === 'dir') {
      terminal.writeError(`cat: ${target}: Is a directory`);
      return;
    }

    const file = node as VirtualFile;
    terminal.writeLine('');
    terminal.writeLine(`{muted}# ${file.name}{/}`);

    // Render relevant frontmatter as header comments
    for (const [key, value] of Object.entries(file.meta)) {
      if (key === 'title') continue; // shown as filename
      if (Array.isArray(value)) continue; // skip complex values
      terminal.writeLine(`{muted}# ${key}: ${value}{/}`);
    }

    terminal.writeLine('');
    terminal.writeLine(file.body);

    // Render links array if present (contact.md)
    if (Array.isArray(file.meta.links)) {
      terminal.writeLine('');
      for (const link of file.meta.links as Array<Record<string, string>>) {
        terminal.writeLine(`  {primary}${link.label}{/}  {muted}${link.href}{/}`);
      }
    }

    terminal.writeLine('');
  }

  private _cd(args: string[], terminal: TerminalAdapter): void {
    const target = args[0] || '~';
    const node = fs.resolve(target, this._cwd);

    if (!node) {
      terminal.writeError(`cd: ${target}: No such file or directory`);
      return;
    }

    if (node.kind !== 'dir') {
      terminal.writeError(`cd: ${target}: Not a directory`);
      return;
    }

    this._cwd = node.path;
    this._onCwdChange(this._cwd);
  }

  private _whoami(terminal: TerminalAdapter): void {
    const readme = fs.resolve('README.md') as VirtualFile | null;
    terminal.writeLine('');
    if (readme) {
      terminal.writeLine(`{muted}# ${readme.meta.title || 'README.md'}{/}`);
      terminal.writeLine('');
      // Show first paragraph
      const firstParagraph = readme.body.split('\n\n')[0];
      if (firstParagraph) {
        terminal.writeLine(firstParagraph.trim());
      }
    } else {
      terminal.writeLine('{bright}bruk.io{/} {muted}— engineering leader, platform builder{/}');
    }
    terminal.writeLine('');
    terminal.writeLine('{muted}Type {bright}ls{/}{muted} to browse or {bright}help{/}{muted} for commands.{/}');
    terminal.writeLine('');
  }
}

@customElement('bruk-hero')
export class BrukHero extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 130px 0 48px;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
      scroll-margin-top: 72px;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 48px;
      align-items: end;
    }

    .hero-label {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 10px;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hero-label::before {
      content: '';
      width: 24px;
      height: 1px;
      background: var(--bh-color-border-bright);
    }

    h1 {
      font-family: var(--font-sans, 'Instrument Sans', sans-serif);
      font-size: clamp(40px, 5.2vw, 64px);
      font-weight: 700;
      line-height: 1.06;
      letter-spacing: -2px;
      margin-bottom: 24px;
    }

    .accent { color: var(--bh-color-primary); }

    .hero-description {
      font-size: 16px;
      line-height: 1.75;
      color: var(--bh-color-text-muted);
      max-width: 500px;
    }

    /* Terminal module — compact inline */
    .terminal-wrap {
      position: relative;
      height: 260px;
      grid-column: 2;
      grid-row: 1;
    }

    .terminal-wrap bh-terminal {
      display: block;
      height: 100%;
      --bh-terminal-height: 100%;
    }

    /* Expand / collapse button — sits on top of terminal bar */
    .expand-btn {
      position: absolute;
      top: 2px;
      right: 8px;
      z-index: 2;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--bh-color-text-tertiary);
      cursor: pointer;
      border-radius: var(--bh-radius-sm, 4px);
      transition: color 0.2s, background 0.2s;
      padding: 0;
    }

    .expand-btn:hover {
      color: var(--bh-color-text);
      background: rgba(255, 255, 255, 0.06);
    }

    .expand-btn svg {
      width: 14px;
      height: 14px;
    }

    /* Overlay backdrop */
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0);
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      pointer-events: none;
      transition: background 0.35s ease, backdrop-filter 0.35s ease;
    }

    .overlay.open {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      pointer-events: auto;
    }

    /* Placeholder keeps layout stable when terminal lifts out */
    .terminal-placeholder {
      grid-column: 2;
      grid-row: 1;
      height: 0;
      transition: height 0.35s ease;
    }

    .terminal-placeholder.open {
      height: 260px;
    }

    /* No status module — single column */
    .hero-grid.no-module {
      grid-template-columns: 1fr;
    }

    ${fadeStyles}

    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr; gap: 36px; }
      .terminal-wrap,
      .terminal-placeholder {
        grid-column: 1;
        grid-row: auto;
      }
    }
  `;

  // Expand icon (diagonal arrows out)
  static _expandIcon = html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="10 2 14 2 14 6" /><line x1="14" y1="2" x2="9" y2="7" />
    <polyline points="6 14 2 14 2 10" /><line x1="2" y1="14" x2="7" y2="9" />
  </svg>`;

  // Collapse icon (diagonal arrows in)
  static _collapseIcon = html`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="14 6 10 6 10 2" /><line x1="10" y1="6" x2="15" y2="1" />
    <polyline points="2 10 6 10 6 14" /><line x1="6" y1="10" x2="1" y2="15" />
  </svg>`;

  private static readonly DURATION = 350;

  @state() private _expanded = false;
  @state() private _promptPath = '~';
  private _animating = false;
  private _mounted = false;

  private _handler = new HeroCommandHandler(
    () => {},
    (cwd: string) => {
      this._promptPath = cwdDisplay(cwd);
    },
  );

  private _provider = new ContextProvider(this, {
    context: commandHandlerContext,
    initialValue: this._handler,
  });

  private _terminal?: BhTerminal;

  firstUpdated() {
    requestAnimationFrame(() => {
      this._terminal = this.renderRoot.querySelector('bh-terminal') as BhTerminal | undefined;
      if (this._terminal) {
        this._bootSequence(this._terminal);
      }
    });
  }

  private async _bootSequence(terminal: BhTerminal): Promise<void> {
    const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });

    terminal.startCommand();

    terminal.writeLine('{bright}bruk.io{/} {muted}— v0.0.1{/}');
    await delay(40);
    terminal.writeLine(`{muted}${today}{/}`);
    await delay(30);
    terminal.writeLine('{muted}Building platforms, teams, and technical strategy.{/}');
    await delay(40);
    terminal.writeLine('');

    // Print status inline
    for (const s of hero.status) {
      const val = s.segment ? `{primary}${s.value}{/}` : s.value;
      terminal.writeLine(`  {tertiary}${s.key.padEnd(12)}{/} ${val}`);
      await delay(30);
    }

    terminal.writeLine('');
    await delay(30);
    terminal.writeLine('{muted}Type {bright}help{/}{muted} for commands.{/}');

    terminal.endCommand();
  }

  private _getWrap(): HTMLElement | null {
    return this.renderRoot.querySelector('.terminal-wrap') as HTMLElement | null;
  }

  private _getPlaceholder(): HTMLElement | null {
    return this.renderRoot.querySelector('.terminal-placeholder') as HTMLElement | null;
  }

  private _getOverlay(): HTMLElement | null {
    return this.renderRoot.querySelector('.overlay') as HTMLElement | null;
  }

  private _targetRect(): { top: number; left: number; width: number; height: number } {
    const w = Math.min(720, window.innerWidth - 48);
    const h = Math.min(1040, window.innerHeight - 96);
    return { top: (window.innerHeight - h) / 2, left: (window.innerWidth - w) / 2, width: w, height: h };
  }

  private _expand() {
    if (this._animating || this._expanded) return;
    const wrap = this._getWrap();
    const placeholder = this._getPlaceholder();
    const overlay = this._getOverlay();
    if (!wrap) return;

    this._animating = true;

    // Capture starting rect
    const from = wrap.getBoundingClientRect();

    // Show placeholder & overlay
    placeholder?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Pin to fixed at current position
    wrap.style.position = 'fixed';
    wrap.style.zIndex = '1000';
    wrap.style.top = `${from.top}px`;
    wrap.style.left = `${from.left}px`;
    wrap.style.width = `${from.width}px`;
    wrap.style.height = `${from.height}px`;
    wrap.style.transition = 'none';

    // Force reflow so the browser registers the starting position
    wrap.offsetHeight;

    // Animate to centered target
    const to = this._targetRect();
    wrap.style.transition = `top ${BrukHero.DURATION}ms ease, left ${BrukHero.DURATION}ms ease, width ${BrukHero.DURATION}ms ease, height ${BrukHero.DURATION}ms ease`;
    wrap.style.top = `${to.top}px`;
    wrap.style.left = `${to.left}px`;
    wrap.style.width = `${to.width}px`;
    wrap.style.height = `${to.height}px`;

    this._expanded = true;

    setTimeout(() => {
      if (!this._mounted) return;
      this._animating = false;
      this._terminal?.focus();
    }, BrukHero.DURATION);
  }

  private _collapse() {
    if (this._animating || !this._expanded) return;
    const wrap = this._getWrap();
    const placeholder = this._getPlaceholder();
    const overlay = this._getOverlay();
    if (!wrap || !placeholder) return;

    this._animating = true;

    // Fade overlay
    overlay?.classList.remove('open');

    // Read current placeholder position (accounts for scroll changes)
    const to = placeholder.getBoundingClientRect();
    wrap.style.transition = `top ${BrukHero.DURATION}ms ease, left ${BrukHero.DURATION}ms ease, width ${BrukHero.DURATION}ms ease, height ${BrukHero.DURATION}ms ease`;
    wrap.style.top = `${to.top}px`;
    wrap.style.left = `${to.left}px`;
    wrap.style.width = `${to.width}px`;
    wrap.style.height = `${to.height}px`;

    setTimeout(() => {
      if (!this._mounted) return;
      // Return to flow
      wrap.style.position = '';
      wrap.style.zIndex = '';
      wrap.style.top = '';
      wrap.style.left = '';
      wrap.style.width = '';
      wrap.style.height = '';
      wrap.style.transition = '';
      placeholder.classList.remove('open');
      document.body.style.overflow = '';
      this._expanded = false;
      this._animating = false;
    }, BrukHero.DURATION);
  }

  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._expanded) {
      this._collapse();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    this._mounted = true;
    this.addEventListener('keydown', this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    this.removeEventListener('keydown', this._onKeyDown);
    document.body.style.overflow = '';
  }

  private _renderHeadline() {
    return hero.headline.map(line => {
      if (line.includes(hero.accentWord) && hero.accentWord) {
        const parts = line.split(hero.accentWord);
        return html`${parts[0]}<span class="accent">${hero.accentWord}</span>${parts[1]}<br>`;
      }
      return html`${line}<br>`;
    });
  }

  render() {
    const hasModule = hero.status.length > 0;

    return html`
      <div class="container">
        <div class="hero-grid ${hasModule ? '' : 'no-module'}">
          <div class="fade-in">
            ${hero.label ? html`<div class="hero-label">${hero.label}</div>` : nothing}
            ${hero.headline.length ? html`<h1>${this._renderHeadline()}</h1>` : nothing}
            ${hero.description ? html`<p class="hero-description">${hero.description}</p>` : nothing}
          </div>
          ${hasModule ? html`
            <div class="terminal-placeholder"></div>
            <div class="terminal-wrap fade-in stagger-2">
              <button
                class="expand-btn"
                @click=${this._expanded ? this._collapse : this._expand}
                title=${this._expanded ? 'Collapse' : 'Expand'}
                aria-label=${this._expanded ? 'Collapse terminal' : 'Expand terminal'}
              >
                ${this._expanded ? BrukHero._collapseIcon : BrukHero._expandIcon}
              </button>
              <bh-terminal
                title="bruk.io"
                status=""
                status-color=""
                prompt="$ "
                prompt-user="bruk"
                prompt-path=${this._promptPath}
                ?scanlines=${true}
                .hints=${this._expanded
                  ? [
                      { key: 'neofetch', label: 'info' },
                      { key: 'ls', label: 'browse' },
                      { key: 'help', label: 'commands' },
                      { key: 'Esc', label: 'close' },
                    ]
                  : [
                      { key: 'neofetch', label: 'info' },
                      { key: 'ls', label: 'browse' },
                      { key: 'help', label: 'commands' },
                    ]}
              ></bh-terminal>
            </div>
          ` : nothing}
        </div>
      </div>
      <div class="overlay" @click=${this._collapse}></div>
    `;
  }
}
