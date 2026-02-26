import { css as p, html as c } from "lit";
import { property as i, customElement as g } from "lit/decorators.js";
import { BaseElement as l } from "../../primitives/base-element.js";
var d = Object.defineProperty, v = Object.getOwnPropertyDescriptor, b = (h, e, s, t) => {
  for (var r = t > 1 ? void 0 : t ? v(e, s) : e, o = h.length - 1, n; o >= 0; o--)
    (n = h[o]) && (r = (t ? n(e, s, r) : n(r)) || r);
  return t && r && d(e, s, r), r;
};
let a = class extends l {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md";
  }
  render() {
    return c`<span part="badge"><slot></slot></span>`;
  }
};
a.styles = [
  ...[l.styles].flat(),
  p`
      :host {
        display: inline-flex;
      }

      span {
        display: inline-flex;
        align-items: center;
        font-family: var(--bh-font-sans);
        font-weight: var(--bh-font-medium);
        line-height: var(--bh-leading-none);
        border-radius: var(--bh-radius-full);
        white-space: nowrap;
        background: var(--bh-badge-bg);
        color: var(--bh-badge-color);
      }

      /* Sizes */
      :host([size='sm']) span {
        font-size: var(--bh-text-xs);
        padding: var(--bh-spacing-0-5) var(--bh-spacing-2);
      }

      span,
      :host([size='md']) span {
        font-size: var(--bh-text-sm);
        padding: var(--bh-spacing-1) var(--bh-spacing-2-5);
      }

      /* Default */
      span,
      :host([variant='default']) span {
        --bh-badge-bg: var(--bh-color-secondary);
        --bh-badge-color: var(--bh-color-secondary-text);
      }

      /* Primary */
      :host([variant='primary']) span {
        --bh-badge-bg: var(--bh-color-primary);
        --bh-badge-color: var(--bh-color-primary-text);
      }

      /* Success */
      :host([variant='success']) span {
        --bh-badge-bg: var(--bh-color-success);
        --bh-badge-color: var(--bh-color-text-inverse);
      }

      /* Warning */
      :host([variant='warning']) span {
        --bh-badge-bg: var(--bh-color-warning);
        --bh-badge-color: var(--bh-color-text);
      }

      /* Danger */
      :host([variant='danger']) span {
        --bh-badge-bg: var(--bh-color-danger);
        --bh-badge-color: var(--bh-color-danger-text);
      }
    `
];
b([
  i({ reflect: !0 })
], a.prototype, "variant", 2);
b([
  i({ reflect: !0 })
], a.prototype, "size", 2);
a = b([
  g("bh-badge")
], a);
export {
  a as BhBadge
};
//# sourceMappingURL=bh-badge.js.map
