import { LitElement, html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { site, hero, projects, posts, about, contact } from '../content/index.js';
import { themeState } from './theme-state.js';
import { initFadeObserver } from './fade-observer.js';
import './bruk-header.js';
import './bruk-hero.js';
import './bruk-projects.js';
import './bruk-writing.js';
import './bruk-about.js';
import './bruk-contact.js';
import './bruk-footer.js';
import './bruk-glitch.js';

@customElement('bruk-site')
export class BrukSite extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    themeState.init();
    window.addEventListener('scroll', this._onScroll, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._onScroll);
  }

  firstUpdated() {
    // Kick off fade-in observation after all children have rendered
    requestAnimationFrame(() => initFadeObserver(this.renderRoot as ShadowRoot));
  }

  private _onScroll = () => {
    const header = this.renderRoot.querySelector('bruk-header');
    if (header) {
      const pct = (document.documentElement.scrollTop /
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
      (header as any).scrollProgress = pct;
    }
  };

  render() {
    return html`
      <bruk-header .nav=${site.nav}></bruk-header>
      ${hero.headline.length ? html`<bruk-hero></bruk-hero>` : nothing}
      ${about.paragraphs.length ? html`<bruk-about></bruk-about>` : nothing}
      ${projects.length ? html`<bruk-projects></bruk-projects>` : nothing}
      ${posts.length ? html`<bruk-writing></bruk-writing>` : nothing}
      ${contact.links.length ? html`<bruk-contact></bruk-contact>` : nothing}
      <bruk-footer></bruk-footer>
      ${new URLSearchParams(window.location.search).has('under-construction')
        ? html`<bruk-glitch smpte></bruk-glitch>`
        : nothing}
    `;
  }
}
