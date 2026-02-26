import { css as p, nothing as b, html as v } from "lit";
import { property as n, customElement as u } from "lit/decorators.js";
import { BaseElement as h } from "../../primitives/base-element.js";
var d = Object.defineProperty, m = Object.getOwnPropertyDescriptor, i = (c, r, a, o) => {
  for (var t = o > 1 ? void 0 : o ? m(r, a) : r, l = c.length - 1, s; l >= 0; l--)
    (s = c[l]) && (t = (o ? s(r, a, t) : s(t)) || t);
  return o && t && d(r, a, t), t;
};
let e = class extends h {
  constructor() {
    super(...arguments), this.active = !1, this.label = "", this.itemId = "";
  }
  render() {
    return v`
      <button
        part="button"
        title=${this.label || b}
        aria-label=${this.label || b}
        aria-pressed=${this.active ? "true" : "false"}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
  _handleClick() {
    this.dispatchEvent(
      new CustomEvent("bh-activity-item-click", {
        bubbles: !0,
        composed: !0,
        detail: { id: this.itemId, label: this.label }
      })
    );
  }
};
e.styles = [
  ...[h.styles].flat(),
  p`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-activity-item-size, 40px);
        height: var(--bh-activity-item-size, 40px);
        background: none;
        border: none;
        border-left: var(--bh-border-2) solid transparent;
        border-radius: 0;
        color: var(--bh-color-text-muted);
        cursor: pointer;
        padding: 0;
        transition: color var(--bh-transition-fast), background var(--bh-transition-fast);
      }

      button:hover {
        color: var(--bh-color-text);
      }

      button:focus-visible {
        outline: 2px solid var(--bh-color-ring);
        outline-offset: -2px;
      }

      :host([active]) button {
        color: var(--bh-color-text);
        border-left-color: var(--bh-activity-item-active-border, var(--bh-color-primary));
        background: var(--bh-color-surface);
      }
    `
];
i([
  n({ type: Boolean, reflect: !0 })
], e.prototype, "active", 2);
i([
  n()
], e.prototype, "label", 2);
i([
  n({ attribute: "item-id" })
], e.prototype, "itemId", 2);
e = i([
  u("bh-activity-item")
], e);
export {
  e as BhActivityItem
};
//# sourceMappingURL=bh-activity-item.js.map
