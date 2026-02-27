import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bruk-glitch-flicker')
export class BrukGlitchFlicker extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      overflow: hidden;
    }

    .flicker {
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.01);
      opacity: 0;
      animation: flicker var(--freq, 6s) step-end infinite;
    }

    @keyframes flicker {
      0%, 100% { opacity: 0; }
      91% { opacity: 1; }
      91.5% { opacity: 0; }
      92% { opacity: 1; }
      92.3% { opacity: 0; }
    }
  `;

  /** Animation cycle duration in seconds */
  @property({ type: Number }) freq = 6;

  updated(changed: Map<string, unknown>) {
    if (changed.has('freq')) {
      this.style.setProperty('--freq', this.freq + 's');
    }
  }

  firstUpdated() {
    this.style.setProperty('--freq', this.freq + 's');
  }

  render() {
    return html`<div class="flicker"></div>`;
  }
}
