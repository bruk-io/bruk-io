import { css as h, html as p } from "lit";
import { property as i, customElement as v } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var u = Object.defineProperty, d = Object.getOwnPropertyDescriptor, a = (n, o, l, e) => {
  for (var t = e > 1 ? void 0 : e ? d(o, l) : o, s = n.length - 1, b; s >= 0; s--)
    (b = n[s]) && (t = (e ? b(o, l, t) : b(t)) || t);
  return e && t && u(o, l, t), t;
};
let r = class extends c {
  constructor() {
    super(...arguments), this.tabId = "", this.label = "", this.active = !1;
  }
  render() {
    return p`
      <button
        part="button"
        role="tab"
        aria-selected=${this.active ? "true" : "false"}
        @click=${this._handleClick}
      >
        <slot>${this.label}</slot>
      </button>
    `;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("bh-tab-click", {
        bubbles: !0,
        composed: !0,
        detail: { tabId: this.tabId }
      })
    );
  }
};
r.styles = [
  ...[c.styles].flat(),
  h`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        padding: 0 var(--bh-spacing-4);
        height: 100%;
        background: transparent;
        border: none;
        border-bottom: var(--bh-border-2) solid transparent;
        color: var(--bh-tab-color, var(--bh-color-text-muted));
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        cursor: pointer;
        white-space: nowrap;
        transition: color var(--bh-transition-fast);
      }

      button:hover {
        color: var(--bh-tab-active-color, var(--bh-color-text));
      }

      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([active]) button {
        color: var(--bh-tab-active-color, var(--bh-color-text));
        border-bottom-color: var(--bh-tab-active-border, var(--bh-color-primary));
      }
    `
];
a([
  i({ attribute: "tab-id" })
], r.prototype, "tabId", 2);
a([
  i()
], r.prototype, "label", 2);
a([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "active", 2);
r = a([
  v("bh-tab")
], r);
export {
  r as BhTab
};
//# sourceMappingURL=bh-tab.js.map
