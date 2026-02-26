import { css as h, html as b } from "lit";
import { property as m, customElement as p } from "lit/decorators.js";
import { BaseElement as i } from "../../primitives/base-element.js";
import "./bh-tab-bar.js";
import "./bh-tab-panel.js";
var d = Object.defineProperty, f = Object.getOwnPropertyDescriptor, c = (t, e, s, n) => {
  for (var a = n > 1 ? void 0 : n ? f(e, s) : e, l = t.length - 1, o; l >= 0; l--)
    (o = t[l]) && (a = (n ? o(e, s, a) : o(a)) || a);
  return n && a && d(e, s, a), a;
};
let r = class extends i {
  constructor() {
    super(...arguments), this.active = "";
  }
  render() {
    return b`
      <slot name="tab-bar" @bh-tab-change=${this._handleTabChange}></slot>
      <div class="panels">
        <slot @slotchange=${this._syncPanels}></slot>
      </div>
    `;
  }
  updated(t) {
    t.has("active") && (this._syncPanels(), this._syncTabBar());
  }
  _handleTabChange(t) {
    t.stopPropagation(), this.active = t.detail.tabId, this.dispatchEvent(
      new CustomEvent("bh-tab-change", {
        bubbles: !0,
        composed: !0,
        detail: { tabId: t.detail.tabId }
      })
    );
  }
  _syncPanels() {
    const t = this._getPanels();
    for (const e of t)
      e.active = e.tabId === this.active;
  }
  _syncTabBar() {
    const t = this._getTabBar();
    t && (t.active = this.active);
  }
  _getPanels() {
    var e;
    const t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("slot:not([name])");
    return t ? t.assignedElements({ flatten: !0 }).filter(
      (s) => s.tagName === "BH-TAB-PANEL"
    ) : [];
  }
  _getTabBar() {
    var s;
    const t = (s = this.shadowRoot) == null ? void 0 : s.querySelector('slot[name="tab-bar"]');
    return t ? t.assignedElements({ flatten: !0 }).find(
      (n) => n.tagName === "BH-TAB-BAR"
    ) ?? null : null;
  }
};
r.styles = [
  ...[i.styles].flat(),
  h`
      :host {
        display: flex;
        flex-direction: column;
      }

      .panels {
        flex: 1;
        min-height: 0;
        overflow: hidden;
      }
    `
];
c([
  m()
], r.prototype, "active", 2);
r = c([
  p("bh-tabs")
], r);
export {
  r as BhTabs
};
//# sourceMappingURL=bh-tabs.js.map
