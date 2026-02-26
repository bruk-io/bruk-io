import { css as d, nothing as h, html as p } from "lit";
import { property as v, customElement as b } from "lit/decorators.js";
import { BaseElement as f } from "../../primitives/base-element.js";
var g = Object.defineProperty, c = Object.getOwnPropertyDescriptor, l = (r, e, n, o) => {
  for (var t = o > 1 ? void 0 : o ? c(e, n) : e, i = r.length - 1, s; i >= 0; i--)
    (s = r[i]) && (t = (o ? s(e, n, t) : s(t)) || t);
  return o && t && g(e, n, t), t;
};
let a = class extends f {
  constructor() {
    super(...arguments), this.variant = "body", this.truncate = !1;
  }
  render() {
    const r = this.variant === "heading" ? "heading" : h, e = this.variant === "heading" ? "2" : h;
    return p`
      <span
        part="text"
        role=${r}
        aria-level=${e}
      >
        <slot></slot>
      </span>
    `;
  }
};
a.styles = [
  ...[f.styles].flat(),
  d`
      :host {
        display: block;
        color: var(--bh-color-text);
        font-family: var(--bh-font-sans);
      }

      /* Body (default) */
      :host,
      :host([variant='body']) {
        font-size: var(--bh-body-size);
        font-weight: var(--bh-body-weight);
        line-height: var(--bh-body-leading);
      }

      /* Heading */
      :host([variant='heading']) {
        font-size: var(--bh-heading-size);
        font-weight: var(--bh-heading-weight);
        line-height: var(--bh-heading-leading);
      }

      /* Small */
      :host([variant='small']) {
        font-size: var(--bh-small-size);
        font-weight: var(--bh-small-weight);
        line-height: var(--bh-small-leading);
        color: var(--bh-color-text-muted);
      }

      /* Code */
      :host([variant='code']) {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-text-sm);
        line-height: var(--bh-leading-relaxed);
      }

      /* Truncation */
      :host([truncate]) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        display: contents;
      }
    `
];
l([
  v({ reflect: !0 })
], a.prototype, "variant", 2);
l([
  v({ type: Boolean, reflect: !0 })
], a.prototype, "truncate", 2);
a = l([
  b("bh-text")
], a);
export {
  a as BhText
};
//# sourceMappingURL=bh-text.js.map
