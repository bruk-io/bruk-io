import { css as c, html as g } from "lit";
import { property as n, customElement as u } from "lit/decorators.js";
import { BaseElement as h } from "../../../primitives/base-element.js";
var f = Object.defineProperty, y = Object.getOwnPropertyDescriptor, s = (i, r, p, a) => {
  for (var t = a > 1 ? void 0 : a ? y(r, p) : r, o = i.length - 1, l; o >= 0; o--)
    (l = i[o]) && (t = (a ? l(r, p, t) : l(t)) || t);
  return a && t && f(r, p, t), t;
};
let e = class extends h {
  constructor() {
    super(...arguments), this.gap = "md", this.justify = "start", this.align = "center", this.nowrap = !1;
  }
  render() {
    return g`<slot></slot>`;
  }
};
e.styles = [
  ...[h.styles].flat(),
  c`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--bh-cluster-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-cluster-gap: 0;
      }

      :host([gap='xs']) {
        --bh-cluster-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-cluster-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-cluster-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-cluster-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-cluster-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-cluster-gap: var(--bh-spacing-12);
      }

      /* Justify */
      :host([justify='start']) {
        justify-content: flex-start;
      }

      :host([justify='center']) {
        justify-content: center;
      }

      :host([justify='end']) {
        justify-content: flex-end;
      }

      :host([justify='between']) {
        justify-content: space-between;
      }

      :host([justify='around']) {
        justify-content: space-around;
      }

      :host([justify='evenly']) {
        justify-content: space-evenly;
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

      /* Nowrap */
      :host([nowrap]) {
        flex-wrap: nowrap;
      }
    `
];
s([
  n({ reflect: !0 })
], e.prototype, "gap", 2);
s([
  n({ reflect: !0 })
], e.prototype, "justify", 2);
s([
  n({ reflect: !0 })
], e.prototype, "align", 2);
s([
  n({ type: Boolean, reflect: !0 })
], e.prototype, "nowrap", 2);
e = s([
  u("bh-cluster")
], e);
export {
  e as BhCluster
};
//# sourceMappingURL=bh-cluster.js.map
