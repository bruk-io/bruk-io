import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bruk-glitch-tracking')
export class BrukGlitchTracking extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      overflow: hidden;
    }

    .line {
      position: absolute;
      left: -5%;
      width: 110%;
      height: 4px;
      background: rgba(255, 255, 255, 0.06);
      box-shadow:
        0 0 8px rgba(255, 107, 53, 0.15),
        0 -1px 0 rgba(0, 255, 255, 0.08),
        0 1px 0 rgba(255, 0, 100, 0.08);
      opacity: 0;
      animation: tracking var(--freq, 8s) ease-in-out infinite;
    }

    .line::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        rgba(255, 255, 255, 0.03) 2px,
        transparent 4px
      );
    }

    @keyframes tracking {
      0%, 82% { opacity: 0; transform: translateY(20vh); }
      84% { opacity: 1; transform: translateY(20vh) translateX(-2px); }
      86% { opacity: 1; transform: translateY(35vh) translateX(3px); }
      87% { opacity: 0.6; transform: translateY(45vh) translateX(-1px); }
      88% { opacity: 1; transform: translateY(60vh) translateX(4px); }
      90% { opacity: 0.4; transform: translateY(80vh) translateX(-2px); }
      92%, 100% { opacity: 0; transform: translateY(100vh); }
    }

    .line-2 {
      animation-delay: calc(var(--freq, 8s) / 2);
      animation-duration: calc(var(--freq, 8s) * 1.5);
      height: 2px;
    }
  `;

  /** Animation cycle duration in seconds */
  @property({ type: Number }) freq = 8;

  updated(changed: Map<string, unknown>) {
    if (changed.has('freq')) {
      this.style.setProperty('--freq', this.freq + 's');
    }
  }

  firstUpdated() {
    this.style.setProperty('--freq', this.freq + 's');
  }

  render() {
    return html`
      <div class="line"></div>
      <div class="line line-2"></div>
    `;
  }
}
