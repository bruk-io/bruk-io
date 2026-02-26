import { css as f, nothing as l, html as p } from "lit";
import { property as a, customElement as u } from "lit/decorators.js";
import { BaseElement as v } from "../../primitives/base-element.js";
var d = Object.defineProperty, b = Object.getOwnPropertyDescriptor, n = (r, o, s, i) => {
  for (var e = i > 1 ? void 0 : i ? b(o, s) : o, h = r.length - 1, c; h >= 0; h--)
    (c = r[h]) && (e = (i ? c(o, s, e) : c(e)) || e);
  return i && e && d(o, s, e), e;
};
let t = class extends v {
  constructor() {
    super(...arguments), this.href = "", this.target = "", this.variant = "default", this.external = !1;
  }
  render() {
    const r = this.external ? "_blank" : this.target, o = this.external ? "noopener noreferrer" : void 0;
    return p`
      <a
        part="link"
        href=${this.href || l}
        target=${r || l}
        rel=${o || l}
        @click=${this._handleClick}
      >
        <slot></slot>${this.external ? p`<span class="external-icon"><svg viewBox="0 0 16 16"><path d="M6 3h7v7"/><path d="M13 3L6.5 9.5"/></svg></span>` : l}
      </a>
    `;
  }
  _handleClick(r) {
    this.dispatchEvent(
      new CustomEvent("bh-click", {
        bubbles: !0,
        composed: !0,
        detail: { originalEvent: r }
      })
    );
  }
};
t.styles = [
  ...[v.styles].flat(),
  f`
      :host {
        display: inline;
      }

      a {
        color: var(--bh-link-color, var(--bh-color-link));
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        text-decoration-color: transparent;
        text-underline-offset: 0.15em;
        transition: all var(--bh-transition-fast);
        cursor: pointer;
      }

      a:hover {
        color: var(--bh-color-link-hover);
        text-decoration-color: currentColor;
      }

      a:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: 2px;
        border-radius: var(--bh-radius-sm);
      }

      /* Variants */
      :host([variant='muted']) a {
        --bh-link-color: var(--bh-color-link-subtle);
      }

      :host([variant='muted']) a:hover {
        color: var(--bh-color-link-subtle-hover);
      }

      :host([variant='accent']) a {
        --bh-link-color: var(--bh-color-primary);
        font-weight: var(--bh-font-medium);
      }

      /* External icon */
      .external-icon {
        display: inline-block;
        width: 0.75em;
        height: 0.75em;
        margin-left: 0.2em;
        vertical-align: baseline;
      }

      .external-icon svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `
];
n([
  a()
], t.prototype, "href", 2);
n([
  a()
], t.prototype, "target", 2);
n([
  a({ reflect: !0 })
], t.prototype, "variant", 2);
n([
  a({ type: Boolean })
], t.prototype, "external", 2);
t = n([
  u("bh-link")
], t);
export {
  t as BhLink
};
//# sourceMappingURL=bh-link.js.map
