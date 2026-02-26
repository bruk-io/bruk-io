import { css as c, html as d } from "lit";
import { property as n, customElement as u } from "lit/decorators.js";
import { BaseElement as p } from "../../primitives/base-element.js";
var v = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (r, s, a, o) => {
  for (var t = o > 1 ? void 0 : o ? b(s, a) : s, h = r.length - 1, l; h >= 0; h--)
    (l = r[h]) && (t = (o ? l(s, a, t) : l(t)) || t);
  return o && t && v(s, a, t), t;
};
let e = class extends p {
  constructor() {
    super(...arguments), this.variant = "text", this.width = "", this.height = "";
  }
  render() {
    const r = [
      this.width ? `width: ${this.width}` : "",
      this.height ? `height: ${this.height}` : ""
    ].filter(Boolean).join("; ");
    return d`
      <div
        class="skeleton"
        part="skeleton"
        style=${r}
        aria-busy="true"
        aria-label="Loading"
      ></div>
    `;
  }
};
e.styles = [
  ...[p.styles].flat(),
  c`
      :host {
        display: block;
      }

      .skeleton {
        background: var(--bh-skeleton-color, var(--bh-color-secondary));
        animation: pulse 1.5s var(--bh-ease-in-out) infinite;
      }

      /* Text */
      :host([variant='text']) .skeleton,
      .skeleton {
        height: 1em;
        width: 100%;
        border-radius: var(--bh-radius-sm);
      }

      /* Circle */
      :host([variant='circle']) .skeleton {
        border-radius: var(--bh-radius-full);
      }

      /* Rect */
      :host([variant='rect']) .skeleton {
        border-radius: var(--bh-radius-md);
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `
];
i([
  n({ reflect: !0 })
], e.prototype, "variant", 2);
i([
  n()
], e.prototype, "width", 2);
i([
  n()
], e.prototype, "height", 2);
e = i([
  u("bh-skeleton")
], e);
export {
  e as BhSkeleton
};
//# sourceMappingURL=bh-skeleton.js.map
