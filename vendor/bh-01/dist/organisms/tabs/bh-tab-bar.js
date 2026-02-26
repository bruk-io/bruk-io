import { css as h, html as n } from "lit";
import { property as d, customElement as v } from "lit/decorators.js";
import { BaseElement as l } from "../../primitives/base-element.js";
import "./bh-tab.js";
var p = Object.defineProperty, m = Object.getOwnPropertyDescriptor, c = (t, e, r, s) => {
  for (var a = s > 1 ? void 0 : s ? m(e, r) : e, b = t.length - 1, i; b >= 0; b--)
    (i = t[b]) && (a = (s ? i(e, r, a) : i(a)) || a);
  return s && a && p(e, r, a), a;
};
let o = class extends l {
  constructor() {
    super(...arguments), this.active = "";
  }
  render() {
    return n`
      <div class="tabs" role="tablist" @bh-tab-click=${this._handleTabClick}>
        <slot @slotchange=${this._syncActive}></slot>
      </div>
    `;
  }
  updated(t) {
    t.has("active") && this._syncActive();
  }
  _syncActive() {
    const t = this._getTabs();
    for (const e of t)
      e.active = e.tabId === this.active;
  }
  _handleTabClick(t) {
    t.stopPropagation(), this.active = t.detail.tabId, this.dispatchEvent(
      new CustomEvent("bh-tab-change", {
        bubbles: !0,
        composed: !0,
        detail: { tabId: t.detail.tabId }
      })
    );
  }
  _getTabs() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot");
    return t ? t.assignedElements({ flatten: !0 }).filter((r) => r.tagName === "BH-TAB") : [];
  }
};
o.styles = [
  ...[l.styles].flat(),
  h`
      :host {
        display: block;
      }

      .tabs {
        display: flex;
        align-items: center;
        height: var(--bh-tab-bar-height, 36px);
        background: var(--bh-tab-bar-bg, transparent);
        border-bottom: var(--bh-border-1) solid var(--bh-tab-bar-border, var(--bh-color-border));
        overflow-x: auto;
      }

      ::slotted(bh-tab) {
        height: 100%;
      }
    `
];
c([
  d()
], o.prototype, "active", 2);
o = c([
  v("bh-tab-bar")
], o);
export {
  o as BhTabBar
};
//# sourceMappingURL=bh-tab-bar.js.map
