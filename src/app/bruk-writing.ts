import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { posts, filters } from '../content/index.js';
import './bruk-section-header.js';
import '@bruk-io/bh-01';

@customElement('bruk-writing')
export class BrukWriting extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 48px 0;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
      scroll-margin-top: 72px;
    }

    .filters {
      display: flex;
      gap: 6px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .filter-btn {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
      background: var(--bh-color-surface-recessed);
      border: 1px solid var(--bh-color-border);
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: var(--bh-shadow-raised);
    }

    .filter-btn:hover {
      color: var(--bh-color-text);
      border-color: var(--bh-color-text-muted);
    }

    .filter-btn:active {
      box-shadow: var(--bh-shadow-inset);
      transform: translateY(1px);
    }

    .filter-btn.active {
      color: var(--bh-color-primary);
      border-color: var(--bh-color-primary);
      background: var(--bh-color-primary-glow);
      box-shadow: var(--bh-shadow-inset), 0 0 0 1px rgba(255,107,53,0.1);
    }

    .posts-panel {
      background: var(--bh-color-surface);
      border: 1px solid var(--bh-color-border);
      border-radius: var(--bh-radius-lg);
      overflow: hidden;
      box-shadow: var(--bh-shadow-raised);
      transition: background 0.5s, border-color 0.5s;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      background: var(--bh-color-surface-recessed);
      border-bottom: 1px solid var(--bh-color-border);
      box-shadow: var(--bh-shadow-emboss);
    }

    .panel-title {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
    }

    .panel-count {
      opacity: 0.6;
    }

    .post-item {
      display: grid;
      grid-template-columns: 90px 1fr auto;
      gap: 24px;
      align-items: baseline;
      padding: 16px 20px;
      border-bottom: 1px solid var(--bh-color-border-muted);
      text-decoration: none;
      color: inherit;
      transition: background 0.2s, border-color 0.5s, opacity 0.3s, max-height 0.4s;
      max-height: 200px;
      overflow: hidden;
    }

    .post-item:hover { background: var(--bh-color-primary-glow); }
    .post-item.hidden { opacity: 0; max-height: 0; padding: 0 20px; border: none; visibility: hidden; }
    .post-item:last-child { border-bottom: none; }

    .post-date {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 11px;
      color: var(--bh-color-text-tertiary);
      letter-spacing: 0.5px;
    }

    .post-title {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: -0.2px;
      transition: color 0.2s;
    }

    .post-item:hover .post-title { color: var(--bh-color-primary); }

    .post-tag {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      .post-item { grid-template-columns: 70px 1fr; }
      .post-tag { display: none; }
    }
  `;

  @state() private _activeFilter = 'all';

  private _setFilter(filter: string) {
    this._activeFilter = filter;
  }

  render() {
    const visible = this._activeFilter === 'all'
      ? posts
      : posts.filter(p => p.tag === this._activeFilter);
    const countStr = String(visible.length).padStart(2, '0');
    const totalStr = String(posts.length).padStart(2, '0');

    return html`
      <div class="container" id="writing">
        <bruk-section-header title="Writing" count=${totalStr} subtitle="Essays, notes, and what I'm thinking about"></bruk-section-header>

        ${filters.length > 1 ? html`
          <div class="filters">
            ${filters.map(f => html`
              <button
                class="filter-btn ${this._activeFilter === f.key ? 'active' : ''}"
                @click=${() => this._setFilter(f.key)}
              >${f.label}</button>
            `)}
          </div>
        ` : ''}

        <div class="posts-panel">
          <div class="panel-header">
            <span class="panel-title">Recent</span>
            <span class="panel-count"><bh-segment-display value=${countStr} size="sm"></bh-segment-display></span>
          </div>
          ${posts.map(p => html`
            <a href=${p.href} class="post-item ${this._activeFilter !== 'all' && p.tag !== this._activeFilter ? 'hidden' : ''}">
              <span class="post-date">${p.date}</span>
              <span class="post-title">${p.title}</span>
              <span class="post-tag">${p.tagLabel}</span>
            </a>
          `)}
        </div>
      </div>
    `;
  }
}
