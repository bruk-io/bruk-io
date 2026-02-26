import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { NavItem } from '../content/types.js';
import { themeState } from './theme-state.js';
import '@bruk-io/bh-01';

@customElement('bruk-header')
export class BrukHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    .header-bg {
      background: rgba(240, 236, 228, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--bh-color-border);
      transition: background 0.5s, border-color 0.5s;
    }

    :host([dark]) .header-bg {
      background: rgba(20, 20, 19, 0.88);
    }

    nav {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .nav-logo {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: var(--bh-color-text);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: color 0.5s;
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 11px;
      font-weight: 400;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--bh-color-text-muted);
      text-decoration: none;
      transition: color 0.2s;
      position: relative;
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 1.5px;
      background: var(--bh-color-primary);
      transition: width 0.25s ease;
    }

    .nav-links a:hover { color: var(--bh-color-text); }
    .nav-links a:hover::after { width: 100%; }

    /* Theme toggle */
    .theme-toggle {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      user-select: none;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      color: inherit;
    }

    .theme-toggle:focus-visible {
      outline: 2px solid var(--bh-color-ring);
      outline-offset: 4px;
      border-radius: var(--bh-radius-sm);
    }

    .toggle-label {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 8px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--bh-color-text-tertiary);
      transition: color 0.5s;
    }

    .toggle-housing {
      width: 42px;
      height: 22px;
      background: var(--bh-color-surface-recessed);
      border-radius: 11px;
      position: relative;
      transition: background 0.3s ease;
      box-shadow: var(--bh-shadow-inset);
    }

    .toggle-knob {
      width: 18px;
      height: 18px;
      background: var(--bh-color-surface-raised);
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.06);
    }

    :host([dark]) .toggle-knob {
      transform: translateX(20px);
      background: var(--bh-color-primary);
      box-shadow: 0 1px 3px rgba(0,0,0,0.3), 0 0 6px rgba(255,107,53,0.2);
    }

    .toggle-knob::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 6px;
      width: 6px;
      height: 10px;
      background: repeating-linear-gradient(
        0deg, transparent, transparent 1.5px,
        rgba(0,0,0,0.07) 1.5px, rgba(0,0,0,0.07) 2.5px
      );
      border-radius: 3px;
    }

    :host([dark]) .toggle-knob::before {
      background: repeating-linear-gradient(
        0deg, transparent, transparent 1.5px,
        rgba(0,0,0,0.2) 1.5px, rgba(0,0,0,0.2) 2.5px
      );
    }

    /* Scroll progress */
    .scroll-progress {
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 2px;
      background: var(--bh-color-primary);
      z-index: 101;
      box-shadow: 0 0 8px rgba(255,107,53,0.3);
      transition: width 0.1s linear;
    }

    .nav-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }

    .nav-toggle span {
      display: block;
      width: 20px;
      height: 1.5px;
      background: var(--bh-color-text);
      margin: 5px 0;
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-toggle { display: block; }
      .nav-links.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 58px;
        left: 0;
        right: 0;
        background: var(--bh-color-bg);
        padding: 20px 28px;
        border-bottom: 1px solid var(--bh-color-border);
        gap: 18px;
      }
    }
  `;

  @property({ type: Array }) nav: NavItem[] = [];
  @property({ type: Number }) scrollProgress = 0;
  @property({ type: Boolean, reflect: true }) dark = false;
  @state() private _menuOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.dark = themeState.isDark;
  }

  private _toggleTheme() {
    themeState.toggle();
    this.dark = themeState.isDark;
  }

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen;
  }

  render() {
    return html`
      <div class="header-bg">
        <nav aria-label="Primary">
          <a href="#" class="nav-logo">
            <bh-led color="success" pulse size="sm" label="Status: online"></bh-led>
            Bruk Habtu
          </a>
          <div class="nav-right">
            ${this.nav.length ? html`
              <button class="nav-toggle" @click=${this._toggleMenu} aria-label="Menu" aria-expanded=${this._menuOpen} aria-controls="primary-nav">
                <span></span><span></span><span></span>
              </button>
              <ul class="nav-links ${this._menuOpen ? 'open' : ''}" id="primary-nav">
                ${this.nav.map(n => html`<li><a href=${n.href}>${n.label}</a></li>`)}
              </ul>
            ` : nothing}
            <button
              class="theme-toggle"
              @click=${this._toggleTheme}
              aria-label="Dark mode"
              aria-pressed=${this.dark}
            >
              <span class="toggle-label">Mode</span>
              <div class="toggle-housing">
                <div class="toggle-knob"></div>
              </div>
            </button>
          </div>
        </nav>
        <div class="scroll-progress" style="width: ${this.scrollProgress}%"></div>
      </div>
    `;
  }
}
