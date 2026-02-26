import { css as b, html as v } from "lit";
import { property as n, customElement as d } from "lit/decorators.js";
import { BaseElement as c } from "../../primitives/base-element.js";
var h = Object.defineProperty, g = Object.getOwnPropertyDescriptor, e = (p, a, s, o) => {
  for (var t = o > 1 ? void 0 : o ? g(a, s) : a, l = p.length - 1, i; l >= 0; l--)
    (i = p[l]) && (t = (o ? i(a, s, t) : i(t)) || t);
  return o && t && h(a, s, t), t;
};
let r = class extends c {
  constructor() {
    super(...arguments), this.gap = "sm", this.variant = "default", this.sticky = !1;
  }
  render() {
    return v`
      <div class="toolbar" part="toolbar" role="toolbar">
        <div class="start"><slot name="start"></slot></div>
        <div class="center"><slot></slot></div>
        <div class="end"><slot name="end"></slot></div>
      </div>
    `;
  }
};
r.styles = [
  ...[c.styles].flat(),
  b`
      :host {
        display: block;
      }

      .toolbar {
        display: flex;
        align-items: center;
        padding: var(--bh-spacing-2) var(--bh-spacing-4);
      }

      /* Variant: surface */
      :host([variant='surface']) .toolbar {
        background: var(--bh-toolbar-bg, var(--bh-color-surface));
      }

      /* Sticky border */
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: var(--bh-z-sticky);
      }

      :host([sticky]) .toolbar {
        border-bottom: var(--bh-border-1) solid var(--bh-toolbar-border, var(--bh-color-border));
      }

      /* Gap sizes */
      .toolbar {
        gap: var(--bh-spacing-2);
      }

      :host([gap='xs']) .toolbar {
        gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) .toolbar {
        gap: var(--bh-spacing-2);
      }

      :host([gap='md']) .toolbar {
        gap: var(--bh-spacing-4);
      }

      /* Sections */
      .start,
      .center,
      .end {
        display: flex;
        align-items: center;
        gap: inherit;
      }

      .start {
        margin-inline-end: auto;
      }

      .center {
        flex: 1;
        justify-content: center;
      }

      .end {
        margin-inline-start: auto;
      }
    `
];
e([
  n({ reflect: !0 })
], r.prototype, "gap", 2);
e([
  n({ reflect: !0 })
], r.prototype, "variant", 2);
e([
  n({ type: Boolean, reflect: !0 })
], r.prototype, "sticky", 2);
r = e([
  d("bh-toolbar")
], r);
export {
  r as BhToolbar
};
//# sourceMappingURL=bh-toolbar.js.map
