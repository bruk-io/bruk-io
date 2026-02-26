import { css as m, html as l } from "lit";
import { property as o, customElement as b } from "lit/decorators.js";
import { BaseElement as n } from "../../../primitives/base-element.js";
var d = Object.defineProperty, c = Object.getOwnPropertyDescriptor, h = (p, a, e, s) => {
  for (var r = s > 1 ? void 0 : s ? c(a, e) : a, g = p.length - 1, i; g >= 0; g--)
    (i = p[g]) && (r = (s ? i(a, e, r) : i(r)) || r);
  return s && r && d(a, e, r), r;
};
let t = class extends n {
  constructor() {
    super(...arguments), this.gap = "md", this.min = "250px";
  }
  willUpdate(p) {
    p.has("min") && this.style.setProperty("--bh-grid-min", this.min);
  }
  render() {
    return l`<slot></slot>`;
  }
};
t.styles = [
  ...[n.styles].flat(),
  m`
      :host {
        display: grid;
        grid-template-columns: repeat(
          auto-fit,
          minmax(min(100%, var(--bh-grid-min, 250px)), 1fr)
        );
        gap: var(--bh-grid-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-grid-gap: 0;
      }

      :host([gap='xs']) {
        --bh-grid-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-grid-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-grid-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-grid-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-grid-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-grid-gap: var(--bh-spacing-12);
      }
    `
];
h([
  o({ reflect: !0 })
], t.prototype, "gap", 2);
h([
  o({ reflect: !0 })
], t.prototype, "min", 2);
t = h([
  b("bh-grid")
], t);
export {
  t as BhGrid
};
//# sourceMappingURL=bh-grid.js.map
