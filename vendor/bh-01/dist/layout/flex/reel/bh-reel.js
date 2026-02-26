import { css as g, html as m } from "lit";
import { property as i, customElement as b } from "lit/decorators.js";
import { BaseElement as n } from "../../../primitives/base-element.js";
var c = Object.defineProperty, f = Object.getOwnPropertyDescriptor, p = (r, a, l, s) => {
  for (var t = s > 1 ? void 0 : s ? f(a, l) : a, h = r.length - 1, o; h >= 0; h--)
    (o = r[h]) && (t = (s ? o(a, l, t) : o(t)) || t);
  return s && t && c(a, l, t), t;
};
let e = class extends n {
  constructor() {
    super(...arguments), this.gap = "md", this.itemWidth = "auto", this.snap = !1;
  }
  willUpdate(r) {
    r.has("itemWidth") && this.style.setProperty("--bh-reel-item-width", this.itemWidth);
  }
  render() {
    return m`<slot></slot>`;
  }
};
e.styles = [
  ...[n.styles].flat(),
  g`
      :host {
        display: flex;
        overflow-x: auto;
        gap: var(--bh-reel-gap, var(--bh-spacing-4));
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-reel-gap: 0;
      }

      :host([gap='xs']) {
        --bh-reel-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-reel-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-reel-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-reel-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-reel-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-reel-gap: var(--bh-spacing-12);
      }

      /* Snap */
      :host([snap]) {
        scroll-snap-type: x mandatory;
      }

      :host([snap]) ::slotted(*) {
        scroll-snap-align: start;
      }

      /* Item width */
      ::slotted(*) {
        flex: 0 0 var(--bh-reel-item-width, auto);
      }
    `
];
p([
  i({ reflect: !0 })
], e.prototype, "gap", 2);
p([
  i({ reflect: !0, attribute: "item-width" })
], e.prototype, "itemWidth", 2);
p([
  i({ type: Boolean, reflect: !0 })
], e.prototype, "snap", 2);
e = p([
  b("bh-reel")
], e);
export {
  e as BhReel
};
//# sourceMappingURL=bh-reel.js.map
