import { css as g, html as m } from "lit";
import { property as l, customElement as n } from "lit/decorators.js";
import { BaseElement as c } from "../../../primitives/base-element.js";
var b = Object.defineProperty, f = Object.getOwnPropertyDescriptor, a = (e, r, h, p) => {
  for (var t = p > 1 ? void 0 : p ? f(r, h) : r, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (t = (p ? o(r, h, t) : o(t)) || t);
  return p && t && b(r, h, t), t;
};
let s = class extends c {
  constructor() {
    super(...arguments), this.gap = "md", this.threshold = "30rem", this.limit = 4;
  }
  willUpdate(e) {
    if (e.has("threshold") || e.has("limit")) {
      this.style.setProperty("--bh-switcher-threshold", this.threshold);
      const r = `calc(100% / ${this.limit})`, h = "var(--bh-switcher-threshold, 30rem)";
      this.style.gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, max(${h}, ${r})), 1fr))`;
    }
  }
  render() {
    return m`<slot></slot>`;
  }
};
s.styles = [
  ...[c.styles].flat(),
  g`
      :host {
        display: grid;
        gap: var(--bh-switcher-gap, var(--bh-spacing-4));
      }

      /* Gap */
      :host([gap='none']) {
        --bh-switcher-gap: 0;
      }

      :host([gap='xs']) {
        --bh-switcher-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-switcher-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-switcher-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-switcher-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-switcher-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-switcher-gap: var(--bh-spacing-12);
      }
    `
];
a([
  l({ reflect: !0 })
], s.prototype, "gap", 2);
a([
  l({ reflect: !0 })
], s.prototype, "threshold", 2);
a([
  l({ type: Number, reflect: !0 })
], s.prototype, "limit", 2);
s = a([
  n("bh-switcher")
], s);
export {
  s as BhSwitcher
};
//# sourceMappingURL=bh-switcher.js.map
