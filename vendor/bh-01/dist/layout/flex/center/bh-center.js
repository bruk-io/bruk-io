import { css as u, html as g } from "lit";
import { property as c, customElement as p } from "lit/decorators.js";
import { BaseElement as l } from "../../../primitives/base-element.js";
var m = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (r, s, o, n) => {
  for (var t = n > 1 ? void 0 : n ? b(s, o) : s, h = r.length - 1, a; h >= 0; h--)
    (a = r[h]) && (t = (n ? a(s, o, t) : a(t)) || t);
  return n && t && m(s, o, t), t;
};
let e = class extends l {
  constructor() {
    super(...arguments), this.max = "none", this.gutters = "none", this.intrinsic = !1;
  }
  willUpdate(r) {
    r.has("max") && this.style.setProperty("--bh-center-max", this.max);
  }
  render() {
    return g`<slot></slot>`;
  }
};
e.styles = [
  ...[l.styles].flat(),
  u`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        max-inline-size: var(--bh-center-max, none);
        padding-inline: var(--bh-center-gutters, 0);
        margin-inline: auto;
        min-width: 0;
      }

      /* Intrinsic */
      :host([intrinsic]) {
        align-items: center;
      }

      /* Gutters */
      :host([gutters='none']) {
        --bh-center-gutters: 0;
      }

      :host([gutters='xs']) {
        --bh-center-gutters: var(--bh-spacing-1);
      }

      :host([gutters='sm']) {
        --bh-center-gutters: var(--bh-spacing-2);
      }

      :host([gutters='md']) {
        --bh-center-gutters: var(--bh-spacing-4);
      }

      :host([gutters='lg']) {
        --bh-center-gutters: var(--bh-spacing-6);
      }

      :host([gutters='xl']) {
        --bh-center-gutters: var(--bh-spacing-8);
      }

      :host([gutters='2xl']) {
        --bh-center-gutters: var(--bh-spacing-12);
      }
    `
];
i([
  c({ reflect: !0 })
], e.prototype, "max", 2);
i([
  c({ reflect: !0 })
], e.prototype, "gutters", 2);
i([
  c({ type: Boolean, reflect: !0 })
], e.prototype, "intrinsic", 2);
e = i([
  p("bh-center")
], e);
export {
  e as BhCenter
};
//# sourceMappingURL=bh-center.js.map
