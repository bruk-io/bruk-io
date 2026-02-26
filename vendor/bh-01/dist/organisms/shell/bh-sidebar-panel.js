import { css as b, html as p } from "lit";
import { property as n, customElement as c } from "lit/decorators.js";
import { BaseElement as i } from "../../primitives/base-element.js";
var v = Object.defineProperty, f = Object.getOwnPropertyDescriptor, h = (r, a, o, t) => {
  for (var e = t > 1 ? void 0 : t ? f(a, o) : a, l = r.length - 1, d; l >= 0; l--)
    (d = r[l]) && (e = (t ? d(a, o, e) : d(e)) || e);
  return t && e && v(a, o, e), e;
};
let s = class extends i {
  constructor() {
    super(...arguments), this.collapsed = !1, this._firstUpdate = !0;
  }
  render() {
    return p`
      <div class="header" part="header">
        <slot name="header"></slot>
      </div>
      <div class="body" part="body">
        <slot></slot>
      </div>
    `;
  }
  updated(r) {
    if (this._firstUpdate) {
      this._firstUpdate = !1;
      return;
    }
    r.has("collapsed") && this.dispatchEvent(
      new CustomEvent("bh-sidebar-collapse", {
        bubbles: !0,
        composed: !0,
        detail: { collapsed: this.collapsed }
      })
    );
  }
};
s.styles = [
  ...[i.styles].flat(),
  b`
      :host {
        display: block;
        width: var(--bh-sidebar-panel-width, 250px);
        background: var(--bh-sidebar-panel-bg, var(--bh-color-surface));
        border-right: var(--bh-border-1) solid var(--bh-sidebar-panel-border, var(--bh-color-border));
        overflow: hidden;
        transition: width var(--bh-transition-normal);
      }

      :host([collapsed]) {
        width: 0;
      }

      .header {
        display: flex;
        align-items: center;
        height: var(--bh-spacing-9);
        padding: 0 var(--bh-spacing-3);
        border-bottom: var(--bh-border-1) solid var(--bh-sidebar-panel-border, var(--bh-color-border));
        flex-shrink: 0;
      }

      .body {
        overflow-y: auto;
        height: calc(100% - var(--bh-spacing-9));
      }
    `
];
h([
  n({ type: Boolean, reflect: !0 })
], s.prototype, "collapsed", 2);
s = h([
  c("bh-sidebar-panel")
], s);
export {
  s as BhSidebarPanel
};
//# sourceMappingURL=bh-sidebar-panel.js.map
