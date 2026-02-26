import { css as h, html as d } from "lit";
import { property as p, customElement as u } from "lit/decorators.js";
import { BaseElement as n } from "../../primitives/base-element.js";
import "./bh-tree-item.js";
var m = Object.defineProperty, b = Object.getOwnPropertyDescriptor, a = (e, t, s, r) => {
  for (var l = r > 1 ? void 0 : r ? b(t, s) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (l = (r ? i(t, s, l) : i(l)) || l);
  return r && l && m(t, s, l), l;
};
let c = class extends n {
  constructor() {
    super(...arguments), this.selected = "", this._onItemClick = (e) => {
      const { value: t, label: s } = e.detail;
      this.selected = t, this.dispatchEvent(
        new CustomEvent("bh-select", {
          bubbles: !0,
          composed: !0,
          detail: { value: t, label: s }
        })
      );
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("bh-tree-item-click", this._onItemClick), this.setAttribute("role", "tree"), this._updateSelection();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("bh-tree-item-click", this._onItemClick);
  }
  updated(e) {
    e.has("selected") && this._updateSelection();
  }
  render() {
    return d`<slot></slot>`;
  }
  _updateSelection() {
    const e = this.querySelectorAll("bh-tree-item");
    let t = !1;
    e.forEach((s) => {
      s.selected = s.value === this.selected, s.roving = !1, s.selected && (t = !0);
    }), !t && e.length > 0 && (e[0].roving = !0);
  }
};
c.styles = [
  ...[n.styles].flat(),
  h`
      :host {
        display: block;
      }
    `
];
a([
  p()
], c.prototype, "selected", 2);
c = a([
  u("bh-tree")
], c);
export {
  c as BhTree
};
//# sourceMappingURL=bh-tree.js.map
