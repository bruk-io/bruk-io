import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { marked } from 'marked';
import { findArticle, longDate } from '../content/index.js';
import { fadeStyles } from './shared-styles.js';

@customElement('bruk-article')
export class BrukArticle extends LitElement {
  @property({ type: String }) slug = '';

  firstUpdated() {
    // Reveal on mount rather than on scroll. The shared fade observer uses
    // `threshold: 0.1`, which an article can never satisfy: at 4600px tall in a
    // 470px viewport the maximum possible intersection ratio is ~0.10, and the
    // -30px rootMargin puts it under the line. The result is a fully rendered
    // page stuck at opacity 0. A routed-in page should not wait to be scrolled
    // into view anyway - it is already the thing you asked for.
    requestAnimationFrame(() => {
      this.renderRoot.querySelector('.fade-in')?.classList.add('visible');
    });
  }

  static styles = [
    fadeStyles,
    css`
      :host {
        display: block;
        padding: 48px 0 96px;
      }

      .container {
        max-width: 720px;
        margin: 0 auto;
        padding: 0 28px;
      }

      .back {
        font-family: var(--font-mono, 'DM Mono', monospace);
        font-size: 9px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
        text-decoration: none;
        display: inline-block;
        margin-bottom: 32px;
      }

      .back:hover {
        color: var(--bh-color-primary);
      }

      .meta {
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: var(--font-mono, 'DM Mono', monospace);
        font-size: 9px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--bh-color-text-tertiary);
        margin-bottom: 12px;
      }

      .tag {
        color: var(--bh-color-primary);
        border: 1px solid var(--bh-color-border);
        border-radius: 4px;
        padding: 3px 8px;
      }

      h1.title {
        font-size: clamp(28px, 5vw, 40px);
        line-height: 1.15;
        letter-spacing: -0.02em;
        color: var(--bh-color-text);
        margin: 0 0 40px;
      }

      /* --- rendered markdown --- */

      .body {
        color: var(--bh-color-text-secondary);
        font-size: 16px;
        line-height: 1.7;
      }

      .body > :first-child {
        margin-top: 0;
      }

      .body h2 {
        font-size: 22px;
        line-height: 1.3;
        letter-spacing: -0.01em;
        color: var(--bh-color-text);
        margin: 48px 0 16px;
      }

      .body h3 {
        font-size: 17px;
        color: var(--bh-color-text);
        margin: 32px 0 12px;
      }

      .body p {
        margin: 0 0 20px;
      }

      .body a {
        color: var(--bh-color-link);
        text-decoration: none;
        border-bottom: 1px solid var(--bh-color-border-bright);
      }

      .body a:hover {
        color: var(--bh-color-link-hover);
        border-bottom-color: currentColor;
      }

      .body strong {
        color: var(--bh-color-text);
        font-weight: 600;
      }

      .body ul,
      .body ol {
        margin: 0 0 20px;
        padding-left: 22px;
      }

      .body li {
        margin-bottom: 8px;
      }

      .body blockquote {
        margin: 0 0 20px;
        padding-left: 16px;
        border-left: 2px solid var(--bh-color-border-bright);
        color: var(--bh-color-text-tertiary);
      }

      .body code {
        font-family: var(--font-mono, 'DM Mono', monospace);
        font-size: 0.88em;
        color: var(--bh-color-text);
        background: var(--bh-color-surface-recessed);
        border: 1px solid var(--bh-color-border);
        border-radius: 3px;
        padding: 1px 5px;
      }

      /* Wide code must scroll inside its own box, never the page. */
      .body pre {
        margin: 0 0 24px;
        padding: 16px;
        background: var(--bh-color-surface-recessed);
        border: 1px solid var(--bh-color-border);
        border-radius: 6px;
        box-shadow: var(--bh-shadow-inset);
        overflow-x: auto;
      }

      .body pre code {
        background: none;
        border: none;
        padding: 0;
        font-size: 12.5px;
        line-height: 1.6;
        color: var(--bh-color-text-secondary);
      }

      .body hr {
        border: none;
        border-top: 1px solid var(--bh-color-border);
        margin: 40px 0;
      }

      .body table {
        width: 100%;
        border-collapse: collapse;
        margin: 0 0 24px;
        font-size: 14px;
      }

      .body th,
      .body td {
        text-align: left;
        padding: 8px 12px;
        border: 1px solid var(--bh-color-border);
      }

      .body th {
        color: var(--bh-color-text);
        background: var(--bh-color-surface-recessed);
        font-family: var(--font-mono, 'DM Mono', monospace);
        font-size: 11px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      .missing {
        color: var(--bh-color-text-tertiary);
        font-family: var(--font-mono, 'DM Mono', monospace);
        font-size: 13px;
      }
    `,
  ];

  render() {
    const article = findArticle(this.slug);

    if (!article) {
      return html`
        <div class="container fade-in">
          <a class="back" href="/">&larr; Back</a>
          <h1 class="title">Not found</h1>
          <p class="missing">No article at /writing/${this.slug}</p>
        </div>
      `;
    }

    return html`
      <article class="container fade-in">
        <a class="back" href="/">&larr; Writing</a>
        <div class="meta">
          <span class="tag">${article.tagLabel}</span>
          ${article.date ? html`<span>${longDate(article.date)}</span>` : nothing}
        </div>
        <h1 class="title">${article.title}</h1>
        <div class="body">${unsafeHTML(marked.parse(article.body) as string)}</div>
      </article>
    `;
  }
}
