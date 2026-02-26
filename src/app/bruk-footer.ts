import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@bruk-io/bh-01';

@customElement('bruk-footer')
export class BrukFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
    }

    footer {
      padding: 28px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--bh-color-border);
      transition: border-color 0.5s;
    }

    .footer-text {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 10px;
      color: var(--bh-color-text-tertiary);
      letter-spacing: 0.8px;
      text-transform: uppercase;
    }

    .footer-model {
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      footer {
        flex-direction: column;
        gap: 10px;
        text-align: center;
      }
    }
  `;

  render() {
    return html`
      <div class="container">
        <footer>
          <span class="footer-text">&copy; ${new Date().getFullYear()} Bruk Habtu</span>
          <span class="footer-model">
            <bh-segment-display value="BH-01" color="default" size="sm"></bh-segment-display>
          </span>
          <span class="footer-text">Built with intention.</span>
        </footer>
      </div>
    `;
  }
}
