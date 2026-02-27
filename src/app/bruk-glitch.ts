import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './glitch/bruk-glitch-tracking.js';
import './glitch/bruk-glitch-flicker.js';
import './glitch/bruk-glitch-aberration.js';
import './glitch/bruk-glitch-smpte.js';

export interface GlitchConfigEvent {
  tracking?: boolean;
  flicker?: boolean;
  aberration?: boolean;
  smpte?: boolean;
  trackingFreq?: number;
  flickerFreq?: number;
  aberrationFreq?: number;
  aberrationSpread?: number;
  smpteFreq?: number;
  smpteDuration?: number;
  smpteMode?: string;
}

@customElement('bruk-glitch')
export class BrukGlitch extends LitElement {
  @property({ type: Boolean, reflect: true }) tracking = false;
  @property({ type: Number, attribute: 'tracking-freq' }) trackingFreq = 8;

  @property({ type: Boolean, reflect: true }) flicker = false;
  @property({ type: Number, attribute: 'flicker-freq' }) flickerFreq = 6;

  @property({ type: Boolean, reflect: true }) aberration = false;
  @property({ type: Number, attribute: 'aberration-freq' }) aberrationFreq = 10;
  @property({ type: Number, attribute: 'aberration-spread' }) aberrationSpread = 2;

  @property({ type: Boolean, reflect: true }) smpte = false;
  @property({ type: Number, attribute: 'smpte-freq' }) smpteFreq = 25;
  @property({ type: Number, attribute: 'smpte-duration' }) smpteDuration = 1200;
  @property({ type: String, attribute: 'smpte-mode' }) smpteMode = 'clean';

  private _onGlitchConfig = (e: Event) => {
    const cfg = (e as CustomEvent<GlitchConfigEvent>).detail;
    if (cfg.tracking !== undefined) this.tracking = cfg.tracking;
    if (cfg.flicker !== undefined) this.flicker = cfg.flicker;
    if (cfg.aberration !== undefined) this.aberration = cfg.aberration;
    if (cfg.smpte !== undefined) this.smpte = cfg.smpte;
    if (cfg.trackingFreq !== undefined) this.trackingFreq = cfg.trackingFreq;
    if (cfg.flickerFreq !== undefined) this.flickerFreq = cfg.flickerFreq;
    if (cfg.aberrationFreq !== undefined) this.aberrationFreq = cfg.aberrationFreq;
    if (cfg.aberrationSpread !== undefined) this.aberrationSpread = cfg.aberrationSpread;
    if (cfg.smpteFreq !== undefined) this.smpteFreq = cfg.smpteFreq;
    if (cfg.smpteDuration !== undefined) this.smpteDuration = cfg.smpteDuration;
    if (cfg.smpteMode !== undefined) this.smpteMode = cfg.smpteMode;
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('glitch-config', this._onGlitchConfig);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('glitch-config', this._onGlitchConfig);
  }

  render() {
    return html`
      ${this.tracking ? html`
        <bruk-glitch-tracking .freq=${this.trackingFreq}></bruk-glitch-tracking>
      ` : nothing}
      ${this.flicker ? html`
        <bruk-glitch-flicker .freq=${this.flickerFreq}></bruk-glitch-flicker>
      ` : nothing}
      ${this.aberration ? html`
        <bruk-glitch-aberration .freq=${this.aberrationFreq} .spread=${this.aberrationSpread}></bruk-glitch-aberration>
      ` : nothing}
      ${this.smpte ? html`
        <bruk-glitch-smpte .freq=${this.smpteFreq} .duration=${this.smpteDuration} .mode=${this.smpteMode}></bruk-glitch-smpte>
      ` : nothing}
    `;
  }
}
