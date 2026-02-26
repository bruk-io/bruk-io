import { css as c, html as l } from "lit";
import { property as d, customElement as b } from "lit/decorators.js";
import { BaseElement as p } from "../../primitives/base-element.js";
import "../../atoms/badge/bh-badge.js";
import "../../atoms/divider/bh-divider.js";
var m = Object.defineProperty, v = Object.getOwnPropertyDescriptor, h = (r, a, s, o) => {
  for (var e = o > 1 ? void 0 : o ? v(a, s) : a, i = r.length - 1, n; i >= 0; i--)
    (n = r[i]) && (e = (o ? n(a, s, e) : n(e)) || e);
  return o && e && m(a, s, e), e;
};
let t = class extends p {
  constructor() {
    super(...arguments), this.heading = "";
  }
  render() {
    const r = this.count !== void 0;
    return l`
      <div class="header" part="header">
        <span class="title" part="title" role="heading" aria-level="3">
          <slot>${this.heading}</slot>
        </span>
        ${r ? l`<span part="badge"><slot name="badge"><bh-badge size="sm" variant="primary">${this.count}</bh-badge></slot></span>` : l`<slot name="badge"></slot>`}
        <bh-divider part="line"></bh-divider>
        <slot name="end"></slot>
      </div>
    `;
  }
};
t.styles = [
  ...[p.styles].flat(),
  c`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--bh-spacing-2);
      }

      .title {
        font-family: var(--bh-font-mono);
        font-size: var(--bh-section-header-size, var(--bh-text-xs));
        font-weight: var(--bh-font-semibold);
        letter-spacing: var(--bh-section-header-tracking, var(--bh-tracking-widest));
        text-transform: uppercase;
        color: var(--bh-section-header-color, var(--bh-color-text-muted));
        white-space: nowrap;
      }

      bh-divider {
        flex: 1;
        padding: 0;
        --bh-divider-color: var(--bh-section-header-line-color, var(--bh-color-border-muted));
      }
    `
];
h([
  d()
], t.prototype, "heading", 2);
h([
  d({ type: Number })
], t.prototype, "count", 2);
t = h([
  b("bh-section-header")
], t);
export {
  t as BhSectionHeader
};
//# sourceMappingURL=bh-section-header.js.map
