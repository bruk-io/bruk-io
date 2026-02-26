import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { about } from '../content/index.js';
import type { SpecBlock } from '../content/types.js';
import { fadeStyles } from './shared-styles.js';
import './bruk-section-header.js';

@customElement('bruk-about')
export class BrukAbout extends LitElement {
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

    .about-grid {
      display: grid;
      grid-template-columns: 1fr;
      max-width: 720px;
    }

    .about-text p {
      font-size: 15px;
      line-height: 1.8;
      color: var(--bh-color-text-muted);
      margin-bottom: 18px;
      transition: color 0.5s;
    }

    .about-text p.lead {
      font-size: 17px;
      color: var(--bh-color-text);
    }

    .spec-panel {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .spec-block {
      background: var(--bh-color-surface);
      border: 1px solid var(--bh-color-border);
      border-radius: var(--bh-radius-sm);
      overflow: hidden;
      box-shadow: var(--bh-shadow-raised);
      transition: background 0.5s, border-color 0.5s;
    }

    .spec-block-header {
      padding: 8px 14px;
      background: var(--bh-color-surface-recessed);
      border-bottom: 1px solid var(--bh-color-border);
      box-shadow: var(--bh-shadow-emboss);
    }

    .spec-label {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
    }

    .spec-body {
      padding: 12px 14px;
    }

    .spec-value {
      font-size: 13px;
      font-weight: 500;
      color: var(--bh-color-text);
      line-height: 1.6;
      transition: color 0.5s;
    }

    @media (max-width: 768px) {
      .about-grid { grid-template-columns: 1fr; }
    }

    ${fadeStyles}
  `;

  render() {
    return html`
      <div class="container" id="about">
        <bruk-section-header title="About" subtitle="Background and experience" class="fade-in"></bruk-section-header>
        <div class="about-grid">
          <div class="about-text fade-in">
            ${about.paragraphs.map(p => html`
              <p class=${p.lead ? 'lead' : ''}>${p.text}</p>
            `)}
          </div>
          ${about.specs.length ? html`
            <div class="spec-panel fade-in stagger-2">
              ${about.specs.map(s => this._renderSpec(s))}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private _renderSpec(spec: SpecBlock) {
    return html`
      <div class="spec-block">
        <div class="spec-block-header">
          <span class="spec-label">${spec.label}</span>
        </div>
        <div class="spec-body">
          <div class="spec-value">${spec.lines.map((line, i) =>
            html`${line}${i < spec.lines.length - 1 ? html`<br>` : ''}`
          )}</div>
        </div>
      </div>
    `;
  }
}
