import { css as n, html as c } from "lit";
import { property as g, customElement as v } from "lit/decorators.js";
import { BaseElement as l } from "../../../primitives/base-element.js";
var m = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (r, o, h, s) => {
  for (var e = s > 1 ? void 0 : s ? b(o, h) : o, a = r.length - 1, p; a >= 0; a--)
    (p = r[a]) && (e = (s ? p(o, h, e) : p(e)) || e);
  return s && e && m(o, h, e), e;
};
let t = class extends l {
  constructor() {
    super(...arguments), this.gap = "md", this.minHeight = "100vh";
  }
  willUpdate(r) {
    r.has("minHeight") && this.style.setProperty("--bh-cover-min-height", this.minHeight);
  }
  render() {
    return c`
      <slot></slot>
      <slot name="center"></slot>
      <slot name="bottom"></slot>
    `;
  }
};
t.styles = [
  ...[l.styles].flat(),
  n`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--bh-cover-gap, var(--bh-spacing-4));
        min-block-size: var(--bh-cover-min-height, 100vh);
        min-width: 0;
      }

      /* Gap */
      :host([gap='none']) {
        --bh-cover-gap: 0;
      }

      :host([gap='xs']) {
        --bh-cover-gap: var(--bh-spacing-1);
      }

      :host([gap='sm']) {
        --bh-cover-gap: var(--bh-spacing-2);
      }

      :host([gap='md']) {
        --bh-cover-gap: var(--bh-spacing-4);
      }

      :host([gap='lg']) {
        --bh-cover-gap: var(--bh-spacing-6);
      }

      :host([gap='xl']) {
        --bh-cover-gap: var(--bh-spacing-8);
      }

      :host([gap='2xl']) {
        --bh-cover-gap: var(--bh-spacing-12);
      }

      ::slotted([slot='center']) {
        flex-grow: 1;
      }
    `
];
i([
  g({ reflect: !0 })
], t.prototype, "gap", 2);
i([
  g({ reflect: !0, attribute: "min-height" })
], t.prototype, "minHeight", 2);
t = i([
  v("bh-cover")
], t);
export {
  t as BhCover
};
//# sourceMappingURL=bh-cover.js.map
