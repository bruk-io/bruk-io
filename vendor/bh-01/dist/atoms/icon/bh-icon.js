import { css as d, nothing as h, html as g } from "lit";
import { property as p, customElement as u } from "lit/decorators.js";
import { unsafeSVG as v } from "lit/directives/unsafe-svg.js";
import { BaseElement as m } from "../../primitives/base-element.js";
var f = Object.defineProperty, b = Object.getOwnPropertyDescriptor, n = (t, r, i, o) => {
  for (var s = o > 1 ? void 0 : o ? b(r, i) : r, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (s = (o ? l(r, i, s) : l(s)) || s);
  return o && s && f(r, i, s), s;
};
const c = /* @__PURE__ */ new Map();
let e = class extends m {
  constructor() {
    super(...arguments), this.name = "", this.size = "md", this.label = "";
  }
  static register(t, r) {
    c.set(t, r);
  }
  static getIcon(t) {
    return c.get(t);
  }
  render() {
    const t = c.get(this.name), r = this.label ? h : "true", i = this.label ? "img" : h;
    return g`
      <svg
        part="svg"
        viewBox="0 0 24 24"
        aria-hidden=${r}
        role=${i}
        aria-label=${this.label || h}
      >
        ${t ? v(t) : h}
      </svg>
    `;
  }
};
e.styles = [
  ...[m.styles].flat(),
  d`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--bh-icon-size, 1.25em);
        height: var(--bh-icon-size, 1.25em);
        color: inherit;
        flex-shrink: 0;
      }

      :host([size='sm']) {
        --bh-icon-size: 1rem;
      }

      :host([size='md']) {
        --bh-icon-size: 1.25rem;
      }

      :host([size='lg']) {
        --bh-icon-size: 1.5rem;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    `
];
n([
  p({ reflect: !0 })
], e.prototype, "name", 2);
n([
  p({ reflect: !0 })
], e.prototype, "size", 2);
n([
  p()
], e.prototype, "label", 2);
e = n([
  u("bh-icon")
], e);
e.register("x", '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
e.register("check", '<path d="M20 6 9 17l-5-5"/>');
e.register("plus", '<path d="M5 12h14"/><path d="M12 5v14"/>');
e.register("minus", '<path d="M5 12h14"/>');
e.register("search", '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
e.register("chevron-down", '<path d="m6 9 6 6 6-6"/>');
e.register("chevron-up", '<path d="m18 15-6-6-6 6"/>');
e.register("chevron-left", '<path d="m15 18-6-6 6-6"/>');
e.register("chevron-right", '<path d="m9 18 6-6-6-6"/>');
e.register("menu", '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>');
export {
  e as BhIcon
};
//# sourceMappingURL=bh-icon.js.map
