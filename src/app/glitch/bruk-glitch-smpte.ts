import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

type Phase = 'idle' | 'static' | 'tearing' | 'on' | 'exit-tear' | 'exit-static';
type Mode = 'clean' | 'dropout';

@customElement('bruk-glitch-smpte')
export class BrukGlitchSmpte extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      inset: 0;
      z-index: 9998;
      pointer-events: none;
      overflow: hidden;
    }

    /* ═══ COLOR BARS — always in position, revealed by snow clearing ═══ */
    .bars {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      opacity: 0;
      visibility: hidden;
    }

    .bars.visible {
      visibility: visible;
      opacity: 0.85;
    }

    /* CRT scanlines */
    .bars::before {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        180deg,
        transparent 0px,
        transparent 3px,
        rgba(0, 0, 0, 0.25) 3px,
        rgba(0, 0, 0, 0.25) 4px
      );
      pointer-events: none;
      z-index: 1;
    }

    /* CRT vignette */
    .bars::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        ellipse at center,
        transparent 50%,
        rgba(0, 0, 0, 0.25) 80%,
        rgba(0, 0, 0, 0.5) 100%
      );
      pointer-events: none;
      z-index: 2;
    }

    /* ═══ SNOW — layered on top, tears apart to reveal bars ═══ */
    .snow {
      position: fixed;
      inset: 0;
      opacity: 0;
      visibility: hidden;
      z-index: 3;
    }

    .snow.on {
      visibility: visible;
      opacity: var(--snow-opacity, 0.9);
      animation: snow-jitter 80ms steps(3) infinite;
    }

    .snow.tearing {
      visibility: visible;
      opacity: var(--snow-opacity, 0.9);
      animation: snow-jitter 80ms steps(3) infinite;
    }

    @keyframes snow-jitter {
      0% { transform: translate(0, 0); }
      33% { transform: translate(-1px, 1px); }
      66% { transform: translate(1px, -1px); }
    }

    .snow svg {
      position: absolute;
      inset: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
    }

    /* Scanlines on snow */
    .snow::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        180deg,
        transparent 0px,
        transparent 2px,
        rgba(0, 0, 0, 0.3) 2px,
        rgba(0, 0, 0, 0.3) 3px
      );
      pointer-events: none;
      z-index: 1;
    }

    /* ═══ BAR LAYOUT ═══ */
    .top { flex: 67; display: flex; }
    .top > div { flex: 1; }
    .mid { flex: 8; display: flex; }
    .mid > div { flex: 1; }
    .bot { flex: 25; display: flex; }
    .bot > div { flex: 1; }
    .bot .pluge { flex: 3; display: flex; }
    .bot .pluge > div { flex: 1; }

  `;

  @property({ type: Number }) freq = 25;
  @property({ type: Number }) duration = 1200;
  @property({ type: String }) mode: Mode = 'clean';

  @state() private _phase: Phase = 'idle';
  @state() private _tears: { top: number; height: number; offsetX: number }[] = [];
  @state() private _hTears: { top: number; height: number; shiftX: number }[] = [];

  private _snowOpacity = 0.7;
  private _snowGrain = 0.65;
  private _staticMs = 200;
  private _tearMs = 250;
  private _tearCount = 5;
  private _tearSteps = 3;
  private _bloom = 1.15;
  private _hTearFreq = 150;
  private _hTearIntensity = 4;
  private _hTearHeight = 2;

  private _scheduleTimer?: ReturnType<typeof setTimeout>;
  private _phaseTimer?: ReturnType<typeof setTimeout>;
  private _tearTimer?: ReturnType<typeof setTimeout>;
  private _hTearInterval?: ReturnType<typeof setInterval>;
  private _mounted = false;

  connectedCallback() {
    super.connectedCallback();
    this._mounted = true;
    this._schedule();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    this._clearTimers();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('freq')) {
      this._clearTimers();
      this._phase = 'idle';
      if (this._mounted) this._schedule();
    }
  }

  private _clearTimers() {
    if (this._scheduleTimer) clearTimeout(this._scheduleTimer);
    if (this._phaseTimer) clearTimeout(this._phaseTimer);
    if (this._tearTimer) clearTimeout(this._tearTimer);
    this._stopHTears();
  }

  private _startHTears() {
    this._stopHTears();
    this._hTearInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const count = 1 + Math.floor(Math.random() * 3);
        const tears: { top: number; height: number; shiftX: number }[] = [];
        for (let i = 0; i < count; i++) {
          tears.push({
            top: Math.random() * 100,
            height: this._hTearHeight * (0.5 + Math.random()),
            shiftX: (Math.random() - 0.5) * 2 * this._hTearIntensity,
          });
        }
        this._hTears = tears;
        setTimeout(() => { this._hTears = []; }, 80 + Math.random() * 60);
      }
    }, this._hTearFreq);
  }

  private _stopHTears() {
    if (this._hTearInterval) clearInterval(this._hTearInterval);
    this._hTears = [];
  }

  private _schedule() {
    const base = this.freq * 1000;
    const delay = base * 0.5 + Math.random() * base;
    this._scheduleTimer = setTimeout(() => {
      if (!this._mounted) return;
      this._runEvent(this.mode);
    }, delay);
  }

  private _generateTears(): { top: number; height: number; offsetX: number }[] {
    const count = this._tearCount;
    const tears: { top: number; height: number; offsetX: number }[] = [];
    for (let i = 0; i < count; i++) {
      tears.push({
        top: Math.random() * 95,
        height: 1 + Math.random() * 3,
        offsetX: (Math.random() - 0.5) * 8,
      });
    }
    return tears.sort((a, b) => a.top - b.top);
  }

  private _animateTears(onComplete: () => void) {
    const steps = this._tearSteps;
    const stepMs = this._tearMs / steps;
    let step = 0;

    const grow = () => {
      if (step >= steps || !this._mounted) {
        onComplete();
        return;
      }
      step++;
      this._tears = this._tears.map(t => ({
        ...t,
        height: t.height + (1 + Math.random() * 2),
        offsetX: t.offsetX + (Math.random() - 0.5) * 3,
      }));
      if (Math.random() > 0.4) {
        this._tears = [...this._tears, {
          top: Math.random() * 95,
          height: 1 + Math.random() * 2,
          offsetX: (Math.random() - 0.5) * 6,
        }];
      }
      this._tearTimer = setTimeout(grow, stepMs);
    };

    grow();
  }

  /**
   * Event: static → tears grow (signal fighting) → bars win → hold → reverse out
   */
  private _runEvent(mode: Mode) {
    this._phase = 'static';
    const staticHold = this._staticMs * (0.8 + Math.random() * 0.4);

    this._phaseTimer = setTimeout(() => {
      if (!this._mounted) return;

      this._tears = this._generateTears();
      this._phase = 'tearing';
      this._startHTears();

      this._animateTears(() => {
        if (!this._mounted) return;
        this._phase = 'on';
        this._tears = [];

        if (mode === 'dropout') {
          this._holdDropout();
        } else {
          this._holdClean();
        }
      });
    }, staticHold);
  }

  private _holdClean() {
    this._phaseTimer = setTimeout(() => {
      if (!this._mounted) return;
      this._exit();
    }, this.duration);
  }

  private _holdDropout() {
    const dropoutAt = this.duration * (0.3 + Math.random() * 0.3);
    const dropoutLen = 80 + Math.random() * 60;
    const remaining = this.duration - dropoutAt - dropoutLen;

    this._phaseTimer = setTimeout(() => {
      if (!this._mounted) return;
      this._phase = 'static';
      this._phaseTimer = setTimeout(() => {
        if (!this._mounted) return;
        this._phase = 'on';
        this._phaseTimer = setTimeout(() => {
          if (!this._mounted) return;
          this._exit();
        }, Math.max(remaining, 100));
      }, dropoutLen);
    }, dropoutAt);
  }

  /** Exit: snow fights back → snow wins → fade */
  private _exit() {
    this._tears = this._generateTears();
    this._phase = 'exit-tear';

    this._animateTears(() => {
      if (!this._mounted) return;
      this._stopHTears();
      this._phase = 'exit-static';
      const holdOut = this._staticMs * 0.5 * (0.8 + Math.random() * 0.4);
      this._phaseTimer = setTimeout(() => {
        this._phase = 'idle';
        this._tears = [];
        this._schedule();
      }, holdOut);
    });
  }

  render() {
    const barsVisible = this._phase === 'tearing' || this._phase === 'on' || this._phase === 'exit-tear';
    const snowOn = this._phase === 'static' || this._phase === 'tearing' || this._phase === 'exit-tear' || this._phase === 'exit-static';
    const tearsOn = this._phase === 'tearing' || this._phase === 'exit-tear';

    return html`
      <!-- Base bars — clipped to exclude h-tear regions -->
      <div class="bars ${barsVisible ? 'visible' : ''}"
        style="filter: brightness(${this._phase === 'tearing' ? this._bloom : 1}); ${this._hTears.length ? `clip-path: ${this._buildBarsClipPath()}` : ''}">
        ${this._barsTemplate}
      </div>

      <!-- Torn slices: same bars, clipped to just the tear strip, shifted horizontally -->
      ${this._hTears.map(t => html`
        <div class="bars ${barsVisible ? 'visible' : ''}"
          style="filter: brightness(${this._phase === 'tearing' ? this._bloom : 1}); clip-path: inset(${t.top}% 0 ${100 - t.top - t.height}% 0); transform: translateX(${t.shiftX}px);">
          ${this._barsTemplate}
        </div>
      `)}

      <!-- Snow: on top of bars, tears create holes that reveal bars underneath -->
      <div class="snow ${snowOn ? (tearsOn ? 'tearing' : 'on') : ''}"
        style="--snow-opacity: ${this._snowOpacity}; ${tearsOn ? `clip-path: ${this._buildSnowClipPath()}` : ''}">
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="smpte-noise">
            <feTurbulence type="fractalNoise" baseFrequency=${this._snowGrain} numOctaves="4"
              seed=${Math.floor(Math.random() * 999)} />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" fill="#0a0a0a" />
          <rect width="100%" height="100%" filter="url(#smpte-noise)" />
        </svg>
      </div>
    `;
  }

  /**
   * Build a CSS clip-path polygon that cuts organic, jagged tear gaps
   * out of the snow to reveal bars underneath.
   */
  private _buildSnowClipPath(): string {
    if (this._tears.length === 0) return 'none';

    const sorted = [...this._tears].sort((a, b) => a.top - b.top);
    const points: string[] = [];

    points.push('0% 0%');

    for (const tear of sorted) {
      const top = Math.max(0, tear.top);
      const bot = Math.min(100, tear.top + tear.height);
      const baseInset = Math.abs(tear.offsetX);

      points.push(`0% ${top}%`);

      const notches = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i <= notches; i++) {
        const pct = i / notches;
        const y = top + (bot - top) * pct;
        const jag = baseInset + (i % 2 === 0 ? Math.random() * 4 : -Math.random() * 2);
        points.push(`${Math.max(0, jag)}% ${y}%`);
      }

      points.push(`0% ${bot}%`);
    }

    points.push('0% 100%');
    points.push('100% 100%');

    for (const tear of [...sorted].reverse()) {
      const top = Math.max(0, tear.top);
      const bot = Math.min(100, tear.top + tear.height);
      const baseInset = Math.abs(tear.offsetX);

      points.push(`100% ${bot}%`);

      const notches = 4 + Math.floor(Math.random() * 3);
      for (let i = notches; i >= 0; i--) {
        const pct = i / notches;
        const y = top + (bot - top) * pct;
        const jag = baseInset + (i % 2 === 0 ? Math.random() * 4 : -Math.random() * 2);
        points.push(`${Math.min(100, 100 - jag)}% ${y}%`);
      }

      points.push(`100% ${top}%`);
    }

    points.push('100% 0%');

    return `polygon(${points.join(', ')})`;
  }

  /**
   * Clip-path for base bars that excludes h-tear regions.
   */
  private _buildBarsClipPath(): string {
    if (this._hTears.length === 0) return 'none';

    const sorted = [...this._hTears].sort((a, b) => a.top - b.top);
    const left: string[] = [];
    const right: string[] = [];

    let cursor = 0;
    for (const t of sorted) {
      const top = Math.max(0, t.top);
      const bot = Math.min(100, t.top + t.height);
      if (top > cursor) {
        left.push(`0% ${cursor}%`, `0% ${top}%`);
        right.push(`100% ${top}%`, `100% ${cursor}%`);
      }
      cursor = bot;
    }
    if (cursor < 100) {
      left.push(`0% ${cursor}%`, `0% 100%`);
      right.push(`100% 100%`, `100% ${cursor}%`);
    }

    const points = [...left, ...right.reverse()];
    if (points.length < 3) return 'none';
    return `polygon(${points.join(', ')})`;
  }

  get _barsTemplate() {
    return html`
      <div class="top">
        <div style="background:#C0C0C0"></div>
        <div style="background:#C0C000"></div>
        <div style="background:#00C0C0"></div>
        <div style="background:#00C000"></div>
        <div style="background:#C000C0"></div>
        <div style="background:#C00000"></div>
        <div style="background:#0000C0"></div>
      </div>
      <div class="mid">
        <div style="background:#0000C0"></div>
        <div style="background:#131313"></div>
        <div style="background:#C000C0"></div>
        <div style="background:#131313"></div>
        <div style="background:#00C0C0"></div>
        <div style="background:#131313"></div>
        <div style="background:#C0C0C0"></div>
      </div>
      <div class="bot">
        <div style="background:#00214C"></div>
        <div style="background:#FFFFFF"></div>
        <div style="background:#32006A"></div>
        <div class="pluge">
          <div style="background:#090909"></div>
          <div style="background:#131313"></div>
          <div style="background:#1D1D1D"></div>
        </div>
        <div style="background:#131313"></div>
        <div style="background:#131313"></div>
        <div style="background:#131313"></div>
      </div>
    `;
  }
}
