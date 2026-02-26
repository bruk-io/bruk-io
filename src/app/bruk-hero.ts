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
import { hero, feed } from '../content/index.js';
import type { FeedEntry, FeedEntryType, StatusItem } from '../content/types.js';
import { fadeStyles } from './shared-styles.js';

// --- Feed command handler (shared with the terminal) ---

const TYPE_TAGS: Record<FeedEntryType, string> = {
  thought: 'muted',
  link: 'primary',
  build: 'success',
  question: 'warning',
  til: 'tertiary',
};

const TYPE_LABELS: Record<FeedEntryType, string> = {
  thought: 'thought',
  link: 'link',
  build: 'build',
  question: 'question',
  til: 'TIL',
};

const COMMANDS: Record<string, string> = {
  status: 'Show system status.',
  feed: 'Show recent feed entries. Use --type=<type> to filter.',
  help: 'List available commands.',
  clear: 'Clear the terminal.',
  about: 'What is this?',
  types: 'List entry types.',
};

class HeroCommandHandler implements CommandHandler {
  private _onExpand: () => void;

  constructor(onExpand: () => void) {
    this._onExpand = onExpand;
  }

  async execute(cmd: string, args: string[], terminal: TerminalAdapter): Promise<void> {
    terminal.startCommand();
    // Any command besides status expands the terminal
    if (cmd !== 'status') this._onExpand();

    try {
      switch (cmd) {
        case 'status':
          this._status(terminal);
          break;
        case 'help':
          this._help(terminal);
          break;
        case 'feed':
          this._feed(args, terminal);
          break;
        case 'clear':
          terminal.clear();
          break;
        case 'about':
          this._about(terminal);
          break;
        case 'types':
          this._types(terminal);
          break;
        default:
          terminal.writeError(`unknown command: ${cmd}`);
          terminal.writeLine('{muted}Type {bright}help{/}{muted} for available commands.{/}');
      }
    } finally {
      terminal.endCommand();
    }
  }

  complete(partial: string): string[] {
    const cmds = Object.keys(COMMANDS);
    if (!partial) return cmds;
    return cmds.filter(c => c.startsWith(partial));
  }

  private _status(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    for (const s of hero.status) {
      const val = s.segment ? `{primary}${s.value}{/}` : s.value;
      terminal.writeLine(`  {tertiary}${s.key.padEnd(12)}{/} ${val}`);
    }
    terminal.writeLine('');
  }

  private _help(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    terminal.writeLine('{bright}Available commands:{/}');
    terminal.writeLine('');
    for (const [cmd, desc] of Object.entries(COMMANDS)) {
      terminal.writeLine(`  {primary}${cmd.padEnd(10)}{/} ${desc}`);
    }
    terminal.writeLine('');
  }

  private _feed(args: string[], terminal: TerminalAdapter): void {
    const typeArg = args.find(a => a.startsWith('--type='));
    const filterType = typeArg?.split('=')[1] as FeedEntryType | undefined;

    let entries: FeedEntry[];
    if (filterType && filterType in TYPE_TAGS) {
      entries = feed.filter(e => e.type === filterType);
    } else if (filterType) {
      terminal.writeError(`unknown type: ${filterType}`);
      terminal.writeLine('{muted}Valid types: ' + Object.keys(TYPE_TAGS).join(', ') + '{/}');
      return;
    } else {
      entries = [...feed];
    }

    const countArg = args.find(a => a.startsWith('--count='));
    const parsed = countArg ? parseInt(countArg.split('=')[1], 10) : NaN;
    const count = isNaN(parsed) ? 5 : parsed;
    entries = entries.slice(0, count);

    if (entries.length === 0) {
      terminal.writeLine('{muted}No entries found.{/}');
      return;
    }

    terminal.writeLine('');
    for (const entry of entries) {
      const tag = TYPE_TAGS[entry.type];
      const label = TYPE_LABELS[entry.type];
      terminal.writeLine(
        `{tertiary}${entry.date}{/}  {${tag}}[${label}]{/}  ${entry.body}`
      );
      if (entry.url) {
        terminal.writeLine(`  {muted}-> ${entry.url}{/}`);
      }
      if (entry.project) {
        terminal.writeLine(`  {muted}# ${entry.project}{/}`);
      }
    }
    terminal.writeLine('');
    terminal.writeLine(`{muted}${entries.length} of ${feed.length} entries{/}`);
    terminal.writeLine('');
  }

  private _about(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    terminal.writeLine('{bright}bruk.io{/}');
    terminal.writeLine('{muted}Engineering leader building platforms, teams, and technical strategy.{/}');
    terminal.writeLine('{muted}Type {bright}feed{/}{muted} to browse or {bright}help{/}{muted} for commands.{/}');
    terminal.writeLine('');
  }

  private _types(terminal: TerminalAdapter): void {
    terminal.writeLine('');
    terminal.writeLine('{bright}Entry types:{/}');
    terminal.writeLine('');
    for (const [type, label] of Object.entries(TYPE_LABELS)) {
      const tag = TYPE_TAGS[type as FeedEntryType];
      const count = feed.filter(e => e.type === type).length;
      terminal.writeLine(`  {${tag}}[${label}]{/}  ${count} entries`);
    }
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
  private _animating = false;
  private _mounted = false;

  private _handler = new HeroCommandHandler(() => {});

  private _provider = new ContextProvider(this, {
    context: commandHandlerContext,
    initialValue: this._handler,
  });

  private _terminal?: BhTerminal;

  firstUpdated() {
    requestAnimationFrame(() => {
      this._terminal = this.renderRoot.querySelector('bh-terminal') as BhTerminal | undefined;
      if (this._terminal) {
        this._handler.execute('status', [], this._terminal);
      }
    });
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
    const hasModule = hero.status.length > 0 || feed.length > 0;

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
                title="System Status"
                status=""
                status-color=""
                prompt="\u25B8 "
                .hints=${this._expanded
                  ? [
                      { key: 'status', label: 'info' },
                      { key: 'feed', label: 'browse' },
                      { key: 'help', label: 'commands' },
                      { key: 'Esc', label: 'close' },
                    ]
                  : [
                      { key: 'status', label: 'info' },
                      { key: 'feed', label: 'browse' },
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
