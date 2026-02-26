import { css as c, html as h } from "lit";
import { property as n, customElement as u } from "lit/decorators.js";
import { BaseElement as b } from "../../primitives/base-element.js";
var f = Object.defineProperty, m = Object.getOwnPropertyDescriptor, i = (p, r, o, s) => {
  for (var t = s > 1 ? void 0 : s ? m(r, o) : r, a = p.length - 1, l; a >= 0; a--)
    (l = p[a]) && (t = (s ? l(r, o, t) : l(t)) || t);
  return s && t && f(r, o, t), t;
};
let e = class extends b {
  constructor() {
    super(...arguments), this.tabId = "", this.active = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("role") || this.setAttribute("role", "tabpanel"), this.hasAttribute("tabindex") || this.setAttribute("tabindex", "0");
  }
  render() {
    return h`<slot></slot>`;
  }
};
e.styles = [
  ...[b.styles].flat(),
  c`
      :host {
        display: none;
        height: 100%;
        overflow: auto;
      }

      :host([active]) {
        display: block;
      }
    `
];
i([
  n({ attribute: "tab-id" })
], e.prototype, "tabId", 2);
i([
  n({ type: Boolean, reflect: !0 })
], e.prototype, "active", 2);
e = i([
  u("bh-tab-panel")
], e);
export {
  e as BhTabPanel
};
//# sourceMappingURL=bh-tab-panel.js.map
