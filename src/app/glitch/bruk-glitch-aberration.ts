import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bruk-glitch-aberration')
export class BrukGlitchAberration extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      overflow: hidden;
    }

    .aberration {
      position: absolute;
      inset: 0;
      opacity: 0;
      animation: aberration var(--freq, 10s) ease-in-out infinite;
    }

    .aberration::before,
    .aberration::after {
      content: '';
      position: absolute;
      inset: 0;
      mix-blend-mode: screen;
    }

    .aberration::before {
      background: linear-gradient(
        180deg,
        transparent 30%,
        rgba(0, 255, 255, 0.012) 30.5%,
        rgba(0, 255, 255, 0.012) 31%,
        transparent 31.5%
      );
      transform: translateX(calc(var(--spread, 2) * -1px));
    }

    .aberration::after {
      background: linear-gradient(
        180deg,
        transparent 30%,
        rgba(255, 0, 100, 0.012) 30.5%,
        rgba(255, 0, 100, 0.012) 31%,
        transparent 31.5%
      );
      transform: translateX(calc(var(--spread, 2) * 1px));
    }

    @keyframes aberration {
      0%, 88%, 94%, 100% { opacity: 0; }
      90% { opacity: 1; }
      92% { opacity: 0.5; }
    }
  `;

  /** Animation cycle duration in seconds */
  @property({ type: Number }) freq = 10;

  /** RGB split distance in pixels */
  @property({ type: Number }) spread = 2;

  updated(changed: Map<string, unknown>) {
    if (changed.has('freq')) {
      this.style.setProperty('--freq', this.freq + 's');
    }
    if (changed.has('spread')) {
      this.style.setProperty('--spread', String(this.spread));
    }
  }

  firstUpdated() {
    this.style.setProperty('--freq', this.freq + 's');
    this.style.setProperty('--spread', String(this.spread));
  }

  render() {
    return html`<div class="aberration"></div>`;
  }
}
