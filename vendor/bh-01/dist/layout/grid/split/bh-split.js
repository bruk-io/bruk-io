import { css as n, html as c } from "lit";
import { property as h, customElement as m } from "lit/decorators.js";
import { BaseElement as g } from "../../../primitives/base-element.js";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, l = (a, p, s, e) => {
  for (var t = e > 1 ? void 0 : e ? v(p, s) : p, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (t = (e ? i(p, s, t) : i(t)) || t);
  return e && t && b(p, s, t), t;
};
let r = class extends g {
  constructor() {
    super(...arguments), this.gap = "md", this.ratio = "1/1";
  }
  willUpdate(a) {
    if (a.has("ratio")) {
      const p = this.ratio.split("/").map((s) => `${s.trim()}fr`).join(" ");
      this.style.setProperty("grid-template-columns", p);
    }
  }
  render() {
    return c`<slot></slot>`;
  }
};
r.styles = [
  ...[g.styles].flat(),
  n`
      :host {
        display: grid;
        gap: var(--bh-split-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-split-gap: 0;
      }

      :host([gap='xs']) {
        --bh-split-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-split-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-split-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-split-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-split-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-split-gap: var(--bh-spacing-12);
      }
    `
];
l([
  h({ reflect: !0 })
], r.prototype, "gap", 2);
l([
  h({ reflect: !0 })
], r.prototype, "ratio", 2);
r = l([
  m("bh-split")
], r);
export {
  r as BhSplit
};
//# sourceMappingURL=bh-split.js.map
