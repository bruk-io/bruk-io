import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { site, hero, posts, about, contact, findArticle } from '../content/index.js';
import { themeState } from './theme-state.js';
import { initFadeObserver } from './fade-observer.js';
import { currentRoute, initRouter, type Route } from './router.js';
import './bruk-header.js';
import './bruk-hero.js';
import './bruk-writing.js';
import './bruk-article.js';
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

  @state() private _route: Route = currentRoute();

  private _teardownRouter?: () => void;

  connectedCallback() {
    super.connectedCallback();
    themeState.init();
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._teardownRouter = initRouter(() => {
      this._route = currentRoute();
    });
    this._syncTitle();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this._onScroll);
    this._teardownRouter?.();
  }

  updated() {
    this._syncTitle();
    // Newly routed-in content needs its own fade observation.
    requestAnimationFrame(() => initFadeObserver(this.renderRoot as ShadowRoot));
  }

  /** Keep the document title in step with the route. */
  private _syncTitle() {
    const article =
      this._route.name === 'article' ? findArticle(this._route.slug) : undefined;
    document.title = article ? `${article.title} — ${site.title}` : site.title;
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

  private _renderRoute() {
    if (this._route.name === 'article') {
      return html`<bruk-article .slug=${this._route.slug}></bruk-article>`;
    }
    if (this._route.name === 'not-found') {
      return html`<bruk-article slug=""></bruk-article>`;
    }
    return html`
      ${hero.headline.length ? html`<bruk-hero></bruk-hero>` : nothing}
      ${about.paragraphs.length ? html`<bruk-about></bruk-about>` : nothing}
      ${posts.length ? html`<bruk-writing></bruk-writing>` : nothing}
      ${contact.links.length ? html`<bruk-contact></bruk-contact>` : nothing}
    `;
  }

  render() {
    return html`
      <bruk-header .nav=${site.nav}></bruk-header>
      ${this._renderRoute()}
      <bruk-footer></bruk-footer>
      ${new URLSearchParams(window.location.search).has('under-construction')
        ? html`<bruk-glitch smpte></bruk-glitch>`
        : nothing}
    `;
  }
}
