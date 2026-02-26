import { css as p, nothing as i, html as b } from "lit";
import { property as n, customElement as f } from "lit/decorators.js";
import { BaseElement as v } from "../../primitives/base-element.js";
var d = Object.defineProperty, u = Object.getOwnPropertyDescriptor, r = (a, o, l, s) => {
  for (var t = s > 1 ? void 0 : s ? u(o, l) : o, h = a.length - 1, c; h >= 0; h--)
    (c = a[h]) && (t = (s ? c(o, l, t) : c(t)) || t);
  return s && t && d(o, l, t), t;
};
let e = class extends v {
  constructor() {
    super(...arguments), this.active = !1, this.disabled = !1, this.href = "", this.target = "";
  }
  render() {
    return this.href ? b`
        <a
          part="item"
          href=${this.href}
          target=${this.target || i}
          aria-current=${this.active ? "page" : i}
          aria-disabled=${this.disabled ? "true" : i}
          @click=${this._handleClick}
        >
          <slot name="prefix"></slot>
          <slot></slot>
          <span class="suffix"><slot name="suffix"></slot></span>
        </a>
      ` : b`
      <button
        part="item"
        ?disabled=${this.disabled}
        aria-current=${this.active ? "page" : i}
        @click=${this._handleClick}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <span class="suffix"><slot name="suffix"></slot></span>
      </button>
    `;
  }
  _handleClick(a) {
    if (this.disabled) {
      a.preventDefault(), a.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("bh-click", {
        bubbles: !0,
        composed: !0,
        detail: { originalEvent: a }
      })
    );
  }
};
e.styles = [
  ...[v.styles].flat(),
  p`
      :host {
        display: block;
      }

      a,
      button {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
        width: 100%;
        padding: var(--bh-spacing-2) var(--bh-spacing-3);
        border: none;
        border-radius: var(--bh-radius-md);
        background: var(--bh-nav-item-bg, transparent);
        color: var(--bh-nav-item-color, var(--bh-color-text));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-base);
        font-weight: var(--bh-font-normal);
        line-height: var(--bh-leading-normal);
        text-decoration: none;
        cursor: pointer;
        transition: background var(--bh-transition-fast),
                    color var(--bh-transition-fast);
      }

      a:hover,
      button:hover {
        background: var(--bh-nav-item-hover-bg, var(--bh-color-secondary));
      }

      a:focus-visible,
      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      /* Active */
      :host([active]) a,
      :host([active]) button {
        background: var(--bh-nav-item-active-bg, var(--bh-color-secondary));
        color: var(--bh-nav-item-active-color, var(--bh-color-primary));
        font-weight: var(--bh-font-medium);
      }

      /* Disabled */
      :host([disabled]) a,
      :host([disabled]) button {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Suffix pushed to end */
      .suffix {
        margin-left: auto;
      }
    `
];
r([
  n({ type: Boolean, reflect: !0 })
], e.prototype, "active", 2);
r([
  n({ type: Boolean, reflect: !0 })
], e.prototype, "disabled", 2);
r([
  n()
], e.prototype, "href", 2);
r([
  n()
], e.prototype, "target", 2);
e = r([
  f("bh-nav-item")
], e);
export {
  e as BhNavItem
};
//# sourceMappingURL=bh-nav-item.js.map
