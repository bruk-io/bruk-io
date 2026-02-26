import { css as c, html as m } from "lit";
import { property as l, customElement as f } from "lit/decorators.js";
import { BaseElement as h } from "../../primitives/base-element.js";
var b = Object.defineProperty, v = Object.getOwnPropertyDescriptor, i = (p, r, a, e) => {
  for (var t = e > 1 ? void 0 : e ? v(r, a) : r, n = p.length - 1, s; n >= 0; n--)
    (s = p[n]) && (t = (e ? s(r, a, t) : s(t)) || t);
  return e && t && b(r, a, t), t;
};
let o = class extends h {
  constructor() {
    super(...arguments), this.content = "", this.placement = "top";
  }
  render() {
    return m`
      <span class="trigger">
        <slot></slot>
      </span>
      <span class="tooltip" part="tooltip" role="tooltip">${this.content}</span>
    `;
  }
};
o.styles = [
  ...[h.styles].flat(),
  c`
      :host {
        display: inline-flex;
        position: relative;
      }

      .trigger {
        display: inline-flex;
      }

      .tooltip {
        position: absolute;
        z-index: var(--bh-z-tooltip);
        padding: var(--bh-spacing-1-5) var(--bh-spacing-3);
        font-family: var(--bh-font-sans);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-normal);
        white-space: nowrap;
        border-radius: var(--bh-radius-md);
        background: var(--bh-tooltip-bg, var(--bh-color-cod));
        color: var(--bh-tooltip-color, var(--bh-color-white));
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--bh-transition-fast);
      }

      :host(:hover) .tooltip,
      :host(:focus-within) .tooltip {
        opacity: 1;
      }

      /* Placements */
      :host([placement='top']) .tooltip,
      .tooltip {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--bh-spacing-1-5);
      }

      :host([placement='bottom']) .tooltip {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--bh-spacing-1-5);
      }

      :host([placement='left']) .tooltip {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--bh-spacing-1-5);
      }

      :host([placement='right']) .tooltip {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--bh-spacing-1-5);
      }
    `
];
i([
  l()
], o.prototype, "content", 2);
i([
  l({ reflect: !0 })
], o.prototype, "placement", 2);
o = i([
  f("bh-tooltip")
], o);
export {
  o as BhTooltip
};
//# sourceMappingURL=bh-tooltip.js.map
