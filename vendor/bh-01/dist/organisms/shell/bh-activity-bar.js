import { css as v, html as n } from "lit";
import { state as h, customElement as m } from "lit/decorators.js";
import { BaseElement as l } from "../../primitives/base-element.js";
import "./bh-activity-item.js";
var b = Object.defineProperty, p = Object.getOwnPropertyDescriptor, d = (e, i, r, t) => {
  for (var s = t > 1 ? void 0 : t ? p(i, r) : i, c = e.length - 1, o; c >= 0; c--)
    (o = e[c]) && (s = (t ? o(i, r, s) : o(s)) || s);
  return t && s && b(i, r, s), s;
};
let a = class extends l {
  constructor() {
    super(...arguments), this._activeId = "";
  }
  render() {
    return n`
      <div class="items" part="container" @bh-activity-item-click=${this._handleItemClick}>
        <slot></slot>
      </div>
    `;
  }
  get activeId() {
    return this._activeId;
  }
  setActive(e) {
    this._activeId = e, this._updateItems();
  }
  _handleItemClick(e) {
    const { id: i, label: r } = e.detail, t = this._activeId === i;
    this._activeId = t ? "" : i, this._updateItems(), this.dispatchEvent(
      new CustomEvent("bh-activity-change", {
        bubbles: !0,
        composed: !0,
        detail: {
          id: this._activeId,
          label: this._activeId ? r : ""
        }
      })
    );
  }
  _updateItems() {
    var r;
    const e = (r = this.shadowRoot) == null ? void 0 : r.querySelector("slot");
    if (!e) return;
    const i = e.assignedElements({ flatten: !0 }).filter(
      (t) => t.tagName === "BH-ACTIVITY-ITEM"
    );
    for (const t of i)
      t.active = t.itemId === this._activeId;
  }
};
a.styles = [
  ...[l.styles].flat(),
  v`
      :host {
        display: flex;
        flex-direction: column;
        width: var(--bh-activity-bar-width, 48px);
        background: var(--bh-activity-bar-bg, var(--bh-color-surface-recessed));
        border-right: var(--bh-border-1) solid var(--bh-activity-bar-border, var(--bh-color-border));
        padding-top: var(--bh-spacing-2);
      }

      .items {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--bh-spacing-1);
      }
    `
];
d([
  h()
], a.prototype, "_activeId", 2);
a = d([
  m("bh-activity-bar")
], a);
export {
  a as BhActivityBar
};
//# sourceMappingURL=bh-activity-bar.js.map
