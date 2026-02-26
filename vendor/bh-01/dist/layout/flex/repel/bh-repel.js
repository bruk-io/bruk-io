import { css as o, html as c } from "lit";
import { property as h, customElement as m } from "lit/decorators.js";
import { BaseElement as i } from "../../../primitives/base-element.js";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, n = (g, r, a, s) => {
  for (var e = s > 1 ? void 0 : s ? f(r, a) : r, p = g.length - 1, l; p >= 0; p--)
    (l = g[p]) && (e = (s ? l(r, a, e) : l(e)) || e);
  return s && e && b(r, a, e), e;
};
let t = class extends i {
  constructor() {
    super(...arguments), this.gap = "md", this.align = "center";
  }
  render() {
    return c`<slot></slot>`;
  }
};
t.styles = [
  ...[i.styles].flat(),
  o`
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--bh-repel-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-repel-gap: 0;
      }

      :host([gap='xs']) {
        --bh-repel-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-repel-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-repel-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-repel-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-repel-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-repel-gap: var(--bh-spacing-12);
      }

      /* Align */
      :host([align='start']) {
        align-items: flex-start;
      }

      :host([align='center']) {
        align-items: center;
      }

      :host([align='end']) {
        align-items: flex-end;
      }

      :host([align='stretch']) {
        align-items: stretch;
      }
    `
];
n([
  h({ reflect: !0 })
], t.prototype, "gap", 2);
n([
  h({ reflect: !0 })
], t.prototype, "align", 2);
t = n([
  m("bh-repel")
], t);
export {
  t as BhRepel
};
//# sourceMappingURL=bh-repel.js.map
