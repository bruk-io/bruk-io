import { css as c, html as i } from "lit";
import { property as o, customElement as m } from "lit/decorators.js";
import { BaseElement as n } from "../../../primitives/base-element.js";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, r = (g, s, p, e) => {
  for (var t = e > 1 ? void 0 : e ? f(s, p) : s, h = g.length - 1, l; h >= 0; h--)
    (l = g[h]) && (t = (e ? l(s, p, t) : l(t)) || t);
  return e && t && b(s, p, t), t;
};
let a = class extends n {
  constructor() {
    super(...arguments), this.gap = "md", this.align = "stretch", this.wrap = !1;
  }
  render() {
    return i`<slot></slot>`;
  }
};
a.styles = [
  ...[n.styles].flat(),
  c`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--bh-stack-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-stack-gap: 0;
      }

      :host([gap='xs']) {
        --bh-stack-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-stack-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-stack-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-stack-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-stack-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-stack-gap: var(--bh-spacing-12);
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

      /* Wrap */
      :host([wrap]) {
        flex-wrap: wrap;
      }
    `
];
r([
  o({ reflect: !0 })
], a.prototype, "gap", 2);
r([
  o({ reflect: !0 })
], a.prototype, "align", 2);
r([
  o({ type: Boolean, reflect: !0 })
], a.prototype, "wrap", 2);
a = r([
  m("bh-stack")
], a);
export {
  a as BhStack
};
//# sourceMappingURL=bh-stack.js.map
