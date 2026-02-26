import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { projects } from '../content/index.js';
import type { Project } from '../content/types.js';
import './bruk-section-header.js';
import '@bruk-io/bh-01';

@customElement('bruk-projects')
export class BrukProjects extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 48px 0;
    }

    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 28px;
      scroll-margin-top: 72px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .project-card {
      background: var(--bh-color-surface);
      border: 1px solid var(--bh-color-border);
      border-radius: var(--bh-radius-lg);
      overflow: hidden;
      transition: border-color 0.25s, transform 0.25s, background 0.5s, box-shadow 0.5s;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
      box-shadow: var(--bh-shadow-raised);
    }

    .project-card:hover {
      border-color: var(--bh-color-primary);
      transform: translateY(-2px);
      box-shadow: var(--bh-shadow-raised), 0 4px 16px rgba(255,107,53,0.08);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: var(--bh-color-surface-recessed);
      border-bottom: 1px solid var(--bh-color-border);
      box-shadow: var(--bh-shadow-emboss);
    }

    .project-tag {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--bh-color-primary);
    }

    .project-year {
      opacity: 0.6;
    }

    .card-body {
      padding: 24px 20px;
    }

    .card-body h3 {
      font-family: var(--font-sans, 'Instrument Sans', sans-serif);
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      letter-spacing: -0.3px;
    }

    .card-body p {
      font-size: 13px;
      line-height: 1.65;
      color: var(--bh-color-text-muted);
      margin-bottom: 18px;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    .stack span {
      font-family: var(--font-mono, 'DM Mono', monospace);
      font-size: 9px;
      letter-spacing: 0.5px;
      color: var(--bh-color-text-tertiary);
      background: var(--bh-color-surface-recessed);
      padding: 4px 9px;
      border-radius: 3px;
      box-shadow: var(--bh-shadow-inset);
      transition: background 0.5s, color 0.5s;
    }

    .featured {
      grid-column: 1 / -1;
    }

    @media (max-width: 768px) {
      .projects-grid { grid-template-columns: 1fr; }
    }
  `;

  render() {
    const count = String(projects.length).padStart(2, '0');
    return html`
      <div class="container" id="projects">
        <bruk-section-header title="Projects" count=${count} subtitle="Selected work"></bruk-section-header>
        <div class="projects-grid">
          ${projects.map(p => this._renderCard(p))}
        </div>
      </div>
    `;
  }

  private _renderCard(p: Project) {
    return html`
      <a href=${p.href} class="project-card ${p.featured ? 'featured' : ''}">
        <div class="card-header">
          <span class="project-tag">${p.tag}</span>
          <span class="project-year"><bh-segment-display value=${p.year} color="default" size="sm"></bh-segment-display></span>
        </div>
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="stack">${p.stack.map(s => html`<span>${s}</span>`)}</div>
        </div>
      </a>
    `;
  }
}
