import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@bruk-io/bh-01';

@customElement('bruk-section-header')
export class BrukSectionHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 12px;
    }

    h2 {
      font-family: var(--font-sans, 'Instrument Sans', sans-serif);
      font-size: 28px;
      font-weight: 600;
      letter-spacing: -0.3px;
    }

    .section-counter {
      opacity: 0.7;
    }

    .subtitle {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
      margin-bottom: 28px;
    }

    .section-rule {
      height: 2px;
      background: var(--bh-color-border);
      border: none;
      box-shadow: var(--bh-shadow-emboss);
      margin-bottom: 36px;
    }

    @media (max-width: 768px) {
      .section-counter { display: none; }
    }
  `;

  @property() title = '';
  @property() count = '';
  @property() subtitle = '';

  render() {
    return html`
      <div class="section-header">
        <h2>${this.title}</h2>
        ${this.count ? html`
          <div class="section-counter">
            <bh-segment-display value=${this.count} size="lg" ghost></bh-segment-display>
          </div>
        ` : nothing}
      </div>
      ${this.subtitle ? html`<div class="subtitle">${this.subtitle}</div>` : nothing}
      <hr class="section-rule" />
    `;
  }
}
