import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { contact } from '../content/index.js';

@customElement('bruk-contact')
export class BrukContact extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .contact-section {
      background: var(--bh-color-charcoal, #1A1A1A);
      color: #E8E4DE;
      padding: 48px 0;
      transition: background 0.5s;
      scroll-margin-top: 72px;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    h2 {
      font-family: var(--font-sans, 'Instrument Sans', sans-serif);
      font-size: 32px;
      font-weight: 600;
      letter-spacing: -0.5px;
      margin-bottom: 14px;
      color: #E8E4DE;
    }

    .contact-desc {
      font-size: 15px;
      line-height: 1.7;
      color: rgba(232,228,222,0.65);
      max-width: 380px;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .contact-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: var(--bh-radius-sm, 6px);
      text-decoration: none;
      color: #E8E4DE;
      transition: background 0.2s, border-color 0.2s;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
    }

    .contact-link:hover {
      background: rgba(255,255,255,0.07);
      border-color: var(--bh-color-primary);
    }

    .link-label {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .link-arrow {
      font-size: 16px;
      color: var(--bh-color-primary);
      transition: transform 0.2s;
    }

    .contact-link:hover .link-arrow { transform: translateX(4px); }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; gap: 36px; }
    }
  `;

  render() {
    return html`
      <div class="contact-section" id="contact">
        <div class="container">
          <div class="contact-grid">
            <div>
              <h2>${contact.headline}</h2>
              <p class="contact-desc">${contact.description}</p>
            </div>
            <div class="links">
              ${contact.links.map(l => html`
                <a href=${l.href} class="contact-link" target="_blank" rel="noopener noreferrer">
                  <span class="link-label">${l.label}</span>
                  <span class="link-arrow">&rarr;</span>
                </a>
              `)}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
